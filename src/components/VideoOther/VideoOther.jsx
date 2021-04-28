import { Avatar, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Video, NameBig, Name, Speech, VideoImage, OtherOptions, Canvas } from "../../Assets/StyledComponents";
import { loadBodyPix, mapDispatchToProps, mapStateToProps } from "../../Assets/VideoCallFunctions";
import Reaction from "../Reaction/Reaction";

const VideoOther = (props) => {
  const { peer, setMain, size, muteUsers, kickOut, socket } = props;
  const VideoRef = useRef();
  const CanvasRef = useRef();
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const [video, setVideo] = useState(false);
  const [muted, setMuted] = useState(false);
  const [menu, setMenu] = useState(null);
  const [sound, setSound] = useState({});
  useEffect(() => {
    setUser(peer.user);
    if (props.user) {
      props.room.admin.user == props.user._id && setAdmin(true);
    }
    socket &&
      socket.current &&
      socket.current.on("activity", ({ socketId, sound }) => {
        if (sound) {
          peer.user.socketId === socketId && setSound({ instant: parseFloat(sound.instant), slow: parseFloat(sound.slow) });
          setTimeout(() => {
            setSound({});
          }, 500);
          if ((parseFloat(sound.instant) > 0.5 && parseFloat(sound.slow) > 0.5) || !sound) {
            VideoRef && VideoRef.current && user && setMain && changeStream();
          }
        }
      });
    peer.peer &&
      peer.peer.on("stream", (stream) => {
        if (VideoRef.current) {
          VideoRef.current.srcObject = stream;
          setVideo(stream.getVideoTracks()[0].enabled);
        }
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
    <Col sm={size === 6 ? 6 : 4} xs={size === 6 ? 12 : 6} md={size === 6 ? 6 : 3} onClick={() => setMain && changeStream()} className='mt-3 cursor-pointer'>
      {admin && props.user._id !== user._id && (
        <OtherOptions>
          <Avatar alt={user.firstName} src={user.img} onClick={(e) => setMenu(e.target)} className='mb-2'></Avatar>
          <Menu id='menu-other-user' anchorEl={menu} keepMounted open={Boolean(menu)} onClose={() => setMenu(null)} onClick={() => setMenu(null)}>
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
      <Video playsInline autoPlay ref={VideoRef} muted={muted} soundMeter={sound} />
      <Canvas ref={CanvasRef} className={peer.blur ? "" : "d-none"}></Canvas>
      {!video && <VideoImage src={user.img} />}
      {size === 6 && <div className='m-auto'>{peer.text && <Speech>{peer.text}</Speech>}</div>}
      {size === 3 && (
        <Name>
          {user.firstname} <span className='d-none d-md-block'>{user.lastname}</span>
        </Name>
      )}
    </Col>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoOther);
