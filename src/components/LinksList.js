import React from "react";
import { FixedSizeList as List } from "react-window";
import LinkCard from "./LinkCard";

function LinksList({ links, copyClickHandler }) {
  return (
    <div className="py-5">
      {links.length ? (
        <List
          height={400}
          className="rounded bg-slate-600 py-2"
          width={500}
          itemSize={25}
          itemCount={links.length}
          itemData={{ ...links, copyClickHandler }}
          copyClickHandler={copyClickHandler}
        >
          {LinkCard}
        </List>
      ) : (
        <div>
          <h4>No links found!</h4>
          <h6>Add links to get a short link.</h6>
        </div>
      )}
    </div>
  );
}

export default LinksList;
