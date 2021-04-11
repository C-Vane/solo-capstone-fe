import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Col, Container, Row } from "react-bootstrap";
import { postFunction } from "../functions/CRUDFunctions";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Popover, Switch, TextField } from "@material-ui/core";
import { Chat, Lock } from "@material-ui/icons";
export const StartVideoCallPage = (props) => {
  const [privateRoom, setPrivateRoom] = useState("true");
  const [chat, setChat] = useState("true");
  const createRoom = async () => {
    console.log(privateRoom, chat);
    const response = await postFunction("room", { private: privateRoom, chat });
    if (response._id) {
      props.history.push(`/video/${response._id}`);
    } else {
      console.log(response);
    }
  };
  return (
    <StartCall>
      <Container>
        <h2>Lets Start the call</h2>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary='Chat Room' />
            <Switch checked={chat} onChange={(e) => setChat(e.target.checked)} color='primary' name='chat' inputProps={{ "aria-label": "Messaging checkbox" }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary='Private Call' />
            <Switch checked={privateRoom} onChange={(e) => setPrivateRoom(e.target.checked)} color='primary' name='private' inputProps={{ "aria-label": "Private Room checkbox" }} />
          </ListItem>
        </List>
        <Button variant='outline-dark' className='m-3 rounded-0' onClick={createRoom}>
          START CALL
        </Button>
      </Container>
    </StartCall>
  );
};
const StartCall = styled.section`
  margin-top: 20vh;
`;

export default connect(mapStateToProps, mapDispatchToProps)(StartVideoCallPage);
