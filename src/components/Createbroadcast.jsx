import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { Menu, Dropdown, Button, Space } from "antd";
import { Modal } from "antd";
import MenuItems from "./MenuItems.jsx";
import { Utils } from "../utils/Utils.js";
import CONSTANTS from "../utils/Constants.js";

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
    };
  }

  addTwitch() { //duplicate code... fix this...
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
                    className="add_broadcast_btn"
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
            <input type="text" className="modal-input-field"></input>
          </div>

        </div>


          <div></div>
        </Modal>
      </>
    );
  }
}

export default Createbroadcast;
