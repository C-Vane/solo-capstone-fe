import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Video, NameBig, Name, Speech, VideoImage, OtherOptions, Canvas } from "../../Assets/StyledComponents";
import { loadBodyPix, mapDispatchToProps, mapStateToProps } from "../../Assets/VideoCallFunctions";
import Reaction from "../Reaction/Reaction";

const VideoOther = (props) => {
  const { peer, setMain, size, muteUsers, kickOut } = props;
  const VideoRef = useRef();
  const CanvasRef = useRef();
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
    peer.peer &&
      peer.peer.on("stream", (stream) => {
        VideoRef.current.srcObject = stream;
        setVideo(stream.getVideoTracks()[0].enabled);
      });
    handleBackgroundBlur(peer.blur);
  }, [peer]);

  const changeStream = () => {
    const { stream, newUser, muted } = setMain(VideoRef.current.srcObject, user);
    VideoRef.current.srcObject = stream;
    setUser(newUser);
    setMuted(muted);
  };

  const handleBackgroundBlur = (blur) => {
    if (blur) {
      loadBodyPix(VideoRef, CanvasRef, blur);
    }
  };
  return (
    <Col sm={size} xs={size === 6 ? 12 : size} onClick={() => setMain && changeStream()} className='mt-3'>
      {admin && (
        <OtherOptions>
          <Avatar alt={user.firstName} src={user.img} onClick={(e) => setMenu(e.target)} className='mb-2'></Avatar>
          <Menu id='simple-menu' anchorEl={menu} keepMounted open={Boolean(menu)} onClose={() => setMenu(null)} onClick={() => setMenu(null)}>
            <MenuItem onClick={() => kickOut(user.socketId)}>Kick out</MenuItem>
            <MenuItem onClick={() => muteUsers(user.socketId)}>Mute</MenuItem>
          </Menu>
        </OtherOptions>
      )}
      {peer.reaction !== undefined && peer.reaction !== null && <Reaction num={peer.reaction} />}
      {size === 6 && (
        <NameBig>
          {user.firstname} {user.lastname}
        </NameBig>
      )}
      <Video playsInline autoPlay ref={VideoRef} muted={muted} />
      <Canvas ref={CanvasRef} className={peer.blur ? "" : "d-none"}></Canvas>
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
