import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Video, NameBig, Name, Speech, VideoImage, OtherOptions } from "../../Assets/StyledComponents";
import { mapDispatchToProps, mapStateToProps } from "../../Assets/VideoCallFunctions";

const VideoOther = (props) => {
  const { peer, setMain, size, muteUsers, kickOut } = props;
  const ref = useRef();
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [video, setVideo] = useState(false);
  const [muted, setMuted] = useState(false);
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    setUser(peer.user);
    if (props.user) {
      props.room.admin.user == props.user._id && setAdmin(true);
    }
    peer.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
      setVideo(stream.getVideoTracks()[0].enabled);
    });
  }, []);

  const changeStream = () => {
    const { stream, newUser, muted } = setMain(ref.current.srcObject, user);
    ref.current.srcObject = stream;
    setUser(newUser);
    setMuted(muted);
  };

  return (
    <Col sm={size} xs={size === 6 ? 12 : size} onClick={() => setMain && changeStream()} className='mt-3'>
      {admin && (
        <OtherOptions>
          <Avatar alt={user.firstName} src={user.img} onClick={(e) => setMenu(e.target)} className='mb-2'></Avatar>
          <Menu id='simple-menu' anchorEl={menu} keepMounted open={Boolean(menu)} onClose={() => setMenu(null)}>
            <MenuItem onClick={() => kickOut(user.socketId)}>Kick out</MenuItem>
            <MenuItem onClick={() => muteUsers(user.socketId)}>Mute</MenuItem>
          </Menu>
        </OtherOptions>
      )}
      {size === 6 && (
        <NameBig>
          {user.firstname} {user.lastname}
        </NameBig>
      )}
      <Video playsInline autoPlay ref={ref} muted={muted} />
      {!video && <VideoImage src={user.img} />}
      {size === 6 && <div className='m-auto'>{peer.text && <Speech>{peer.text}</Speech>}</div>}
      {size === 3 && (
        <Name>
          {user.firstname} {user.lastname}
        </Name>
      )}
    </Col>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoOther);
