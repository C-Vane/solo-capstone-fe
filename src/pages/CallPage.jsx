import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";

import io, { Socket } from "socket.io-client";

import { Video, NameBig, ContainerOtherVideo } from "../Assets/StyledComponents";

import NameModal from "../components/NameModal/NameModal";

import SpeechRecognition from "../components/SpeechRecognition/SpeechRecognition";

import { Col, Row } from "react-bootstrap";

import VideoOther from "../components/VideoOther/VideoOther";

import AdmitUserModal from "../components/AdmitUserModal/AdmitUserModal";

import { ButtonLeave, ContainerMain, CreatePeer, GetRoom, AddPeer, mapStateToProps, mapDispatchToProps } from "../Assets/VideoCallFunctions";
import Scrollbars from "react-custom-scrollbars";

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

export const CallPage = (props) => {
  const mainVideo = useRef();

  const socketRef = useRef();

  const userStream = useRef();

  const peersRef = useRef([]);

  const roomID = props.match.params.id;

  const userID = props.user._id;

  const [user, setUser] = useState({});

  const [currentUser, setCurrentUser] = useState();

  const [videoStreams, setVideoStreams] = useState([]);

  const [peers, setPeers] = useState([]);

  const [language, setLanguage] = useState("en-us");

  const [audio, setAudio] = useState(true);

  const [video, setVideo] = useState(true);

  const [speech, setSpeech] = useState(false);

  const [signRecognition, setSignRecognition] = useState(true);

  const [waitingList, setWaitingList] = useState([]);

  const [admit, setAdmit] = useState(false);

  const [muted, setMuted] = useState(true);
  useEffect(() => {
    GetRoom(roomID, props.setRoom);
    setUser(props.user);
    return () => {};
  }, []);

  useEffect(() => {
    setCurrentUser(`${user.firstname} ${user.lastname}`);
    if (!user._id) {
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: audio, video: video ? videoConstraints : false }).then((stream) => {
      userStream.current = stream;

      socketRef.current = io.connect(process.env.REACT_APP_URL);

      socketRef.current.emit("join-room", roomID, user);

      socketRef.current.on("user-requested", (payload) => {
        console.log("user requested", payload);
        setWaitingList(payload);
        setAdmit(true);
      });

      socketRef.current.on("user-connected", (payload) => {
        console.log("User connected", payload);
      });

      socketRef.current.on("error", (payload) => {
        console.log(payload);
      });

      socketRef.current.on("all-users", (users) => {
        const peers = [];
        console.log("Important", users);
        users.forEach((newPeer) => {
          const peer = CreatePeer(newPeer, { ...user, socketId: socketRef.current.id }, stream, socketRef.current);
          peersRef.current.push({
            peer,
            user: newPeer,
          });
          peers.push({ peer, user: newPeer });
        });
        setPeers(peers);
        mainVideo.current.srcObject = stream;
      });

      socketRef.current.on("user-joined", (payload) => {
        console.log("New User Connected", payload);
        const peer = AddPeer(payload.signal, payload.callerID, stream, socketRef.current);
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
          console.log(index);
          const updated = [...peersRef.current.slice(0, index), { ...peersRef.current[index], text: payload.subtitles }, ...peersRef.current.slice(index + 1)];
          setPeers(updated);
        }
      });

      socketRef.current.on("user-disconnected", (userId) => {
        console.log("user disconnected");
        const index = peersRef.current.findIndex((peer) => peer.user.socketId == userId);
        const peers = [...peersRef.current.splice(0, index), peersRef.current.splice(index + 1)];
        peersRef.current = [...peers];
        setPeers((peer) => [...peer.splice(0, index), ...peer.splice(index + 1)]);
      });
      socketRef.current.on("call-end", () => {
        console.log("call ended");
        window.location.replace("/callEnded");
      });
    });

    return () => {
      userStream.current.getTracks().forEach(function (track) {
        track.stop();
      });
    };
  }, [user]);

  const admitUser = (payload) => {
    console.log(payload);
    socketRef.current.emit("admit-user", { roomId: roomID, adminId: userID, user: payload });
    setWaitingList((list) => list.filter((user) => user.socketId !== payload.socketId));
  };
  const declineUser = (payload) => {
    //decline user
    setWaitingList((list) => list.filter((user) => user.socketId !== payload.socketId));
  };
  const setMain = (stream, newUser) => {
    const oldStream = mainVideo.current.srcObject;
    const oldUser = currentUser;
    mainVideo.current.srcObject = stream;
    setCurrentUser(newUser);
    newUser._id === user._id ? setMuted(true) : setMuted(false);

    return { stream: oldStream, newUser: oldUser, muted: !muted };
  };

  const LeaveRoom = () => {
    socketRef.current.emit("end-call", { roomId: roomID, userId: userID });
    window.location.replace("/callEnded");
  };

  return (
    <ContainerMain>
      {!user._id ? (
        <NameModal setUser={setUser} setVideo={setVideo} setAudio={setAudio} setSpeech={setSpeech} close={LeaveRoom} setSignRecognition={setSignRecognition} />
      ) : (
        <>
          {admit && waitingList.length > 0 && <AdmitUserModal admitUser={admitUser} declineUser={declineUser} waitingList={waitingList} close={() => setAdmit(false)} />}
          <Row>
            <Col sm={peers.length > 4 || peers.length === 0 ? 12 : 6} className='mt-3'>
              <NameBig>{currentUser}</NameBig>
              <Video autoPlay ref={mainVideo} muted={muted}></Video>
              <SpeechRecognition audio={audio} lang={language} socket={socketRef} user={user} roomId={roomID} />
            </Col>
            {peers.length < 4 && peers.map((peer, index) => <VideoOther key={index} peer={peer} size={6} />)}
          </Row>

          {peers.length > 3 && (
            <Scrollbars style={{ width: "100%", maxHeight: "20vh" }}>
              <ContainerOtherVideo>
                {peers.map((peer, index) => (
                  <VideoOther key={index} peer={peer} setMain={setMain} size={3} />
                ))}
              </ContainerOtherVideo>
            </Scrollbars>
          )}
          <ButtonLeave variant='outline-danger' onClick={LeaveRoom}>
            Leave
          </ButtonLeave>
        </>
      )}
    </ContainerMain>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
