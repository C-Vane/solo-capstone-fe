import { Checkbox, FormControlLabel, Grow, IconButton, Paper, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { BackDrop, ContainerAdmitModal, Logo } from "../../Assets/StyledComponents";
import CloseIcon from "@material-ui/icons/Close";
import { Mic, MicOffOutlined, SpeakerNotes, SpeakerNotesOffOutlined, ThumbsUpDown, ThumbsUpDownOutlined, Videocam, VideocamOffOutlined } from "@material-ui/icons";
import { Button, OverlayTrigger } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { popoverAudio, popoverSign, popoverSpeech, popoverVideo } from "../../Assets/PopOvers";
import { languageOptions } from "../../Assets/languageOptions";

function NameModal({ setAudio, setVideo, setUser, setSpeech, setSignRecognition, setLanguage, user, setOptions }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState("");
  const [videoCheck, setVideoCheck] = useState(true);
  const [audioCheck, setAudioCheck] = useState(false);
  const [speechCheck, setSpeechCheck] = useState(false);
  const [signRecognitionCheck, setSignRecognitionCheck] = useState(false);
  const [language, setLanguageOption] = useState("en-us");
  const languageList = Object.keys(languageOptions);

  const joinCall = (e) => {
    e.preventDefault();
    if (user) {
      const user = {
        firstname: name,
        lastname: surname,
        _id: uuidv4(),
        img: image,
      };
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
    }
    setAudio(audioCheck);
    setLanguage(language);
    setVideo(videoCheck);
    setSpeech(speechCheck);
    setSignRecognition(signRecognitionCheck);
    setOptions(false);
  };

  const Close = () => {
    window.location.replace("/");
  };
  const ChangeLanguage = (lang) => {
    setLanguageOption(languageOptions[lang]);
  };

  return (
    <BackDrop>
      <ContainerAdmitModal>
        <Paper className='w-xs-100 m-auto text-center' elevation={3}>
          <IconButton aria-label='close' className='float-right' onClick={Close}>
            <CloseIcon />
          </IconButton>
          <div className='p-2 p-md-4'>
            <Logo />

            <div className='mb-4 p-md-3 py-3'>
              <form onSubmit={joinCall} className='d-flex flex-column p-md-4 p-2 mt-2'>
                {user && (
                  <>
                    <TextField className='m-3' autoComplete='given-name' value={name} onChange={(e) => setName(e.target.value)} label='Your name' type='text' required />
                    <TextField className='m-3' autoComplete='family-name' value={surname} onChange={(e) => setSurname(e.target.value)} label='Your Surname' type='text' required />
                    <TextField className='m-3' autoComplete='url' value={image} onChange={(e) => setImage(e.target.value)} label='Profile Image URL' type='url' />
                  </>
                )}
                <div className='d-flex justify-content-around mt-2'>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverVideo}>
                    <Checkbox
                      color='dark'
                      icon={<VideocamOffOutlined />}
                      checkedIcon={<Videocam />}
                      name='video'
                      aria-label='Video Camera'
                      checked={videoCheck}
                      onChange={(e) => {
                        setVideoCheck(e.target.checked);
                        !e.target.checked && setSignRecognitionCheck(false);
                      }}
                    />
                  </OverlayTrigger>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverAudio}>
                    <Checkbox
                      color='dark'
                      icon={<MicOffOutlined />}
                      checkedIcon={<Mic />}
                      name='audio'
                      aria-label='Audio'
                      checked={audioCheck}
                      onChange={(e) => {
                        setAudioCheck(e.target.checked);
                        !e.target.checked && setSpeechCheck(false);
                      }}
                    />
                  </OverlayTrigger>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverSpeech}>
                    <Checkbox
                      color='dark'
                      icon={<SpeakerNotesOffOutlined />}
                      checkedIcon={<SpeakerNotes />}
                      name='speech'
                      aria-label='Speech to text recognition'
                      checked={speechCheck}
                      onChange={(e) => {
                        setSpeechCheck(e.target.checked);
                        e.target.checked ? setAudioCheck(true) : setSignRecognitionCheck(false);
                      }}
                    />
                  </OverlayTrigger>
                  <OverlayTrigger trigger={["hover", "focus"]} placement='bottom' overlay={popoverSign}>
                    <Checkbox
                      color='dark'
                      icon={<ThumbsUpDownOutlined />}
                      checkedIcon={<ThumbsUpDown />}
                      name='signLanguage'
                      aria-label='Sign language recognition'
                      checked={signRecognitionCheck}
                      onChange={(e) => {
                        setSignRecognitionCheck(e.target.checked);
                        e.target.checked ? setVideoCheck(true) : setSpeechCheck(false);
                      }}
                    />
                  </OverlayTrigger>
                </div>
                <div>
                  <Grow in={speechCheck}>
                    <Autocomplete
                      id='combo-box-demo'
                      options={languageList}
                      getOptionLabel={(option) => option}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label='Language' variant='outlined' />}
                      onChange={(e) => ChangeLanguage(e.target.innerText)}
                    />
                  </Grow>
                </div>
                <div className='my-2'>
                  <Button variant='outline-dark' className='m-auto w-md-50 w-75 rounded-0' type='submit'>
                    JOIN CALL
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Paper>
      </ContainerAdmitModal>
    </BackDrop>
  );
}

export default NameModal;
