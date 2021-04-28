import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button, Container } from "react-bootstrap";
import { postFunction } from "../functions/CRUDFunctions";
import { mapDispatchToProps, mapStateToProps } from "../Assets/VideoCallFunctions";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Switch } from "@material-ui/core";
import { Chat, Lock } from "@material-ui/icons";
export const StartVideoCallPage = (props) => {
  const [privateRoom, setPrivateRoom] = useState("true");
  const [chat, setChat] = useState("true");
  const createRoom = async () => {
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
        <Button variant='outline-dark' className='m-3 rounded-0 float-right' onClick={createRoom}>
          START CALL
        </Button>
      </Container>
    </StartCall>
  );
};
const StartCall = styled.section`
  margin: 5%;
  margin-top: 20vh;
  @media (min-width: 576px) {
    margin: 20%;
    margin-top: 25vh;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(StartVideoCallPage);
