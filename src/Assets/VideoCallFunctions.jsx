import Peer from "simple-peer";
import { getFunction } from "../functions/CRUDFunctions";

export const CreatePeer = (userToSignal, caller, stream, socket) => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });
  peer.user = userToSignal;
  console.log("Create new peer", peer.user);

  peer.on("signal", (signal) => {
    console.log("sending-signal");
    socket.emit("sending-signal", { userToSignal, caller, signal });
  });

  return peer;
};

export const AddPeer = (incomingSignal, caller, stream, socket) => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal) => {
    console.log("receiving signal");
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

export const handleMic = (mic, language, setSpeech, audio) => {
  if (audio) {
    mic.start();
    mic.lang = language || "en-US";
    mic.continuous = false;
    mic.interimResults = true;

    mic.onend = () => {
      mic.start();
    };
  } else {
    mic.stop();
    mic.onend = () => {
      console.log("Stopped Mic on Click");
    };
  }
  mic.onstart = () => {
    setTimeout(() => {
      setSpeech("");
    }, 2000);
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
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});
