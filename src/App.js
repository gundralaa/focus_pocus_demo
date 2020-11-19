import React from "react";
import { Container, Card, CardBody, CardTitle, Row, Col} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import EEGView from "./components/EEGView";

function App() {
  return (
    <Container style={{marginTop: "5px"}}>
      <Row className="mb-4">
      <Col className="col-lg">
      <Card>
        <CardBody>
          <CardTitle>Focus Pocus</CardTitle>
          <p>The UC Berkeley Neurotechx Submission</p>
        </CardBody>
        </Card>
      </Col>
      </Row>
      <EEGView/>
    </Container>
  );
}

export default App;
