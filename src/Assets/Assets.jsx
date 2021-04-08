import styled from "styled-components";
import img from "./noBackground.png";

export const SIGN_IN = "Sign In";

export const SIGN_UP = "Sign Up";

export const Bar = styled.header`
  min-height: 5vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;
  background: #d1e8e220;
`;

export const Nav = styled.nav`
  display: flex;
  padding: 2vmin 2vmin 0 2vmin;
  justify-content: space-between;
  width: 100%;

  div {
    align-self: flex-end;
    display: flex;
    height: inherit;
    a {
      color: #3c403d;
      text-decoration: none;
      float: left;
      align-self: flex-end;
      border-bottom: 2px solid transparent;
      height: 100%;
      &:hover {
        border-bottom-color: #a3bcb6;
        background: rgb(38, 38, 38, 0.05);
      }
      &.active {
        border-bottom-color: #262626;
        font-weight: 600;
        color: #262626;
      }
    }
  }
`;
export const mapStateToProps = (state) => {
  return state;
};
export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export const Logo = styled.div`
  width: 10vmin;
  height: 10vmin;
  max-height: 100px;
  max-width: 100px;
  min-height: 40px;
  min-width: 80px;
  background-image: url(${img});
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const NavItem = styled.div`
  text: black;
  height: 100%;
  text-decoration: none;
  margin: 3px 5vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 300;
  }
`;

export const Speech = styled.div`
  position: relative;
  z-index: 999;
  top: -10vmin;
  color: #fff;
  background-color: #000;
  margin: auto;
  padding: 2px 10px;
  width: max-content;
  max-width: 80%;
`;
export const Name = styled.div`
  position: relative;
  font-size: 15px;
  z-index: 999;
  top: -20px;
  color: #fff;
  background-color: #000;
  margin: auto;
  padding: 2px 10px;
`;
export const NameBig = styled.div`
  position: absolute;
  font-size: 3vmin;
  z-index: 999;
  top: 4vmin;
  left: 4vmin;
  color: #fff;
  background-color: #000;
  width: min-content;
  text-wrap: no-wrap;
  padding: 2px 10px;
`;

export const Video = styled.video`
  max-width: 100vw;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  border-radius: 7px;
`;

export const BackDrop = styled.div`
  position: fixed;
  z-index: 10;
  padding-top: 50px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.7);
  font-family: "Tinos", serif;
`;

export const Container = styled.div`
  height: 80vh;
  margin: auto;
  width: 50vmax;
`;

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
