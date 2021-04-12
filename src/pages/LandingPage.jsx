import { Grid, Input } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { SIGN_IN } from "../Assets/StyledComponents";
import styled from "styled-components";
import GetStarted from "../components/GetStarted/GetStarted";
import { Button, Container } from "react-bootstrap";
import { getFunction, postFunction } from "../functions/CRUDFunctions";
import { Carousel } from "react-responsive-carousel";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";

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
              <h1> ToSign is a video Chat platform made for everyone! </h1>
              <p>We use speech to text and sign language recognition AI to facilitate video meetings for people with speaking or hearing impairments. </p>
            </Description>

            {user._id ? (
              <div>
                <Button variant='outline-dark' className='m-3 rounded-0' onClick={createRoom}>
                  New Call
                </Button>
                <Input onChange={(e) => setLink(e.target.value)} value={link} placeholder='Enter a code or link' />
                <Button variant='outline-dark' className={link.length > 0 ? "ml-3  rounded-0" : "d-none"} onClick={() => joinCall()}>
                  Join
                </Button>
              </div>
            ) : (
              <div>
                <Input onChange={(e) => setLink(e.target.value)} value={link} placeholder='Enter a code or link' />
                <Button variant='outline-dark' className='ml-3  rounded-0' onClick={() => joinCall()}>
                  Join
                </Button>
              </div>
            )}
            <i className={error.length > 0 ? "text-danger" : "d-none"}>{error}</i>
          </Grid>
          <Grid item sm={6}>
            <div>
              {/*<Carousel showArrows={true} infiniteLoop={true} showThumbs={false} autoPlay={true} width={"80%"} showStatus={false}>
              <div>
                <img></img>
                <p>hello</p>
              </div>
              <div>
                <img></img>
                <p>hi</p>
              </div>
              <div>
                <img></img>
                <p>hjsfak</p>
              </div>
              <div>
                <img></img>
                <p>jkfgakj</p>
              </div>
            </Carousel>
            */}
            </div>
          </Grid>
        </Grid>
      </MainContainer>
      {getStarted && <GetStarted welcome={getStarted === SIGN_IN} close={() => setGetStarted(false)} />}
    </>
  );
};

const Description = styled.div`
  margin-bottom: 15vmin;
  h1 {
    margin-bottom: 5vmin;
  }
  p {
  }
`;
const MainContainer = styled(Container)`
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: 8vh;
`;
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
