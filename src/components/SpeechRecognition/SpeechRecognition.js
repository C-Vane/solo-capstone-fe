import React, { useEffect, useState } from "react";
import { Speech } from "../../Assets/StyledComponents";
import { handleMic } from "../../Assets/VideoCallFunctions";

const speechRecognitionTool = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (speechRecognitionTool !== undefined) {
  recognition = new speechRecognitionTool();
}

const SpeechRecognition = ({ audio, lang, socket, roomId, user }) => {
  const [speech, setSpeech] = useState("");
  useEffect(() => {
    if (typeof speechRecognitionTool !== "undefined") {
      handleMic(recognition, lang, handleText, audio);
    }
    return () => {
      recognition.stop();
    };
  }, [audio, lang]);

  const handleText = (text) => {
    setSpeech(text);
    socket.current && socket.current.emit("subtitles", { roomId, subtitles: text, user });
  };

  /*  if (text) {
    return <Speech>{text}</Speech>;
  } */
  if (typeof speechRecognitionTool === "undefined") {
    return <Speech>No speech available</Speech>;
  }
  return <div className='m-auto'>{speech && <Speech>{speech}</Speech>}</div>;
};

export default SpeechRecognition;
