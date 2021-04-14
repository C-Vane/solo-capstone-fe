import { Button } from "react-bootstrap";
import styled from "styled-components";
import { FreeBreakfastTwoTone, PanToolTwoTone, ThumbDownTwoTone, ThumbUpTwoTone } from "@material-ui/icons";
import { Container, Chip } from "@material-ui/core";
import img from "./SI.png";
import img_full from "./SiFull.png";

import React from "react";

export const ReactionsList = [<ThumbUpTwoTone />, <ThumbDownTwoTone />, <PanToolTwoTone />, <FreeBreakfastTwoTone />, <Chip label='YES' />, <Chip label='NO' />];

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
  width: 10vmin;
  height: 30vmin;
  max-height: 120px;
  max-width: 250px;
  min-height: 60px;
  min-width: 150px;
  background-image: url(${img_full});
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
export const ReactionVideo = styled.div`
  position: absolute;
  right: 4vmin;
  top: 4vmin;
  z-index: 10;
  svg {
    font-size: 3rem;
  }
`;
export const ReactionListItem = styled.div`
  &:hover {
    opacity: 0.5;
  }
  cursor: pointer;
`;
export const Speech = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 10vmin;
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
  background-color: #000;
  margin: auto;
  padding: 2px 10px;
`;
export const NameBig = styled.div`
  position: absolute;
  font-size: 3vmin;
  z-index: 1;
  top: 4vmin;
  left: 4vmin;
  color: #fff;
  background-color: #000;
  width: max-content;
  padding: 2px 10px;
`;
export const OtherOptions = styled.div`
  position: absolute;
  top: 4vmin;
  right: 4vmin;
  z-index: 2;
`;

export const Video = styled.video`
  max-width: 100vw;
  max-height: 85vh;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  border-radius: 7px;
`;
export const Canvas = styled.canvas`
  position: absolute;
  left: 0px;
  max-width: 100vw;
  max-height: 85vh;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 7px;
`;

export const VideoImage = styled.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
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
  width: 50vmax;
`;
export const ContainerOtherVideo = styled.div`
  display: flex;
  width: 100%;
  max-height: 20vh;
`;
export const ContainerMain = styled(Container)`
  max-height: 100vh;
  margin-bottom: 1rem;
`;
export const DivHalf = styled.div`
  min-width: 40%;
  display: flex;
  justify-content: around;
  flex-shrink: 0;
`;
export const Description = styled.div`
  margin-bottom: 15vmin;
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
  height: 100vh;
  margin-top: 8vh;

  @media (min-width: 576px) {
    max-width: 100vw;
  }

  @media (min-width: 900px) {
    max-width: 80vw;
  }
  @media (min-width: 1024px) {
    max-width: 70vw;
  }
  @media (min-width: 1440px) {
    max-width: 50vw;
  }
`;
