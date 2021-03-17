import React from "react";
import { connect } from "react-redux";

export const LogIn = (props) => {
  console.log(props);
  return <div></div>;
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
  setLoading: (boolean) => dispatch({ type: "SET_LOADING", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
