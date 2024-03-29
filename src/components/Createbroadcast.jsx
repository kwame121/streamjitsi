import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { Menu, Dropdown, Button, Space } from "antd";
import { Modal } from "antd";
import MenuItems from "./MenuItems.jsx";
import { Utils } from "../utils/Utils.js";
import CONSTANTS from "../utils/Constants.js";



//david..... i finished up the form, so dont stress to much about that...  

class Createbroadcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addFacebook = this.addFacebook.bind(this);
    this.addTwitch = this.addTwitch.bind(this);
    this.addYoutube = this.addYoutube.bind(this);
    this.state = {
      destinationArray: [],
      selectedDestinations: [],
      broadcastForm:{
        eventName_text:'',
        jitsiUrl_url:'',
      },
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

  createBroadcast()
  {
    let formObject = this.state.broadcastForm;
    let {valid,error_array} = Utils.validate_form(formObject);
    console.log(valid);
    if (!valid)
    {
      alert(error_array);
      console.log(Utils.get_broadcasts())
    }
    else
    {
      //push formObject into local_storage... david do that here... so broadcasts should be an array, so just push the new validated broadcast
      //object
      // into the array, and set it back to local_storage and that should work
      //also, create a ui dialog to properly display the errors a user may get when filling the form wrongly, currently I use an alert,
      // so change that... its not the best lol


      // Convert the form object to a JSON string
      const formObjectJson = JSON.stringify(formObject)

      // Generate a random number
      const id = Math.floor(Math.random() * 1000000) + 1

      // Create a name for the object
      let name = 'form-object-' + id

      // Set the item
      localStorage.setItem(name, formObjectJson);

      alert('Valid Inputs')
      this.props.onOk();

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
              let imageurl = "";
              switch (destination.destination) {
                case "youtube":
                  imageurl = "youtube.svg";
                  break;
                case "twitch":
                  imageurl = "twitch.svg";
                  break;
              }
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
