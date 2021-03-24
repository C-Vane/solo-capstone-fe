import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";

import io, { Socket } from "socket.io-client";

import { mapDispatchToProps, mapStateToProps, Video, VideoGrid } from "../Assets/Assets";

import NameModal from "../components/NameModal/NameModal";

import SpeechRecognition from "../components/SpeechRecognition/SpeechRecognition";

import Peer from "simple-peer";
import { getFunction } from "../functions/CRUDFunctions";
import AcceptModal from "../components/AcceptModal/AcceptModal";

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

export const CallPage = (props) => {
  const userVideo = useRef();

  const socketRef = useRef();

  const userStream = useRef();

  const peersRef = useRef([]);

  const roomID = props.match.params.id;

  const userID = props.user._id;

  const [user, setUser] = useState("6053aa15596c0d4358ab7459");

  const [videoStreams, setVideoStreams] = useState([]);

  const [peers, setPeers] = useState([]);

  const [language, setLanguage] = useState("en-us");

  const [audio, setAudio] = useState(true);

  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    if (!getRoom) window.location.replace("/");
    socketRef.current = io.connect(process.env.REACT_APP_URL);
    socketRef.current.emit("join-room", roomID, props.user._id || user);

    socketRef.current.on("user-requested", (payload) => {
      console.log(`user requested admition ${payload.userId}`);
      setWaitingList((list) => [...list, payload]);
      admitUser(payload);
    });

    socketRef.current.on("disconnected", (userId) => {
      console.log("User left");
      peers[userId] && peers[userId].close();
    });
    socketRef.current.on("user-connected", (payload) => {
      console.log("User connected", payload);
    });

    socketRef.current.on("error", (payload) => {
      console.log(payload);
    });

    navigator.mediaDevices.getUserMedia({ audio: audio, video: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      userStream.current = stream;

      socketRef.current.on("all-users", (users) => {
        console.log(users);
        const peers = [];
        users.forEach((userID) => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socketRef.current.on("user joined", (payload) => {
        console.log("New User Connected");
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });
        setPeers((users) => [...users, peer]);
      });

      socketRef.current.on("receiving-returned-signal", (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });

      return () => {};
    });
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending-signal", { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning-signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const getRoom = async (id) => {
    const room = await getFunction("room/" + id);
    console.log(room);
    if (room && room._id) return true;
    return false;
  };

  const admitUser = (payload) => {
    socketRef.current.emit("admit-user", { roomId: roomID, adminId: userID, ...payload });
    setWaitingList((list) => list.filter((user) => user !== payload.userId));
  };
  const declineUser = (payload) => {
    setWaitingList((list) => list.filter((user) => user !== payload.userId));
  };
  return (
    <>
      {!props.user && !user && <NameModal setName={setUser} />}

      <VideoGrid>
        <h2>You</h2>
        <SpeechRecognition audio={audio} lang={language} />
        <Video autoPlay ref={userVideo} muted></Video>
      </VideoGrid>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
