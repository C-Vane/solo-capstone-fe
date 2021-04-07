import { Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { postFunction } from "../functions/CRUDFunctions";

export const StartVideoCallPage = (props) => {
  const createRoom = async () => {
    const response = await postFunction("room");
    if (response._id) {
      props.history.push(`/video/${response._id}`);
    } else {
      console.log(response);
    }
  };
  return (
    <StartCall>
      <Container>
        <Row>
          <h2>Settings</h2>
        </Row>
        <Row>
          <Col>
            Muted <br />
            Speech Recognition <br />
            Video
          </Col>
        </Row>

        <Row>
          <Button onClick={createRoom}>Start Call</Button>
        </Row>
      </Container>
    </StartCall>
  );
};
const StartCall = styled.section`
  margin-top: 20vh;
`;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StartVideoCallPage);
