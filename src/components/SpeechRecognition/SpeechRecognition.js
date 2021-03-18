import React, { useEffect, useState } from "react";
import { handleMic, Speech } from "../../Assets/Assets";
const speechRecognitionTool = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (speechRecognitionTool !== undefined) {
  recognition = new speechRecognitionTool();
}

const SpeechRecognition = ({ audio, lang }) => {
  const [speech, setSpeech] = useState("");

  useEffect(() => {
    if (typeof speechRecognitionTool !== "undefined") {
      handleMic(recognition, lang, setSpeech, audio);
    }
    return () => {
      handleMic(recognition, lang, setSpeech, false);
    };
  }, [audio, lang]);

  if (typeof speechRecognitionTool === "undefined") {
    return <Speech>No speech available</Speech>;
  }
  return <>{speech && <Speech>{speech}</Speech>}</>;
};

export default SpeechRecognition;
