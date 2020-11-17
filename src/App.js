import React from "react";
import { Container, Card, CardBody, CardTitle } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import EEGView from "./components/EEGView";

function App() {
  return (
    <Container style={{marginTop: "5px"}}>
      <Card>
        <CardBody>
          <CardTitle>Focus Pocus</CardTitle>
          <p>The UC Berkeley Neurotechx Submission</p>
        </CardBody>
      </Card>
      <EEGView/>
    </Container>
  );
}

export default App;
