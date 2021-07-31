import React from "react";
import classNames from "classnames";


export default function DestinationButton(props)
{
    let imageurl = "";
    switch (props.destinationObject.destination) {
      case "youtube":
        imageurl = "youtube.svg";
        break;
      case "twitch":
        imageurl = "twitch.svg";
        break;
    }

    function checkIfSelected() //identical logic in Createbroadcast
    {
      try
      {
        let currentDestination = props.destinationObject;
        let selectedArray = props.selectedDestination;
        let exists = false;
        exists = selectedArray.some((item)=>
        {
          if (currentDestination.id===item.id)
          {
            return true;
          }
        });
        // console.log('EXISTSSS',exists)
        return exists;
      }
      catch(e)
      {
        console.error('Exception',e);

      }
      

    }
    let exists = checkIfSelected();


    let ClassNames = classNames({'add_broadcast_btn':true, 'no-opacity':true, 'selected-destination':exists});
    return (
      <div>
        <button
          className={ClassNames}
          style={{ backgroundColor: "black" }}
          onClick={()=>{console.log('button clicked');props.OnClick(props.destinationObject)}}
        >
          <img
            src={`/images/${imageurl}`}
            style={{ width: "30px" }}
          ></img>
        </button>
      </div>
    );
}