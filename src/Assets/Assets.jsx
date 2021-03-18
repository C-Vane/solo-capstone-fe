import styled from "styled-components";

export const SIGN_IN = "Sign In";

export const SIGN_UP = "Sign Up";

export const Bar = styled.header`
  min-height: 5vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
`;

export const Nav = styled.nav`
  display: flex;
  padding: 2vmin 2vmin 0 2vmin;
  justify-content: space-between;
  width: 100%;

  div {
    align-self: flex-end;
    display: flex;

    a {
      color: black;
      text-decoration: none;
      float: left;
      align-self: flex-end;
      border-bottom: 2px solid transparent;
      height: 100%;
      &:hover {
        border-bottom-color: rgb(38, 38, 38, 0.1);
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
  max-height: 80px;
  max-width: 80px;
  min-height: 40px;
  min-width: 40px;
  background-color: #bdbdbd;
  border-radius: 5px;
  margin-right: 10px;
`;

export const NavItem = styled.div`
  text: black;
  text-decoration: none;
  margin: 3px 5vmin;
`;

export const Speech = styled.div`
  color: #fff;
  background-color: #000;
  margin: auto;
  padding: 2px 10px;
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, auto);
  grid-auto-rows: auto;
`;
export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const handleMic = (mic, language, setSpeech, audio) => {
  if (audio) {
    mic.start();
    mic.lang = language || "en-US";
    mic.continuous = false;
    mic.interimResults = true;

    mic.onend = () => {
      mic.start();
      console.log("mic off");
    };
  } else {
    mic.stop();
    mic.onend = () => {
      console.log("Stopped Mic on Click");
    };
  }
  mic.onstart = () => {
    console.log("Mic is on");
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
