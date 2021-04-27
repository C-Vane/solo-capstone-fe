import Peer from "simple-peer";
import { getFunction } from "../functions/CRUDFunctions";
import * as tf from "@tensorflow/tfjs";

import * as bodyPix from "@tensorflow-models/body-pix";
import { recognizedWords } from "./language";
let interval, secondInterval, intervalBlur;

export const CreatePeer = (userToSignal, caller, stream, socket) => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.user = userToSignal;
  peer.on("signal", (signal) => {
    //console.log("sending-signal");
    socket.emit("sending-signal", { userToSignal, caller, signal });
  });

  return peer;
};

export const LoadSignRecognition = async (videoRef, value, setText) => {
  try {
    interval && clearInterval(interval);
    secondInterval && clearInterval(secondInterval);
    if (value) {
      const net = await tf.loadGraphModel("https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json");
      interval = setInterval(() => {
        detect(net, videoRef, setText);
      }, 1000);
      secondInterval = setInterval(() => {
        setText("");
      }, 3000);
      //console.log("sign language", value);
    }
  } catch (error) {
    console.log(error);
  }
};

const detect = async (net, videoRef, setText) => {
  //make detection
  const img = tf.browser.fromPixels(videoRef.current);
  const resized = tf.image.resizeBilinear(img, [640, 480]);
  const casted = resized.cast("int32");
  const expanded = casted.expandDims(0);
  const obj = await net.executeAsync(expanded);
  const boxes = await obj[1].array();
  const classes = await obj[2].array();
  const scores = await obj[4].array();
  const threshold = 0.9;
  requestAnimationFrame(() => {
    textDetection(boxes[0], classes[0], scores[0], threshold, setText);
  });

  tf.dispose(img);
  tf.dispose(resized);
  tf.dispose(casted);
  tf.dispose(expanded);
  tf.dispose(obj);
};

const textDetection = (boxes, classes, scores, threshold, setText) => {
  let lastDetection;
  for (let i = 0; i <= boxes.length; i++) {
    if (boxes[i] && classes[i] && scores[i] > threshold) {
      const newDetection = recognizedWords[classes[i]]["name"];
      if (lastDetection !== newDetection) {
        lastDetection = newDetection;
        setText(newDetection);
      }
      return;
    }
  }
};

export const AddPeer = (incomingSignal, caller, stream, socket) => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal) => {
    //console.log("receiving signal");
    socket.emit("returning-signal", { signal, caller });
  });

  peer.signal(incomingSignal);

  return peer;
};

export const GetRoom = async (id, setRoom) => {
  const room = await getFunction("room/" + id);
  if (room && room._id) setRoom(room);
  else window.location.replace("/");
};

export const handleMic = (mic, language, setSpeech, audio, rec, setRec) => {
  if (audio) {
    !rec && mic.start();
    mic.lang = language || "en-US";
    mic.continuous = false;
    mic.interimResults = true;

    mic.onend = () => {
      setRec(false);
      mic.start();
    };
  } else {
    mic.stop();
    setSpeech("");
    mic.onend = () => {
      console.log("Stopped Mic on Click");
    };
  }

  mic.onstart = () => {
    setTimeout(() => {
      setSpeech("");
    }, 1000);
    setRec(true);
  };

  mic.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    setSpeech(transcript);
  };
  mic.onerror = (error) => {
    mic.stop();
    setRec(false);
    return error;
  };
};

export const mapStateToProps = (state) => {
  return state;
};

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
  setRoom: (room) => dispatch({ type: "SET_ROOM", payload: room }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  setLoading: (loading) => dispatch({ type: "SET_LOADING", payload: loading }),
});

export const loadBodyPix = (mainVideo, canvas, blurBackground) => {
  if (intervalBlur) {
    clearInterval(intervalBlur);
  }
  if (blurBackground) {
    const options = {
      multiplier: 0.75,
      stride: 32,
      quantBytes: 4,
    };
    const width = mainVideo.current.videoWidth;
    const height = mainVideo.current.videoHeight;
    canvas.current.width = width;
    canvas.current.height = height;
    mainVideo.current.width = width;
    mainVideo.current.height = height;
    bodyPix
      .load(options)
      .then((net) => perform(net, mainVideo.current, canvas, mainVideo, blurBackground))
      .catch((err) => console.log(err));
  }
};

const perform = async (net, video, canvas, mainVideo, blurBackground) => {
  intervalBlur =
    blurBackground &&
    setInterval(async () => {
      const segmentation = await net.segmentPerson(video);
      const backgroundBlurAmount = 10;
      const edgeBlurAmount = 5;
      const flipHorizontal = true;
      requestAnimationFrame(() => {
        bodyPix.drawBokehEffect(canvas.current, mainVideo.current, segmentation, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
      });
    }, 16.7);
};
