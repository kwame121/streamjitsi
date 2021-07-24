import React from "react";

export default function DestinationCard(props)
{

    return(
        <div className="destination-card">
        <div className="destination-card-left">
          <div className="destination-card-image">
                <img src = {props.destination.picture} className="destination-image"></img>
          </div>
          <div className="destination-card-left-text">
            <div className="destination-card-username">
               <b> {props.destination.name}</b>
            </div>
            <div className="destination-card-destination">
              {props.destination.destination}
            </div>
          </div>
        </div>
        <div className="destination-card-right">
          <div className="destination-card-action">

          </div>
        </div>
        
      </div>
    )

}