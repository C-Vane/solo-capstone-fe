import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";

import io, { Socket } from "socket.io-client";

import { mapDispatchToProps, mapStateToProps, Video, NameBig } from "../Assets/Assets";

import NameModal from "../components/NameModal/NameModal";

import SpeechRecognition from "../components/SpeechRecognition/SpeechRecognition";

import Peer from "simple-peer";

import { getFunction } from "../functions/CRUDFunctions";

import styled from "styled-components";

import AcceptModal from "../components/AcceptModal/AcceptModal";
import { Button, Col, Row } from "react-bootstrap";
import VideoOther from "../components/VideoOther/VideoOther";
import { Container } from "@material-ui/core";
import AdmitUserModal from "../components/AdmitUserModal/AdmitUserModal";

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

  const [Room, setRoom] = useState({});

  const [language, setLanguage] = useState("en-us");

  const [audio, setAudio] = useState(true);

  const [video, setVideo] = useState(true);

  const [speech, setSpeech] = useState(false);

  const [signRecognition, setSignRecognition] = useState(true);

  const [waitingList, setWaitingList] = useState([]);

  const [admit, setAdmit] = useState(false);

  useEffect(() => {
    getRoom(roomID);
    setUser(props.user);
    return () => {};
  }, []);

  useEffect(() => {
    setCurrentUser(`${user.firstname} ${user.lastname}`);
    if (!user._id) {
      console.log("no user");
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: audio, video: video ? videoConstraints : false }).then((stream) => {
      console.log(user, stream, roomID);
      userStream.current = stream;
      socketRef.current = io.connect(process.env.REACT_APP_URL);

      socketRef.current.emit("join-room", roomID, user);

      socketRef.current.on("user-requested", (payload) => {
        console.log(`user requested admition ${payload.user}`);
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
        console.log("users", users);
        const peers = [];
        users.forEach((newPeer) => {
          const peer = createPeer(newPeer, user, stream);
          peersRef.current.push({
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
        mainVideo.current.srcObject = stream;
      });

      socketRef.current.on("user-joined", (payload) => {
        console.log("New User Connected", payload);
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peer,
          user: payload.caller,
        });
        setPeers((users) => [...users, peer]);
      });

      socketRef.current.on("receiving-returned-signal", (payload) => {
        const item = peersRef.current.find((p) => p.user.socketId === payload.id);
        item && item.peer.signal(payload.signal);
      });

      socketRef.current.on("user-disconnected", (userId) => {
        console.log("user disconnected");
        const index = peersRef.current.findIndex((peer) => peer.peerID === userId);
        const peers = [...peersRef.current.splice(0, index), peersRef.current.splice(index)];
        peersRef.current = [...peers];
        setPeers((peer) => [...peer.splice(0, index), ...peer.splice(index)]);
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

  const createPeer = (userToSignal, caller, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.user = userToSignal;
    console.log("Create new peer", peer.user);

    peer.on("signal", (signal) => {
      console.log("sending-signal");
      socketRef.current.emit("sending-signal", { userToSignal, caller, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, caller, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      console.log("receiving signal");
      socketRef.current.emit("returning-signal", { signal, caller });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const getRoom = async (id) => {
    const room = await getFunction("room/" + id);
    if (room && room._id) setRoom(room);
    else window.location.replace("/");
  };

  const admitUser = (payload) => {
    console.log(payload);
    socketRef.current.emit("admit-user", { roomId: roomID, adminId: userID, user: payload });
    setWaitingList((list) => list.filter((user) => user !== payload));
  };
  const declineUser = (payload) => {
    //decline user
    setWaitingList((list) => list.filter((user) => user !== payload));
  };
  const setMain = (stream, user) => {
    mainVideo.current.srcObject = stream;
    setCurrentUser(user);
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
              <Video autoPlay ref={mainVideo} muted></Video>
              <SpeechRecognition audio={audio} lang={language} />
            </Col>
            {peers.length < 4 && peers.map((peer, index) => <VideoOther key={index} peer={peer} size={6} />)}
          </Row>

          {peers.length > 3 && (
            <Row>
              {peers.map((peer, index) => (
                <VideoOther key={index} peer={peer} setMain={setMain} size={3} />
              ))}
            </Row>
          )}
          <ButtonLeave variant='outline-danger' onClick={LeaveRoom}>
            Leave
          </ButtonLeave>
        </>
      )}
    </ContainerMain>
  );
};

const ContainerMain = styled(Container)`
  max-height: 100vh;
  padding-top: 10vh;
`;
const ButtonLeave = styled(Button)`
  margin-top: 5vh;
  align-self: flex-end;
`;
export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
