import { Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";

export const StartVideoCallPage = (props) => {
  return (
    <CallEnded>
      <Container>
        <Row>
          <h2>Call has ended</h2>
          <p>Thank you for using our services.</p>
        </Row>
      </Container>
    </CallEnded>
  );
};
const CallEnded = styled.section`
  margin-top: 20vh;
`;

export default connect(mapStateToProps, mapDispatchToProps)(StartVideoCallPage);
