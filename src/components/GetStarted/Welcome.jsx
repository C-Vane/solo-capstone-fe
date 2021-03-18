import React from "react";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

function Welcome({ setWelcome, setSignIn }) {
  return (
    <div>
      <p className='w-75 px-4 m-auto'>We are glad to have you back sign in to call and connect with your loved ones and colleagues.</p>
      <div className=' d-flex flex-column align-items-center my-4'>
        <Button variant='outlined' href={FACEBOOK_ENDPOINT} className='mb-3 w-75 text-normal'>
          <img src='https://developers.google.com/identity/images/g-logo.png' alt='google logo' width='20' className='img-fluid mr-3'></img> Sign in with Facebook
        </Button>
        <Button variant='outlined' href={GOOGLE_ENDPOINT} className='mb-3 w-75 text-normal'>
          <img src='https://developers.google.com/identity/images/g-logo.png' alt='google logo' width='20' className='img-fluid mr-3'></img> Sign in with Google
        </Button>
        <Button className='text-normal w-75 ' variant='outlined' onClick={() => setSignIn(true, true)}>
          <MailOutlineIcon className='mr-4' /> Sign in with Email
        </Button>
      </div>
      <p>
        No account?
        <br />
        <b className='text-success cursor-pointer ml-1' onClick={() => setWelcome(false)}>
          Create one
        </b>
      </p>
    </div>
  );
}

const FACEBOOK_ENDPOINT = process.env.REACT_APP_URL + "users/facebookLogin";
const GOOGLE_ENDPOINT = process.env.REACT_APP_URL + "users/googleLogin";
export default Welcome;
