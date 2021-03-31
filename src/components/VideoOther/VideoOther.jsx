import React, { useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import { Video, Name } from "../../Assets/Assets";

const VideoOther = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  console.log(peer.user);
  return (
    <Col sm={3}>
      <Video playsInline autoPlay ref={ref} muted />
      <Name>${peer.user && peer.user._id}</Name>
    </Col>
  );
};

export default VideoOther;
