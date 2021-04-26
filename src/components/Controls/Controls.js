import React, { useState } from "react";
import { Checkbox, IconButton, Paper, Badge, Fade, Menu, MenuItem, Snackbar, Grow, Chip, Popover } from "@material-ui/core";
import {
  BlurOffRounded,
  BlurOnRounded,
  Forum,
  Mic,
  MicOffOutlined,
  MoreHoriz,
  PeopleOutlined,
  Settings,
  SpeakerNotes,
  SpeakerNotesOffOutlined,
  ThumbsUpDown,
  ThumbsUpDownOutlined,
  ThumbUp,
  Videocam,
  VideocamOffOutlined,
} from "@material-ui/icons";
import { popoverAudio, popoverSign, popoverSpeech, popoverVideo, popoverBackground } from "../../Assets/PopOvers";
import { Button } from "react-bootstrap";
import { Alert } from "@material-ui/lab";
import { OverlayTrigger } from "react-bootstrap";
import { DivHalf, DivOther, ControlsContainer, AdditionalOptions } from "../../Assets/StyledComponents";
import Chat from "../Chat/Chat";
import CallSettings from "../CallSettings/CallSettings";
import ReactionChoice from "../Reaction/ReactionChoice";

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
  privateRoom,
  background,
  setBackground,
  setReaction,
}) {
  const [settings, setSettings] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [reactionTab, setReactionTab] = useState(null);
  const [additionOptions, setAdditionOptions] = useState(null);

  return (
    <ControlsContainer>
      <Paper elevation={1} className='d-flex justify-content-around p-2 flex-wrap'>
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
          <OverlayTrigger className='m-auto' trigger={["hover", "focus"]} placement='top' overlay={popoverBackground}>
            <Checkbox color='dark' icon={<BlurOffRounded />} checkedIcon={<BlurOnRounded />} name='blurBackground' aria-label='Background blur' checked={background} onChange={setBackground} />
          </OverlayTrigger>
          <Chip label={privateRoom ? "Private" : "Public"} className='mt-3 ml-2' size='small' variant='outlined' />
          <AdditionalOptions>
            <Grow in={waitingList > 0}>
              <IconButton aria-label='chat' className='m-auto' onClick={() => admit(true)}>
                <Badge badgeContent={waitingList} color='secondary'>
                  <PeopleOutlined />
                </Badge>
              </IconButton>
            </Grow>
            <IconButton aria-label='chat' className='m-auto' onClick={(e) => setAdditionOptions(e.target)}>
              <MoreHoriz />
            </IconButton>
          </AdditionalOptions>
        </DivHalf>
        <DivOther>
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

          <IconButton aria-label='chat' className='m-auto' onClick={(e) => setReactionTab(e.target)}>
            <ThumbUp />
          </IconButton>
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
        </DivOther>
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
        autoHideDuration={5000}
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
      <ReactionChoice anchor={reactionTab} setAnchor={setReactionTab} setReaction={setReaction} />
      <Popover
        id='other-options'
        open={Boolean(additionOptions)}
        anchorEl={additionOptions}
        onClose={() => setAdditionOptions(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className='p-1'>
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

          <IconButton aria-label='chat' className='m-auto' onClick={(e) => setReactionTab(e.target)}>
            <ThumbUp />
          </IconButton>
          <IconButton aria-label='chat' className='m-auto' onClick={(e) => setSettings(e.target)}>
            <Settings />
          </IconButton>

          {admin ? (
            <>
              <Button variant='outline-success' className='m-auto p-1 rounded-0' onClick={(e) => setInvite(e.target)}>
                Invite
              </Button>
              <Button variant='outline-danger' className='m-auto p-1 rounded-0' onClick={LeaveHandler}>
                End Call
              </Button>
            </>
          ) : (
            <Button variant='outline-danger' className='m-auto rounded-0' onClick={LeaveHandler}>
              Leave
            </Button>
          )}
        </div>
      </Popover>
    </ControlsContainer>
  );
}

export default Controls;
