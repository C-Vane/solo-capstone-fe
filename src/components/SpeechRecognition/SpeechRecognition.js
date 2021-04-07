import React, { useEffect, useState } from "react";
import { handleMic, Speech } from "../../Assets/Assets";
const speechRecognitionTool = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (speechRecognitionTool !== undefined) {
  recognition = new speechRecognitionTool();
}

const SpeechRecognition = ({ audio, lang, text }) => {
  const [speech, setSpeech] = useState("");
  useEffect(() => {
    if (typeof speechRecognitionTool !== "undefined") {
      handleMic(recognition, lang, setSpeech, audio);
    }
    return () => {
      recognition.stop();
    };
  }, [audio, lang]);
  if (text) {
    return <Speech>{text}</Speech>;
  }
  if (typeof speechRecognitionTool === "undefined") {
    return <Speech>No speech available</Speech>;
  }
  return <div className='m-auto'>{speech && <Speech>{speech}</Speech>}</div>;
};

export default SpeechRecognition;
