import { Paper, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import styled from "styled-components";
import { Logo } from "../../Assets/Assets";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";
import Join from "./Join";
import Welcome from "./Welcome";

const GetStarted = (props) => {
  const [welcome, setWelcome] = useState(props.welcome);
  const [form, setForm] = useState(false);

  const setCurrent = (form, welcome) => {
    setForm(form);
    setWelcome(welcome);
  };
  return (
    <BackDrop>
      <Container>
        <Paper className='w-xs-100 m-auto text-center' elevation={3}>
          <IconButton aria-label='close' className='float-right' onClick={props.close}>
            <CloseIcon />
          </IconButton>
          <div className='p-md-4 ps-1'>
            <Logo />
            <div className='mb-4 p-md-3 py-3'>
              {welcome ? (
                !form ? (
                  <Welcome setWelcome={setWelcome} setSignIn={setCurrent} />
                ) : (
                  <SignIn close={props.close} setCurrent={setCurrent} />
                )
              ) : !form ? (
                <Join setWelcome={setWelcome} setSignUp={setCurrent} />
              ) : (
                <SignUp close={props.close} setCurrent={setCurrent} />
              )}
            </div>
            <small className='text-muted text-smaller px-4'>
              Click “{welcome ? "Sign In" : "Sign Up"}” to agree to ToSign’s Terms of Service and acknowledge that ToSign’s Privacy Policy applies to you.
            </small>
          </div>
        </Paper>
      </Container>
    </BackDrop>
  );
};

const BackDrop = styled.div`
  position: fixed;
  z-index: 9999999;
  padding-top: 50px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.7);
  font-family: "Tinos", serif;
`;

const Container = styled.div`
  height: 80vh;
  margin: auto;
  width: 50vmax;
`;
export default GetStarted;
