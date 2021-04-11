import React, { useState } from "react";
import { Checkbox, IconButton, Paper, Badge, Fade, Menu, MenuItem, Snackbar, Grow } from "@material-ui/core";
import { Forum, Mic, MicOffOutlined, PeopleOutlined, Settings, SpeakerNotes, SpeakerNotesOffOutlined, ThumbsUpDown, ThumbsUpDownOutlined, Videocam, VideocamOffOutlined } from "@material-ui/icons";
import { popoverAudio, popoverSign, popoverSpeech, popoverVideo } from "../../Assets/PopOvers";
import { Button } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import { OverlayTrigger } from "react-bootstrap";
import { DivHalf } from "../../Assets/StyledComponents";
import Chat from "../Chat/Chat";
import CallSettings from "../CallSettings/CallSettings";

function Controls({
  admin,
  setInvite,
  invite,
  HandleInvites,
  video,
  VideoOnAndOff,
  signRecognition,
  setSignRecognition,
  audio,
  MuteUnmuteAudio,
  speech,
  setSpeech,
  snackbar,
  setSnackBar,
  LeaveHandler,
  waitingList,
  admit,
  setLanguage,
  unreadMessages,
  setUnreadMessages,
  messages,
  chat,
  socket,
}) {
  const [settings, setSettings] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);

  return (
    <div>
      <Paper elevation={1} className='d-flex justify-content-between p-2 flex-wrap'>
        <DivHalf>
          <OverlayTrigger className='m-auto' trigger={["hover", "focus"]} placement='top' overlay={popoverVideo}>
            <Checkbox
              color='dark'
              icon={<VideocamOffOutlined />}
              checkedIcon={<Videocam />}
              name='video'
              aria-label='Video Camera'
              checked={video}
              onChange={(e) => {
                VideoOnAndOff(e.target.checked);
                !e.target.checked && setSignRecognition(false);
              }}
            />
          </OverlayTrigger>
          <OverlayTrigger className='m-auto' trigger={["hover", "focus"]} placement='top' overlay={popoverAudio}>
            <Checkbox
              color='dark'
              icon={<MicOffOutlined />}
              checkedIcon={<Mic />}
              name='audio'
              aria-label='Audio'
              checked={audio}
              onChange={(e) => {
                MuteUnmuteAudio(e.target.checked);
                !e.target.checked && setSpeech(false);
              }}
            />
          </OverlayTrigger>
          <OverlayTrigger className='m-auto' trigger={["hover", "focus"]} placement='top' overlay={popoverSpeech}>
            <Checkbox
              color='dark'
              icon={<SpeakerNotesOffOutlined />}
              checkedIcon={<SpeakerNotes />}
              name='speech'
              aria-label='Speech to text recognition'
              checked={speech}
              onChange={(e) => {
                setSpeech(e.target.checked);
                e.target.checked ? MuteUnmuteAudio(true) : setSignRecognition(false);
              }}
            />
          </OverlayTrigger>
          <OverlayTrigger className='m-auto' trigger={["hover", "focus"]} placement='top' overlay={popoverSign}>
            <Checkbox
              color='dark'
              icon={<ThumbsUpDownOutlined />}
              checkedIcon={<ThumbsUpDown />}
              name='signLanguage'
              aria-label='Sign language recognition'
              checked={signRecognition}
              onChange={(e) => {
                setSignRecognition(e.target.checked);
                e.target.checked ? VideoOnAndOff(true) : setSpeech(false);
              }}
            />
          </OverlayTrigger>
        </DivHalf>
        <DivHalf>
          {chat && (
            <IconButton
              aria-label='chat'
              className='m-auto'
              onClick={(e) => {
                setChatRoom(e.target);
                setUnreadMessages(0);
              }}
            >
              <Badge badgeContent={unreadMessages} color='secondary'>
                <Forum />
              </Badge>
            </IconButton>
          )}

          <IconButton aria-label='chat' className='m-auto' onClick={(e) => setSettings(e.target)}>
            <Settings />
          </IconButton>

          {admin ? (
            <>
              <Grow in={waitingList > 0}>
                <IconButton aria-label='chat' className='m-auto' onClick={() => admit(true)}>
                  <Badge badgeContent={waitingList} color='secondary'>
                    <PeopleOutlined />
                  </Badge>
                </IconButton>
              </Grow>
              <Button variant='outline-success' className='m-auto rounded-0' onClick={(e) => setInvite(e.target)}>
                Invite
              </Button>
              <Button variant='outline-danger' className='m-auto rounded-0' onClick={LeaveHandler}>
                End Call
              </Button>
            </>
          ) : (
            <Button variant='outline-danger' className='m-auto rounded-0' onClick={LeaveHandler}>
              Leave
            </Button>
          )}
        </DivHalf>
      </Paper>
      <Menu id='invite-manu' anchorEl={invite} keepMounted open={Boolean(invite)} transition={Fade} onClose={() => setInvite(null)}>
        <MenuItem onClick={() => HandleInvites("LINK")}>Copy link</MenuItem>
        <MenuItem onClick={() => HandleInvites("CODE")}>Copy code</MenuItem>
      </Menu>
      <Snackbar
        anchorOrigin={{
          vertical: snackbar[1] || "top",
          horizontal: "right",
        }}
        open={snackbar[0]}
        autoHideDuration={6000}
        onClose={() => setSnackBar([])}
      >
        <Alert severity={snackbar[2]} onClose={() => setSnackBar([])}>
          {snackbar[3]}
          {snackbar[4] && (
            <Button variant='dark-outline' className='rounded-0 m-auto' onClick={() => snackbar[4]()}>
              Yes
            </Button>
          )}
        </Alert>
      </Snackbar>
      <Chat anchor={chatRoom} socket={socket} setAnchor={setChatRoom} setUnreadMessages={setUnreadMessages} messages={messages} />
      <CallSettings anchor={settings} setAnchor={setSettings} setLanguage={setLanguage} admin={admin} />
    </div>
  );
}

export default Controls;
