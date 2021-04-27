import { Button } from "react-bootstrap";
import styled from "styled-components";
import { FreeBreakfastTwoTone, PanToolTwoTone, ThumbDownTwoTone, ThumbUpTwoTone } from "@material-ui/icons";
import { Container, Chip } from "@material-ui/core";
import img from "./img/SI.png";
import img_full from "./img/SiFull.png";
import thumbsUp from "./img/thumbs-up.png";
import thumbsDown from "./img/thumbs-down.png";
import raiseHand from "./img/raised-hand.png";
import teabreak from "./img/break.png";

import React from "react";

export const ReactionsList = [
  <img src={thumbsUp} height='60' alt='Thumbs Up' />,
  <img src={thumbsDown} height='60' alt='Thumbs Down' />,
  <img src={raiseHand} height='60' alt='Raise Hand' />,
  <img src={teabreak} height='60' alt='Take Break or coffee break' />,
  <Chip label='YES' color='primary' />,
  <Chip label='NO' color='secondary' />,
];

export const SIGN_IN = "Sign In";

export const SIGN_UP = "Sign Up";

export const Bar = styled.header`
  min-height: 5vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #daded461;
`;

export const Nav = styled.nav`
  display: flex;
  padding: 2vmin 2vmin 0;
  justify-content: space-between;
  width: 100%;
  > div.nav-links {
    align-self: flex-end;
  }
  .dropdown-toggle::after {
    align-self: center;
  }
  > div {
    align-self: center;
    display: flex;
    height: inherit;
    a {
      color: #39603d;
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
        border-bottom-color: #39603d;
        font-weight: 600;
        color: #262626;
      }
    }
  }
`;

export const Logo = styled.div`
  width: 10vmin;
  height: 10vmin;
  max-height: 100px;
  max-width: 100px;
  min-height: 60px;
  min-width: 40px;
  background-image: url(${img});
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
export const LogoFullName = styled.div`
  width: 40vmin;
  height: 20vmin;
  max-height: 70px;
  max-width: 250px;
  min-height: auto;
  min-width: 120px;
  background-image: url(${img_full});
  border-radius: 5px;
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
  justify-content: center;
  align-items: center;
  color: #39603d;
  span {
    font-weight: 300;
    margin-left: 2vh;
    font-size: 15px;
  }
`;
export const ReactionVideo = styled.div`
  position: absolute;
  right: 5vmin;
  top: 4vmin;
  z-index: 10;
  svg {
    font-size: 3rem;
  }
`;
export const ReactionListItem = styled.div`
  img {
    height: 30px;
  }
  &:hover {
    opacity: 0.5;
  }
  cursor: pointer;
`;
export const Speech = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 5vmin;
  left: 0;
  right: 0;
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
  z-index: 1;
  top: -20px;
  color: #fff;
  background-color: #3c403d;
  margin: auto;
  padding: 2px 10px;
`;
export const NameBig = styled.div`
  position: absolute;
  font-size: 3vmin;
  z-index: 1;
  top: 3vmin;
  left: 6vmin;
  color: #fff;
  background-color: #3c403d;
  width: max-content;
  padding: 2px 10px;
`;
export const OtherOptions = styled.div`
  position: absolute;
  top: 3vmin;
  right: 6vmin;
  z-index: 1;
`;
export const ControlsContainer = styled.div`
  position: fixed;
  bottom: 5px;
  z-index: 1;
  width: 90%;
  .MuiChip-root {
    display: none;
  }
  @media (min-width: 576px) {
    .MuiChip-root {
      display: block;
    }
  }
`;

export const Video = styled.video`
  max-width: 100vw;
  max-height: 79vh;
  @media (min-width: 576px) {
    max-height: 85vh;
  }
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  border-radius: 7px;
`;
export const Canvas = styled.canvas`
  position: absolute;
  left: 15px;
  max-width: 100vw;
  max-height: 85vh;
  min-width: 95%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 7px;
`;

export const VideoImage = styled.img`
  position: absolute;
  max-width: 100%;
  max-height: 99%;
  background-color: #000;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
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

export const ContainerAdmitModal = styled.div`
  height: 80vh;
  margin: auto;
  width: max-content;
  max-width: 90vw;
`;
export const ContainerOtherVideo = styled.div`
  display: flex;
  width: 100%;
  max-height: 20vh;
`;
export const ContainerMain = styled(Container)`
  height: 79vh;
  margin-bottom: 1rem;
  max-height: min-content;
  @media (min-width: 900px) {
    max-height: 85vh;
  }
`;
export const DivHalf = styled.div`
  min-width: 40%;
  display: flex;
  justify-content: around;
  flex-shrink: 0;
`;

export const DivOther = styled(DivHalf)`
  display: none;
  @media (min-width: 900px) {
    display: flex;
  }
`;
export const AdditionalOptions = styled(DivHalf)`
  display: flex;
  @media (min-width: 900px) {
    display: none;
  }
`;

export const QuickContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vmin;
  max-width: 95vh;
  background-color: #a3bcb6;
  background-color: #eef1e9;
  border-radius: 11px;
  border-bottom: 2px solid rgb(57, 96, 61);
  h5 {
    color: #39603d;
    font-weight: bold;
  }

  @media (min-width: 576px) {
    margin-bottom: 15vh;
    padding: 4vmin;
  }
`;
export const CircularImage = styled.div`
  position: relative;
  width: 20vw;
  height: 20vw;
  min-width: 120px;
  min-height: 120px;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
  div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(57, 96, 61, 0.3);
  }
  img {
    filter: brightness(0.1);
    filter: contrast(1);
    width: 100%;
    height: auto;
  }
`;
export const TextContainer = styled.div`
  h3 {
    color: #39603d;
  }
  margin: auto;
  width: 75%;
  padding: 2vh 0;
`;

export const Description = styled.div`
  margin-top: 10vmin;
  margin-bottom: 5vh;
  h1 {
    margin-bottom: 5vmin;
  }
  p {
  }
`;
export const MainContainer = styled(Container)`
  display: flex !important;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 8vh;
  p {
    font-size: 20px;
  }
  h1 {
    font-size: 8vw;
  }
  h3 {
    font-size: 5vw;
  }
  h5 {
    font-size: 6vw;
  }
  @media (min-width: 576px) {
    padding-top: 15vh;
    max-width: 100vw;
    h1 {
      font-size: 32px;
    }
    h3 {
      font-size: 30px;
    }

    h5 {
      font-size: 30px;
    }
  }

  @media (min-width: 900px) {
    padding-top: 10vh;
    max-width: 90vw;
  }
  @media (min-width: 1024px) {
    max-width: 80vw;
    h1 {
      font-size: 37px;
    }
    h3 {
      font-size: 35px;
    }

    h5 {
      font-size: 30px;
    }
    .MuiGrid-item {
      max-height: 80vh;
    }
  }
  @media (min-width: 1440px) {
    max-width: 70vw;
  }
`;
