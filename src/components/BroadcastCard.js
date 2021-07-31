import React from "react";
import classNames from "classnames";


export default function BroadcastCard(props) {

    function returnFirstString(string)
    {
        return string.charAt(0);
    }

    
  return(
    <tr style={{border:'1px solid #d6d6d6'}}>
    <td style={{padding:'0.5rem'}}>
        <div className="broadcast-title-area">
            {/* <div className="broadcast-logo">
                <span>{returnFirstString(props.broadcast_obj.eventName_text)}</span>
            </div> */}
            <div className="broadcast-title-main">
                <div className="broadcast-title">
                   <i>{props.broadcast_obj.eventName_text}</i>
                </div>
                <div className="broadcast-destination">
                    {props.broadcast_obj.selectedDestinations.map((destination,index)=>
                    {
                        let classnames = classNames({'destination-pill':true,'twitch':destination.destination==='twitch','youtube':destination.destination==='youtube','facebook':destination.destination==='facebook'})
                        return(
                            <span className={classnames}>{destination.destination}</span>
                        )
                    })}
                </div>
            </div>
        </div> 
    </td>
    <td>
        <div className="broadcast-action-area">
            <button className="start-broadcast-button">Start Broadcast</button>
            <button className="delete-broadcast-button">Delete Broadcast</button>
        </div>

    </td>
  </tr>

  );

}
