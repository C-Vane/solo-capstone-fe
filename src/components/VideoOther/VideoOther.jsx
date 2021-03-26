import React, { useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import { Video, Name } from "../../Assets/Assets";

const VideoOther = (props) => {
  const ref = useRef();

  useEffect(() => {
    console.log(props.peer);
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <Col sm={3}>
      <Video playsInline autoPlay ref={ref} muted />
      <Name></Name>
    </Col>
  );
};

export default VideoOther;
