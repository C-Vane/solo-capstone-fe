import React, { useEffect, useState } from "react";
import { Speech } from "../../Assets/StyledComponents";
import { handleMic } from "../../Assets/VideoCallFunctions";

const speechRecognitionTool = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (speechRecognitionTool !== undefined) {
  recognition = new speechRecognitionTool();
}

const SpeechRecognition = ({ audio, lang, socket, roomId, user, text }) => {
  const [speech, setSpeech] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (typeof speechRecognitionTool !== "undefined") {
      handleMic(recognition, lang, handleText, audio, started, setStarted);
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
  return (
    <div className='m-auto'>
      {speech && <Speech>{speech}</Speech>}
      {text && <Speech>{text}</Speech>}
    </div>
  );
};

export default SpeechRecognition;
