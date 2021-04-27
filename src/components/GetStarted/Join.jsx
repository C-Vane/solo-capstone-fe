import React from "react";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
function Join({ setWelcome, setSignUp }) {
  return (
    <div>
      <p className='w-75 px-4 m-auto'>Create an account to call and connect with your loved ones and colleagues.</p>
      <div className=' d-flex flex-column align-items-center my-4'>
        <Button variant='outlined' href={FACEBOOK_ENDPOINT} className='mb-3 w-75 text-normal justify-content-between pl-lg-5 '>
          <div className='d-flex justify-content-start ml-lg-5 ml-md-3 ml-sm-1'>
            <img src='https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico' alt='Facebook logo' width='20' height='20' className='img-fluid mr-3'></img>
            <span className='ml-md-3'>Sign Up with Facebook</span>
          </div>
        </Button>
        <Button variant='outlined' href={GOOGLE_ENDPOINT} className='mb-3 w-75 text-normal justify-content-between pl-lg-5 '>
          <div className='d-flex justify-content-start ml-lg-5 ml-md-3 ml-sm-1'>
            <img src='https://developers.google.com/identity/images/g-logo.png' alt='Google logo' width='20' height='20' className='img-fluid mr-3'></img>{" "}
            <span className='ml-md-3'> Sign Up with Google</span>
          </div>
        </Button>
        <Button variant='outlined' onClick={() => setSignUp(true, false)} className='text-normal w-75 justify-content-between pl-lg-5 '>
          <div className='d-flex justify-content-start ml-lg-5 ml-md-3 ml-sm-1'>
            <MailOutlineIcon className='mr-3' /> <span className='ml-md-3'>Sign up with Email</span>
          </div>
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
