import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, Video, NameBig, Name, Speech } from "../../Assets/Assets";

const VideoOther = (props) => {
  const { peer, setMain, size } = props;
  const ref = useRef();
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    setUser(peer.user);
    if (props.user) {
      props.room.admin.user._id == props.user._id && setAdmin(true);
    }
    peer.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  const changeStream = () => {
    const { stream, newUser } = setMain(ref.current.srcObject, user);
    ref.current.srcObject = stream;
    setUser(newUser);
  };
  console.log(props);
  return (
    <Col xs={size} onClick={() => setMain && changeStream} className='mt-3'>
      {size === 6 && (
        <NameBig>
          {user.firstname} {user.lastname}
        </NameBig>
      )}
      <Video playsInline autoPlay ref={ref} />
      {size === 6 && <div className='m-auto'>{peer.text && <Speech>{peer.text}</Speech>}</div>}
      {size === 3 && <Name>{user.firstname && user.lastname}</Name>}
    </Col>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoOther);
