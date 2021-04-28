import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";

export const StartVideoCallPage = (props) => {
  return (
    <CallEnded>
      <Container className='text-center'>
        <h2>Call has ended</h2>
        <br />
        <p>Thank you for using our services.</p>
      </Container>
    </CallEnded>
  );
};
const CallEnded = styled.section`
  margin-top: 20vh;
`;

export default connect(mapStateToProps, mapDispatchToProps)(StartVideoCallPage);
