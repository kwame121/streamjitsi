import React from "react";

export default function BroadcastCard({broadcast})
{

    return(
        <div className="destination-card">
        <div className="destination-card-left">
          <div className="destination-card-left-text">
            <div className="destination-card-username">
               <b> {broadcast.eventName_text}</b>
            </div>
            <div className="destination-card-destination">
              {broadcast.jitsiUrl_url}
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