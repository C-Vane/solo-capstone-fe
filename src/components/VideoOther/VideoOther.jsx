import React, { useEffect, useRef } from "react";
import { Col } from "react-bootstrap";
import { Video, Name, NameBig } from "../../Assets/Assets";

const VideoOther = ({ peer, setMain, size }) => {
  const ref = useRef();

  useEffect(() => {
    peer.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  console.log(peer);
  return (
    <Col sm={size} onClick={() => setMain && setMain(ref.current.srcObject, peer.user)} className='mt-3'>
      {size === 6 && (
        <NameBig>
          {peer.user.firstname} {peer.user.lastname}
        </NameBig>
      )}
      <Video playsInline autoPlay ref={ref} />
      {size === 3 && <Name>{peer.user && peer.user._id}</Name>}
    </Col>
  );
};

export default VideoOther;
