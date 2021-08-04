import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import Navbar from "../includes/navbar.jsx";
import Sidebar from "../includes/sidebar.jsx";
import { Tabs } from "antd";
import { Spin } from "antd";
import { Modal } from "antd";
import StreamFunctions from '../utils/StreamFunctions.js';

const { TabPane } = Tabs;

class StreamAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: true,
    };
  }

  componentDidMount() {

    let url = new URL(window.location.href);
    let destination = url.pathname.split('/')[3];
    switch(destination)
    {
      case "twitch":
        StreamFunctions.auth_twitch(url);
        break;
      
      case "facebook":
        break;
      
      case "youtube":
        StreamFunctions.auth_youtube(url);
        break;

    }
  }

  render() {
    return (
      <>
        <Modal
          visible={this.state.isAuthenticating}
          footer={null}
          closable={false}
        >
          <div className="auth-loader">
            <Spin size="large"></Spin>
          </div>
          <div
            style={{ marginTop: "0.5rem", width: "100%", textAlign: "center" }}
          >
            Getting Stream Credentials...
          </div>
        </Modal>
        <div className="main-container">
          <Navbar></Navbar>
          <div className="content-area">
            <Sidebar selected="destinations"></Sidebar>

            <div className="sidebar-right">
              <div className="destination-title">
                <div>
                  <h2>
                    <b>Your Destinations</b>
                  </h2>
                </div>
              </div>

              {/* <div className="button-area">
                <button className="add-destination"><span style={{marginRight:'0.2rem'}}>Add a Destination</span> <i class="fas fa-plus-circle"></i></button>
            </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StreamAuth;
