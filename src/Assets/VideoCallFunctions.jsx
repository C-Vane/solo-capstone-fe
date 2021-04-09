import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import Peer from "simple-peer";
import { getFunction } from "../functions/CRUDFunctions";

export const ContainerMain = styled(Container)`
  max-height: 100vh;
  padding-top: 10vh;
`;
export const ButtonLeave = styled(Button)`
  margin-top: 5vh;
  align-self: flex-end;
`;

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
