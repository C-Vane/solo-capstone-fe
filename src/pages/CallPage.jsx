import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import { Video, VideoGrid } from "../Assets/Assets";

import NameModal from "../components/NameModal/NameModal";

import SpeechRecognition from "../components/SpeechRecognition/SpeechRecognition";

import Peer from "peerjs";

export const CallPage = (props) => {
  const userVideo = useRef();

  const socketRef = useRef();

  const userStream = useRef();

  const [userName, setUserName] = useState("");

  const [videoStreams, setVideoStreams] = useState([]);

  const [peers, setPeers] = useState({});

  const [language, setLanguage] = useState("en-us");

  const [audio, setAudio] = useState(true);

  const myPeer = new Peer(props.user._id || userName, {
    host: "/",
    port: "3002",
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: audio, video: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      userStream.current = stream;
      socketRef.current = io.connect(process.env.REACT_APP_URL);

      myPeer.on("open", (id) => socketRef.current.emit("join-room", props.match.params.roomID, id));

      myPeer.on("call", (call) => {
        call.answer(userStream);
        call.on("stream", (userVideoStream) => {
          setVideoStreams((streams) => streams.push(userVideoStream));
        });
      });

      socketRef.current.on("user-connected", (userId) => {
        connectToNewUser(userId, userStream, myPeer);
      });
      socketRef.current.on("user-requested");
      socketRef.current.on("disconnected", (userId) => {
        peers[userId] && peers[userId].close();
      });
      socketRef.current.on("error");
    });
    return () => {
      userStream.current.getTracks().forEach(function (track) {
        if (track.readyState == "live") {
          track.stop();
        }
      });
    };
  }, []);

  const connectToNewUser = (userId, streem, myPeer) => {
    const call = myPeer.call(userId, streem);
    call.on("stream", (userVideoStream) => {
      setVideoStreams((streems) => streems.push({ userVideoStream }));
    });

    call.on("close", () => {
      ///remove video of user
    });
    setPeers((peers) => (peers[userId] = call));
  };

  return (
    <>
      {!props.user && !userName && <NameModal setName={setUserName} />}
      <VideoGrid>
        <Video autoPlay ref={userVideo} muted></Video>
        <SpeechRecognition audio={audio} lang={language} />
      </VideoGrid>
    </>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CallPage);
