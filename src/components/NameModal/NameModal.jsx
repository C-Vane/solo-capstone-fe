import { Checkbox, FormControlLabel, IconButton, Paper, TextField, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { BackDrop, Container, Logo } from "../../Assets/Assets";
import CloseIcon from "@material-ui/icons/Close";
import { DeleteOutline, Mic, MicOffOutlined, SpeakerNotes, SpeakerNotesOffOutlined, ThumbsUpDown, ThumbsUpDownOutlined, Videocam, VideocamOffOutlined } from "@material-ui/icons";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function NameModal({ close, setAudio, setVideo, setUser, setSpeech, setSignRecognition }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState("");
  const [videoCheck, setVideoCheck] = useState(true);
  const [audioCheck, setAudioCheck] = useState(false);
  const [speechCheck, setSpeechCheck] = useState(false);
  const [signRecognitionCheck, setSignRecognitionCheck] = useState(true);
  const joinCall = (e) => {
    e.preventDefault();
    setUser({
      firstname: name,
      lastname: surname,
      _id: uuidv4(),
      img: image,
    });
    setAudio(audioCheck);
    setVideo(videoCheck);
    setSpeech(speechCheck);
    setSignRecognition(signRecognitionCheck);
  };

  return (
    <BackDrop>
      <Container>
        <Paper className='w-xs-100 m-auto text-center' elevation={3}>
          <IconButton aria-label='close' className='float-right' onClick={close}>
            <CloseIcon />
          </IconButton>
          <div className='p-md-4 ps-1'>
            <Logo />

            <div className='mb-4 p-md-3 py-3'>
              <form onSubmit={joinCall} className='d-flex flex-column p-md-4 p-2 mt-3'>
                <TextField className='m-3' autoComplete='given-name' value={name} onChange={(e) => setName(e.target.value)} label='Your name' type='text' required />
                <TextField className='m-3' autoComplete='family-name' value={surname} onChange={(e) => setSurname(e.target.value)} label='Your Surname' type='text' required />
                <TextField className='m-3' autoComplete='url' value={image} onChange={(e) => setImage(e.target.value)} label='Profile Image URL' type='url' />
                <div className='d-flex justify-content-around mt-2'>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverVideo}>
                    <Checkbox icon={<VideocamOffOutlined />} checkedIcon={<Videocam />} name='video' aria-label='Video Camera' checked={videoCheck} onChange={(e) => setVideoCheck(e.target.checked)} />
                  </OverlayTrigger>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverAudio}>
                    <Checkbox icon={<MicOffOutlined />} checkedIcon={<Mic />} name='audio' aria-label='Audio' checked={audioCheck} onChange={(e) => setAudioCheck(e.target.checked)} />
                  </OverlayTrigger>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverSpeech}>
                    <Checkbox
                      icon={<SpeakerNotesOffOutlined />}
                      checkedIcon={<SpeakerNotes />}
                      name='speech'
                      aria-label='Speech to text recognition'
                      checked={speechCheck}
                      onChange={(e) => setSpeechCheck(e.target.checked)}
                    />
                  </OverlayTrigger>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverSign}>
                    <Checkbox
                      icon={<ThumbsUpDownOutlined />}
                      checkedIcon={<ThumbsUpDown />}
                      name='signLanguage'
                      aria-label='Sign language recognition'
                      checked={signRecognitionCheck}
                      onChange={(e) => setSignRecognitionCheck(e.target.checked)}
                    />
                  </OverlayTrigger>
                </div>

                <div className='my-4'>
                  <Button variant='outline-dark' className='m-auto w-md-50 w-75 rounded-0' type='submit'>
                    JOIN CALL
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Paper>
      </Container>
    </BackDrop>
  );
}
const popoverVideo = (
  <Popover className='z4'>
    <Popover.Title as='h3'>Video</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Content>
  </Popover>
);
const popoverAudio = (
  <Popover className='z4'>
    <Popover.Title as='h3'>Audio</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Content>
  </Popover>
);
const popoverSpeech = (
  <Popover className='z4'>
    <Popover.Title as='h3'>Speech to text</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Content>
  </Popover>
);
const popoverSign = (
  <Popover className='z4'>
    <Popover.Title as='h3'>Sign language</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Content>
  </Popover>
);
export default NameModal;
