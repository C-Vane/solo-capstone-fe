import { Paper, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import styled from "styled-components";
import { BackDrop, Container, Logo } from "../../Assets/Assets";
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

export default GetStarted;
