import React from "react";
import { ReactionsList, ReactionVideo } from "../../Assets/StyledComponents";

function Reaction({ num }) {
  return <ReactionVideo>{num !== null && ReactionsList[num]}</ReactionVideo>;
}

export default Reaction;
