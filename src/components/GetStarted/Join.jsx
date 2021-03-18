import React from "react";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
function Join({ setWelcome, setSignUp }) {
  return (
    <div>
      <p className='w-75 px-4 m-auto'>Create an account to call and connect with your loved ones and colleagues.</p>
      <div className=' d-flex flex-column align-items-center my-4'>
        <Button variant='outlined' href={FACEBOOK_ENDPOINT} className='mb-3 w-75 text-normal'>
          <img src='https://developers.google.com/identity/images/g-logo.png' alt='google logo' width='20' className='img-fluid mr-3'></img> Sign Up with Facebook
        </Button>
        <Button variant='outlined' href={GOOGLE_ENDPOINT} className='mb-3 w-75 text-normal'>
          <img src='https://developers.google.com/identity/images/g-logo.png' alt='Google logo' width='20' className='img-fluid mr-3'></img> Sign Up with Google
        </Button>
        <Button className='text-normal w-75 ' variant='outlined' onClick={() => setSignUp(true, false)}>
          <MailOutlineIcon className='mr-4' /> Sign up with Email
        </Button>
      </div>
      <p>
        Already have an account?
        <br />
        <b className='text-success cursor-pointer' onClick={() => setWelcome(true)}>
          Sign in
        </b>
      </p>
    </div>
  );
}

const FACEBOOK_ENDPOINT = process.env.REACT_APP_URL + "users/facebookLogin";
const GOOGLE_ENDPOINT = process.env.REACT_APP_URL + "users/googleLogin";

export default Join;
