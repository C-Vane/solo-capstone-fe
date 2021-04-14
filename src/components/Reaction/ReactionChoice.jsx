import { Popover } from "@material-ui/core";
import React from "react";
import { ReactionListItem, ReactionsList } from "../../Assets/StyledComponents";

function ReactionChoice({ anchor, setAnchor, setReaction }) {
  return (
    <Popover
      id='reactions'
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={() => setAnchor(null)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div className='d-flex justify-content-around m-2'>
        {ReactionsList.map((reaction, index) => (
          <ReactionListItem key={index} onClick={() => setReaction(index)}>
            {reaction}
          </ReactionListItem>
        ))}
      </div>
    </Popover>
  );
}

export default ReactionChoice;
