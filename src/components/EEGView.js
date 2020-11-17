import React, { useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardTitle, Container } from "shards-react";
import { Line } from "react-chartjs-2";
import { emptyData, chartOptions} from "../utils/mockData";
import { MuseClient, zipSamples } from "muse-js";
import { catchError, multicast } from "rxjs/operators";
import { Subject } from "rxjs";
import { bandpassFilter, epoch } from "@neurosity/pipes";
import { mockMuseEEG } from "../utils/dataGen";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

function EEGView() {

    // Observable Source
    var source$ = null;
    var multicast$ = null;
    var subscription = null;

    const labels = Array.from(Array(512).keys());

    // Graph Data
    const [data, setData] = useState(emptyData);
    // Source Set
    const [connected, setConnected] = useState(false);

    // Pipeline Settings
    const settings = {
        lowCut: 2,
        highCut: 50,
        spRate: 256,
        channels: 4,
        // Time Between Windowing
        int: 2,
        duration: 512,
    };

    function buildPipe() {
        let builtPipe$ = zipSamples(source$).pipe(
            bandpassFilter({
                cutoffFrequencies: [settings.lowCut, settings.highCut],
                nbChannels: settings.channels
            }),
            epoch({
                interval: settings.int,
                duration: settings.duration,
                samplingRate: settings.spRate
            }),
            catchError(err => {
                console.log(err);
            })
        );
        // New Subject Multi Observers
        multicast$ = builtPipe$.pipe(
            multicast(() => new Subject()),
        );
        subscription = multicast$.subscribe(streamData => {
            setData(dataState => {
                Object.values(dataState).forEach((channel, index) => {
                    channel.data = streamData.data[index];
                });
                return {
                    ch0: dataState.ch0
                };
            });
        });
        multicast$.connect();
        setConnected(true);
    }


    async function connMuse() {
        let client = new MuseClient();
        await client.connect();
        await client.start();
        source$ = client.eegReadings
        buildPipe();
    }

    function ChartView(props) {
        return (
            <Container>
                {renderCharts(props.vals)}
            </Container>
        )
    }
    function renderCharts(dataValues) {
        console.log(data.ch0.data)
        return Object.values(dataValues).map((channel, index) => {
            if (index === 0) {
                return (
                    <Card key={index}>
                      <CardBody>
                          <CardTitle>{channel.name}</CardTitle>
                          <Line data={{
                              xLabels: labels,
                              datasets: [{data: channel.data}]}} options={chartOptions}/>
                      </CardBody>
                    </Card>
                );
            } else {
                return null;
            }
        });
    }

    function connSim() {
        source$ = mockMuseEEG(256);
        buildPipe();
    }

    function disconnect() {
        window.location.reload();
    }

    return (
        <Container>
            <Card key={0}>
                <ButtonGroup>
                    <Button disabled={connected} onClick={connMuse}>
                        Muse Connect
                    </Button>
                    <Button disabled={connected} onClick={connSim}>
                        Simulate Data
                    </Button>
                    <Button disabled={!connected} onClick={disconnect}>
                        Disconnect
                    </Button>
                </ButtonGroup>
            </Card>
            <ChartView vals={data}/>
        </Container>
    );
}

export default EEGView;
