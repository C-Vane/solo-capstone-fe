import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../Assets/Assets";

export const LandingPage = (props) => {
  console.log(props);
  return <div></div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
