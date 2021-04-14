import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../Assets/VideoCallFunctions";
import { putFunction } from "../../functions/CRUDFunctions";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Popover, Switch, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Chat, Lock } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { languageOptions } from "../../Assets/languageOptions";

export const CallSettings = ({ room, setRoom, anchor, setLanguage, setAnchor, admin }) => {
  const [privateRoom, setPrivateRoom] = useState(room.private);
  const [chat, setChat] = useState(room.chat);
  const languageList = Object.keys(languageOptions);

  const ChangeLanguage = (lang) => {
    setLanguage(languageOptions[lang]);
  };

  useEffect(() => {
    console.log(admin, room);
    room && setPrivateRoom(room.private) && setChat(room.chat);
  }, [room]);

  const editRoom = async (e) => {
    const data = { [e.target.name]: e.target.checked };
    const updatedRoom = await putFunction("room/" + room._id, data);
    console.log(updatedRoom);
    if (updatedRoom && updatedRoom._id) {
      e.target.name === "chat" ? setChat(!chat) : setPrivateRoom(!privateRoom);
      setRoom(updatedRoom);
    } else {
      console.log(updatedRoom);
    }
  };
  return (
    <Popover
      id='Chat-Room'
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={() => setAnchor(null)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List>
        <ListItem>Settings</ListItem>
        <Divider component='li' />
        {admin && (
          <>
            <ListItem>
              <ListItemIcon>
                <Chat />
              </ListItemIcon>
              <ListItemText primary='Chat Room' />
              <Switch checked={chat} onChange={editRoom} color='primary' name='chat' inputProps={{ "aria-label": "Messaging checkbox" }} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Lock />
              </ListItemIcon>
              <ListItemText primary='Private Call' />
              <Switch checked={privateRoom} onChange={editRoom} color='primary' name='private' inputProps={{ "aria-label": "Messaging checkbox" }} />
            </ListItem>
          </>
        )}
        <Autocomplete
          id='combo-box-demo'
          size='small'
          options={languageList}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label='Language' variant='outlined' />}
          onChange={(e) => ChangeLanguage(e.target.innerText)}
          className='mx-2'
        />
      </List>
    </Popover>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallSettings);
