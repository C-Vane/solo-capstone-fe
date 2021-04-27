import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";

import io, { Socket } from "socket.io-client";

import { Video, NameBig, ContainerOtherVideo, VideoImage, ContainerMain, Canvas } from "../Assets/StyledComponents";

import NameModal from "../components/NameModal/NameModal";

import SpeechRecognition from "../components/SpeechRecognition/SpeechRecognition";

import { Col, Row } from "react-bootstrap";

import VideoOther from "../components/VideoOther/VideoOther";

import AdmitUserModal from "../components/AdmitUserModal/AdmitUserModal";

import { CreatePeer, GetRoom, AddPeer, mapStateToProps, mapDispatchToProps, loadBodyPix, LoadSignRecognition } from "../Assets/VideoCallFunctions";

import Scrollbars from "react-custom-scrollbars";

import Controls from "../components/Controls/Controls";

import { Grow } from "@material-ui/core";

import Slide from "@material-ui/core/Slide";

import Reaction from "../components/Reaction/Reaction";

import * as tf from "@tensorflow/tfjs";

const videoConstraints = {
  height: window.innerHeight * 2,
  width: window.innerHeight * 2,
};

export const CallPage = (props) => {
  const mainVideo = useRef();

  const socketRef = useRef();

  const userStream = useRef();

  const peersRef = useRef([]);

  const canvas = useRef();

  const roomID = props.match.params.id;

  const userID = props.user._id;

  const [user, setUser] = useState({});

  const [currentUser, setCurrentUser] = useState("");

  const [setOptions, setSetOptions] = useState(true);

  const [peers, setPeers] = useState([]);

  const [language, setLanguage] = useState("en-us");

  const [audio, setAudio] = useState(true);

  const [video, setVideo] = useState(true);

  const [speech, setSpeech] = useState(false);

  const [signRecognition, setSignRecognition] = useState(false);

  const [waitingList, setWaitingList] = useState([]);

  const [admit, setAdmit] = useState(false);

  const [muted, setMuted] = useState(true);

  const [admin, setAdmin] = useState(false);

  const [invite, setInvite] = useState(null);

  const [snackbar, setSnackBar] = useState([]);

  const [unreadMessages, setUnreadMessages] = useState(0);

  const [messages, setMessages] = useState([]);

  const [blurBackground, setBlurBackground] = useState(false);

  const [reaction, setReaction] = useState(null);

  const [text, setText] = useState("");
  useEffect(() => {
    GetRoom(roomID, props.setRoom);
    setUser(props.user);

    return () => {};
  }, []);

  useEffect(() => {
    setCurrentUser(`${user.firstname} ${user.lastname}`);
    if (!user._id || !props.room.admin) {
      if (props.user._id) {
        setUser(props.user);
        return;
      }

      const savedUser = JSON.parse(window.localStorage.getItem("user"));
      if (savedUser && savedUser._id) {
        setUser(savedUser);
        props.setUser(savedUser);
        return;
      }
      return;
    }
    props.room.admin && user && props.room.admin.user == user._id && setAdmin(true);
    props.room._id && setWaitingList(props.room.waitingList);

    if (setOptions) {
      return;
    }

    props.setLoading({ active: true });

    navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then((stream) => {
      userStream.current = stream;

      MuteUnmuteAudio(audio);
      VideoOnAndOff(video);
      socketRef.current = io.connect(process.env.REACT_APP_URL);

      socketRef.current.emit("join-room", roomID, user);

      socketRef.current.on("user-connected", (payload) => {});

      socketRef.current.on("error", (payload) => {
        console.log(payload);
      });

      socketRef.current.on("all-users", (users) => {
        const peers = [];

        users.forEach((newPeer) => {
          if (newPeer.socketId) {
            const peer = CreatePeer(newPeer, { ...user, socketId: socketRef.current.id }, userStream.current, socketRef.current);
            peersRef.current.push({
              peer,
              user: newPeer,
            });
            peers.push({ peer, user: newPeer });
          }
        });
        setPeers(peers);
        mainVideo.current.srcObject = userStream.current;
        setTimeout(() => {
          props.setLoading({ active: false });
        }, 1500);
      });

      socketRef.current.on("user-joined", (payload) => {
        setSnackBar([true, "top", "success", `${payload.user.firstname} ${payload.user.lastname} joined the room!`]);
        const peer = AddPeer(payload.signal, payload.callerID, userStream.current, socketRef.current);
        peersRef.current.push({
          peer,
          user: payload.user,
        });
        setPeers((users) => [...users, { peer, user: payload.user }]);
      });

      socketRef.current.on("receiving-returned-signal", (payload) => {
        const item = peersRef.current.find((p) => p.user.socketId === payload.id);
        item && item.peer.signal(payload.signal);
      });

      socketRef.current.on("text", (payload) => {
        const index = peersRef.current.findIndex(({ user }) => user._id == payload.user);
        if (index !== -1) {
          const updated = [...peersRef.current.slice(0, index), { ...peersRef.current[index], text: payload.subtitles }, ...peersRef.current.slice(index + 1)];
          setPeers(updated);
        }
      });

      socketRef.current.on("reaction", (payload) => {
        const index = peersRef.current.findIndex(({ user }) => user._id == payload.user);
        if (index !== -1) {
          const updated = [...peersRef.current.slice(0, index), { ...peersRef.current[index], reaction: payload.reaction }, ...peersRef.current.slice(index + 1)];
          setPeers(updated);

          setTimeout(() => {
            const updated = [...peersRef.current.slice(0, index), { ...peersRef.current[index], reaction: null }, ...peersRef.current.slice(index + 1)];
            setPeers(updated);
          }, 6000);
        }
      });

      socketRef.current.on("set-video-background", (payload) => {
        const index = peersRef.current.findIndex(({ user }) => user._id == payload.user);
        if (index !== -1) {
          const updated = [...peersRef.current.slice(0, index), { ...peersRef.current[index], blur: payload.blur }, ...peersRef.current.slice(index + 1)];
          setPeers(updated);
        }
      });

      socketRef.current.on("user-disconnected", (socketId) => {
        if (peersRef.current.length === 0) return;
        const index = peersRef.current.findIndex((peer) => peer.user.socketId === socketId);

        if (index !== -1) {
          setSnackBar([true, "top", "warning", `${peersRef.current[index].user.firstname} ${peersRef.current[index].user.lastname} diconnected!`]);
          const peers = [...peersRef.current.splice(0, index), peersRef.current.splice(index + 1)];
          peersRef.current = [...peers];
          setPeers((peer) => [...peer.splice(0, index), ...peer.splice(index + 1)]);
        }
      });
      socketRef.current.on("user-left", (socketId) => {
        if (peersRef.current.length === 0) return;
        const index = peersRef.current.findIndex((peer) => peer.user && peer.user.socketId === socketId);
        if (index !== -1) {
          setSnackBar([true, "top", "info", `${peersRef.current[index].user.firstname} left the room!`]);
          const peers = [...peersRef.current.splice(0, index), peersRef.current.splice(index + 1)];
          peersRef.current = [...peers];
          setPeers((peer) => [...peer.splice(0, index), ...peer.splice(index + 1)]);
        }
      });

      socketRef.current.on("message", (payload) => {
        setMessages((m) => [...m, payload]);
        payload.user._id !== user._id && setUnreadMessages((num) => num + 1);
      });

      socketRef.current.on("user-requested", (payload) => {
        setWaitingList(payload);
        setSnackBar([true, "top", "success", `Admit ${payload[payload.length - 1].firstname} ${payload[payload.length - 1].lastname} to Room?`, () => admitUser(payload[payload.length - 1])]);
      });
      socketRef.current.on("mute", () => {
        MuteUnmuteAudio(false);
      });
      socketRef.current.on("call-end", () => {
        props.setLoading({ active: true });
        window.location.replace("/callEnded");
      });
    });

    return () => {
      userStream.current.getTracks().forEach(function (track) {
        track.stop();
      });
      socketRef.current.disconnect();
    };
  }, [user, props.room, setOptions]);

  const admitUser = (payload) => {
    socketRef.current.emit("admit-user", { roomId: roomID, adminId: userID, user: payload });
    setWaitingList((list) => list.filter((user) => user.socketId !== payload.socketId));
  };
  const declineUser = (payload) => {
    //decline user
    setWaitingList((list) => list.filter((user) => user.socketId !== payload.socketId));
    socketRef.current.emit("decline-user", { roomId: roomID, adminId: userID, user: payload });
  };
  const setMain = (stream, newUser) => {
    const oldStream = mainVideo.current.srcObject;
    const oldUser = user;
    mainVideo.current.srcObject = stream;
    setCurrentUser(`${newUser.firstname} ${newUser.lastname}`);
    newUser._id === user._id ? setMuted(true) : setMuted(false);

    return { stream: oldStream, newUser: oldUser, muted: !muted };
  };

  const LeaveRoom = () => {
    socketRef.current.emit("end-call", { roomId: roomID, userId: user._id });
    window.location.replace("/callEnded");
  };

  const MuteUnmuteAudio = (value) => {
    userStream.current.getAudioTracks()[0].enabled = value;
    setAudio(value);
  };
  const VideoOnAndOff = (value) => {
    userStream.current.getVideoTracks()[0].enabled = value;
    setVideo(value);
  };
  const MuteUsers = (socketId) => {
    socketRef.current.emit("mute-user", socketId);
  };
  const KickOut = (socketId) => {
    socketRef.current.emit("kick-out", { socketId, roomID });
  };
  const HandleInvites = (type) => {
    type === "LINK" ? navigator.clipboard.writeText(window.location.href) : navigator.clipboard.writeText(roomID);
    setInvite(null);
    setSnackBar([true, "top", "success", type === "LINK" ? "Link Copied!" : "Code Copied!"]);
  };

  const LeaveHandler = () => {
    setSnackBar([true, "bottom", "warning", `Are you sure you want to ${admin ? "end" : "leave"} the Call?`, LeaveRoom]);
  };
  const updateUser = (data) => {
    props.setUser(data);
    setUser(data);
  };

  const handleBackgroundBlur = (e) => {
    setBlurBackground(e.target.checked);
    socketRef.current.emit("video-background", { roomId: roomID, user, blur: e.target.checked });
    loadBodyPix(mainVideo, canvas, e.target.checked);
  };
  const handleSignRecognition = (value) => {
    setSignRecognition(value);
    LoadSignRecognition(mainVideo, value, handelRecognizedGesture);
  };
  const handelRecognizedGesture = (value) => {
    setText(value);
    socketRef.current.emit("subtitles", { roomId: roomID, subtitles: value, user });
  };

  const handleReaction = (num) => {
    setReaction(num);
    socketRef.current.emit("send-reaction", { roomId: roomID, user, reaction: num });
    setTimeout(() => {
      setReaction(null);
    }, 6000);
  };

  return (
    <ContainerMain>
      <Grow in={setOptions} mountOnEnter unmountOnExit disableStrictModeCompat={true} timeOut={1000}>
        <NameModal
          setUser={updateUser}
          user={!user._id}
          setOptions={setSetOptions}
          setVideo={setVideo}
          setAudio={setAudio}
          setSpeech={setSpeech}
          setSignRecognition={setSignRecognition}
          setLanguage={setLanguage}
        />
      </Grow>
      {!setOptions && (
        <>
          <Slide direction='up' in={admit && waitingList.length > 0} mountOnEnter unmountOnExit>
            <div>
              <AdmitUserModal admitUser={admitUser} declineUser={declineUser} waitingList={waitingList} close={() => setAdmit(false)} />
            </div>
          </Slide>

          <Row className='h-100'>
            <Col sm={peers.length > 3 || peers.length === 0 ? 12 : 6} className='mt-3'>
              <NameBig>{currentUser}</NameBig>
              {reaction !== null && <Reaction num={reaction} />}
              <Video autoPlay ref={mainVideo} poster={user.img} muted={muted} className='h-100'></Video>
              <Canvas ref={canvas} className={blurBackground ? "h-100" : "d-none"}></Canvas>
              {!video && <VideoImage src={user.img} />}
              <SpeechRecognition audio={speech && audio} lang={language} socket={socketRef} user={user} roomId={roomID} text={text} />
            </Col>
            {peers.length < 4 && peers.map((peer, index) => <VideoOther key={index} peer={peer} size={6} muteUsers={MuteUsers} kickOut={KickOut} />)}
          </Row>

          {peers.length > 3 && (
            <Scrollbars style={{ width: "100%", minHeight: "23vh" }}>
              <div style={{ width: "100%", minHeight: "23vh" }}>
                <ContainerOtherVideo>
                  {peers.map((peer, index) => (
                    <VideoOther key={index} peer={peer} setMain={setMain} size={3} muteUsers={MuteUsers} kickOut={KickOut} />
                  ))}
                </ContainerOtherVideo>
              </div>
            </Scrollbars>
          )}
          <Controls
            admin={admin}
            setInvite={setInvite}
            invite={invite}
            HandleInvites={HandleInvites}
            video={video}
            VideoOnAndOff={VideoOnAndOff}
            signRecognition={signRecognition}
            setSignRecognition={handleSignRecognition}
            audio={audio}
            MuteUnmuteAudio={MuteUnmuteAudio}
            speech={speech}
            setSpeech={setSpeech}
            snackbar={snackbar}
            setSnackBar={setSnackBar}
            LeaveHandler={LeaveHandler}
            setLanguage={setLanguage}
            admit={setAdmit}
            waitingList={waitingList.length}
            chat={props.room.chat}
            privateRoom={props.room.private}
            socket={socketRef}
            messages={messages}
            setUnreadMessages={setUnreadMessages}
            unreadMessages={unreadMessages}
            background={blurBackground}
            setBackground={handleBackgroundBlur}
            setReaction={handleReaction}
          />
        </>
      )}
    </ContainerMain>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
