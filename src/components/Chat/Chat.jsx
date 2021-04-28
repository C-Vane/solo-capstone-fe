import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Popover, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../Assets/VideoCallFunctions";

function Chat({ anchor, setAnchor, socket, user, room, messages }) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    socket.current && socket.current.emit("send-message", { roomId: room._id, user, message: text });
    setText("");
  };
  const handleSend = (e) => {
    if (e.key === "Enter") {
      sendMessage();
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
        <ListItem>Messages</ListItem>
        <Divider component='li' />
        <Scrollbars style={{ height: 290, width: "100%" }}>
          {messages.length > 0 &&
            messages.map((message) =>
              message.user._id === user._id ? (
                <ListItem>
                  <ListItemText primary={`${user.firstname} ${user.lastname}`} secondary={message.message} />
                  <ListItemAvatar>
                    <Avatar alt={user.firstname} src={user.img} />
                  </ListItemAvatar>
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={message.user.firstname} src={message.user.img} />
                  </ListItemAvatar>
                  <ListItemText primary={`${message.user.firstname} ${message.user.lastname}`} secondary={message.message} />
                </ListItem>
              )
            )}
        </Scrollbars>
        <Divider component='li' />

        <TextField className='m-auto w-100 mt-1 mx-2' size='small' variant='outlined' label='Write message...' value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleSend} />
      </List>
    </Popover>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
