import React from "react";
import classNames from "classnames";


export default function DestinationButton(props)
{
    let imageurl = "";
    switch (destination.destination) {
      case "youtube":
        imageurl = "youtube.svg";
        break;
      case "twitch":
        imageurl = "twitch.svg";
        break;
    }

    let classNames = classNames({'add_broadcast_btn':true, 'no-opacity':true, 'selected-destination':props.destination.isSelected});
    return (
      <div>
        <button
          className="add_broadcast_btn no-opacity"
          style={{ backgroundColor: "black" }}
        >
          <img
            src={`/images/${imageurl}`}
            style={{ width: "30px" }}
          ></img>
        </button>
      </div>
    );
}