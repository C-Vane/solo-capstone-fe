import { Grid, Input } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { CircularImage, Description, MainContainer, SIGN_IN, TextContainer, QuickContainer } from "../Assets/StyledComponents";
import GetStarted from "../components/GetStarted/GetStarted";
import { Button, Container } from "react-bootstrap";
import { getFunction, postFunction } from "../functions/CRUDFunctions";
import { Carousel } from "react-responsive-carousel";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import womanOnComputer from "../Assets/img/woman-computer.png";
import peopleOnComputer from "../Assets/img/people-on-computer.jpg";
import connectMobile from "../Assets/img/Mobile.jpg";
import passingLink from "../Assets/img/hands-passing.png";
import gestures from "../Assets/img/four-signs.jpg";
import privatePublic from "../Assets/img/private-public.webp";
export const LandingPage = ({ user, history }) => {
  const [getStarted, setGetStarted] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const joinCall = async () => {
    setError("");
    const id = link.includes("http") ? link.split("/")[link.split("/").length - 1] : link;
    const response = await getFunction("room/" + id);
    if (response && response._id) {
      history.push(`/video/${response._id}`);
    } else {
      setError("Could not find the chat room you are looking for.");
      setLink("");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const createRoom = async () => {
    const response = await postFunction("room");
    if (response._id) {
      history.push(`/video/${response._id}`);
    } else {
      console.log(response);
    }
  };
  return (
    <>
      <MainContainer>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Description>
              <h1>
                <b>Signdacity</b> is a video Chat platform made for <b>everyone!</b>
              </h1>
              <p>We use speech to text and sign language recognition AI to facilitate video meetings for people with speaking or hearing impairments. </p>
            </Description>
            <QuickContainer>
              <h5>Quick Start</h5>

              {user._id ? (
                <>
                  <p>Create a new call or enter link or code to join active call.</p>
                  <div>
                    <Button variant='outline-dark' className='mr-3 rounded-0 w-75' onClick={createRoom}>
                      New Call
                    </Button>
                    <div className='d-flex mt-3'>
                      <Input onChange={(e) => setLink(e.target.value)} value={link} placeholder='Enter a code or link' className='w-75' />
                      <div className='w-25'>
                        <Button variant='outline-dark' className={link.length > 0 ? "ml-2 rounded-0" : "d-none"} onClick={() => joinCall()}>
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p>Enter link or code to join active call or Sign up to create your own call.</p>
                  <div className='d-flex'>
                    <Input onChange={(e) => setLink(e.target.value)} value={link} placeholder='Enter a code or link' className='w-75' />
                    <div className='w-25'>
                      <Button variant='outline-dark' className={link.length > 0 ? "ml-3 rounded-0" : "d-none"} onClick={() => joinCall()}>
                        Join
                      </Button>
                    </div>
                  </div>
                </>
              )}
              <i className='text-danger'>{error}</i>
            </QuickContainer>
          </Grid>
          <Grid item sm={6}>
            <div className='h-100 mt-3 mt-lg-0'>
              <Carousel showArrows={true} interval={5000} infiniteLoop={true} showThumbs={false} autoPlay={true} width={"90vw"} showStatus={false}>
                <div>
                  <CircularImage>
                    <img src={womanOnComputer} />
                    <div></div>
                  </CircularImage>
                  <TextContainer>
                    <h3>Connect from anywhere</h3>
                    <p>You can sign up and create a new call in minutes and get a link to share with people you want to meet.</p>
                  </TextContainer>
                </div>

                <div>
                  <CircularImage>
                    <img src={connectMobile} />
                    <div></div>
                  </CircularImage>
                  <TextContainer>
                    <h3>You can Connect from Mobile</h3>
                    <p>Connect and join calls with your mobile using Chrome Browser App.</p>
                  </TextContainer>
                </div>
                <div>
                  <CircularImage>
                    <img src={passingLink} />
                    <div></div>
                  </CircularImage>
                  <TextContainer>
                    <h3>Join Calls with shared link</h3>
                    <p>You can join a call by getting a link or code from the call creator.</p>
                  </TextContainer>
                </div>
                <div>
                  <CircularImage>
                    <img src={peopleOnComputer} />
                    <div></div>
                  </CircularImage>
                  <TextContainer>
                    <h3>You can see people together</h3>
                    <p>You can see up to four people together on the same screen.</p>
                  </TextContainer>
                </div>

                <div>
                  <CircularImage>
                    <img src={gestures} />
                    <div></div>
                  </CircularImage>
                  <TextContainer>
                    <h3>You can use Sign Language</h3>
                    <p>You can communicate with people using sign language and they will see what you say written as subtitle.</p>
                  </TextContainer>
                </div>
                <div>
                  <CircularImage>
                    <img src={privatePublic} />
                    <div></div>
                  </CircularImage>
                  <TextContainer>
                    <h3>Your calls can be private or public</h3>
                    <p>You can choose between calls where people can join only if admitted or public calls where anyone can join.</p>
                  </TextContainer>
                </div>
              </Carousel>
            </div>
          </Grid>
        </Grid>
      </MainContainer>
      {getStarted && <GetStarted welcome={getStarted === SIGN_IN} close={() => setGetStarted(false)} />}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
