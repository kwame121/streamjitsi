import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { Menu, Dropdown, Button, Space } from "antd";
import { Modal } from "antd";
import MenuItems from "./MenuItems.jsx";
import { Utils } from "../utils/Utils.js";
import CONSTANTS from "../utils/Constants.js";
import DestinationButton from "./DestinationButton.js";
import Datetimepicker from "./Datetimepicker.js";
import moment from "moment";



//david..... i finished up the form, so dont stress to much about that...  

class Createbroadcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addFacebook = this.addFacebook.bind(this);
    this.addTwitch = this.addTwitch.bind(this);
    this.addYoutube = this.addYoutube.bind(this);
    this.addDestination = this.addDestination.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.state = {
      destinationArray: [],
      selectedDestinations: [],
      broadcastForm:{
        eventName_text:'',
        jitsiUrl_url:'',
        start_time:moment(),
        end_time:moment(),
      },
      broadcasts:[],
    };

  }



  addTwitch() {
    window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=${CONSTANTS.Twitch.clientId}&redirect_uri=http://localhost:3000/destinations/auth/twitch&scope=viewing_activity_read+openid%20user_read%20channel:read:stream_key&state=c3ab8aa609ea11e793ae92361f002671&claims={"id_token":{"email_verified":null}}`;
  }

  addFacebook() {}

  async addYoutube() {
    try {
      let result = await axios.post(
        "http://localhost:3001/youtube/get_auth_url"
      );
      window.location.href = result.data.url;
    } catch (e) {
      console.log(e.response);
    }
  }

  componentDidMount() {
    let destination_array = Utils.get_destinations();
    this.setState({ ...this.state, destinationArray: destination_array });
  }

  editBroadcastForm(e,target){
    let value = e.target.value;
    let formObject  = this.state.broadcastForm;
    formObject[target] = value;
    this.setState({...this.state,broadcastForm:formObject});
  }

  destinationExists(destination)
  {
    let selectedDestinations = this.state.selectedDestinations;
    let exists = false;
    exists = selectedDestinations.some((element)=>
    {
      if (element.id===destination.id)
      {
        return true;
      }
    });
    return exists;
  }

  addDestination(destinationObject)
  {
    //check if destination exists, if so remove it, else add it...
    try
    {
      
          let selectedDestinations = this.state.selectedDestinations;
          if(!this.destinationExists(destinationObject))
          {
            selectedDestinations.push(destinationObject);
            this.setState({...this.state,selectedDestinations,selectedDestinations});
          }
          else
          {
            //removing already existing destination from array...
          let filteredDestination =  selectedDestinations.filter((destination)=>
            {
              if (destination.id !== destinationObject.id)
              {
                return destination;
              }

            })
          this.setState({...this.state,selectedDestinations:filteredDestination});
         
          }
    }

    catch(e)
    {
      console.error('Error detected',e);
    }
  }


  changeDate(date,field)
  {

    let formObject = this.state.broadcastForm;
    let moment_date = moment(date,"YYYY-MM-DD HH:mm:ss");
    let isBefore = false;
    try
    {
      if (field==='start_time')
      {
        let end_time_moment = moment(formObject.end_time,"YYYY-MM-DD HH:mm:ss");
        console.log(moment_date);
        isBefore = end_time_moment.isBefore(moment_date);
        if(isBefore)
        {
          alert('Start time cannot be after end-time');
        }
        else
        {
          formObject[field] = date;
          this.setState({...this.state,broadcastForm:formObject});
        }
      }
  
      else
      {
        let start_time_moment = moment(formObject.start_time,"YYYY-MM-DD HH:mm:ss");
        isBefore = moment_date.isBefore(start_time_moment);
        if (isBefore)
        {
          alert('End time cannot be before start time');
        }
        else
        {
          formObject[field] = date;
          this.setState({...this.state,formObject:formObject});
        }
  
      }

    }

    catch(e)
    {
      console.error(e);

    }
   

  }

  createBroadcast()
  {
    let formObject = this.state.broadcastForm;
    let {valid,error_array} = Utils.validate_form(formObject);
    console.log(valid);
    if (!valid)
    {
      alert(error_array);
    }
    else
    {

      let destinations = this.state.selectedDestinations;
      if (destinations.length===0)
      {
        alert('Must use at least one destination');
      }
      else
      {
        formObject.selectedDestinations = destinations; // adding the destinations as a new prop...
        try
        {
          let broadcastArray = localStorage.getItem("broadcasts")===null?[]:JSON.parse(localStorage.getItem("broadcasts"));
          broadcastArray.push(formObject);
          localStorage.setItem("broadcasts",JSON.stringify(broadcastArray));
          console.log(formObject);
          this.props.onOk();
          window.location.href=`http://localhost:3000/broadcasts`;

        }
        catch(e)
        {
          console.error('Errors detected dummy',e);

        }
      }



      //push formObject into local_storage... david do that here... so broadcasts should be an array, so just push the new validated broadcast
      //object
      // into the array, and set it back to local_storage and that should work
      //also, create a ui dialog to properly display the errors a user may get when filling the form wrongly, currently I use an alert,
      // so change that... its not the best lol


    }
  }



  //pass through some auth data and whatnot to validate shit...

  render() {
    return (
      <>
        <Modal
          title="Broadcast To"
          visible={this.props.isVisible}
          onOk={() => {
            this.props.onOk();
          }}
          onCancel={() => {
            this.props.onOk();
          }}
          footer={null}
        >

        <div className="modal-area-broadcast">
        <div className="button-area-create-modal">
            <div>
              <Dropdown
                overlay={
                  <MenuItems
                    useTwitch={this.addTwitch}
                    useFacebook={this.addFacebook}
                    useYoutube={this.addYoutube}
                  ></MenuItems>
                }
              >
                <button className="add_broadcast_btn">
                  <i class="fas fa-plus"></i>
                </button>
              </Dropdown>
            </div>

            {this.state.destinationArray.map((destination, index) => {
              return(
                <DestinationButton destinationObject={destination} OnClick={this.addDestination} selectedDestination={this.state.selectedDestinations}  />
              )
              

              // let imageurl = "";
              // switch (destination.destination) {
              //   case "youtube":
              //     imageurl = "youtube.svg";
              //     break;
              //   case "twitch":
              //     imageurl = "twitch.svg";
              //     break;
              // }
              // return (
              //   <div>
              //     <button
              //       className="add_broadcast_btn no-opacity"
              //       style={{ backgroundColor: "black" }}
              //     >
              //       <img
              //         src={`/images/${imageurl}`}
              //         style={{ width: "30px" }}
              //       ></img>
              //     </button>
              //   </div>
              // );
            })}
          </div>

          <div className="modal-input-row">
            <label>Event Name</label><br></br>
            <input type="text" className="modal-input-field" onChange={(e)=>{this.editBroadcastForm(e,'eventName_text')}}></input>
          </div>
          <div className="modal-input-row">
            <label>Jitsi URL</label><br></br>
            <input type="text" className="modal-input-field" onChange={(e)=>{this.editBroadcastForm(e,'jitsiUrl_url')}}></input>
          </div>

          <>
          <Datetimepicker broadcastObject = {this.state.broadcastForm} OnChange = {this.changeDate}/>
          </>
         
        
          <div className="modal-input-row">
            <button className="create-event-button" onClick={()=>{this.createBroadcast()}}>Create Event</button>
          </div>

        

        </div>


          <div></div>
        </Modal>
      </>
    );
  }
}

export default Createbroadcast;
