import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import Navbar from "../includes/navbar.jsx";
import Sidebar from "../includes/sidebar.jsx";
import { Breadcrumb } from 'antd';
import CONSTANTS from "../utils/Constants.js";
import { nanoid } from "nanoid";






class Destinations extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {

        }
    }

    componentDidMount()
    {

      
    }

    addTwitch(){

       window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=${CONSTANTS.Twitch.clientId}&redirect_uri=http://localhost:3000/destinations/auth/twitch&scope=viewing_activity_read+openid%20user_read%20channel:read:stream_key&state=c3ab8aa609ea11e793ae92361f002671&claims={"id_token":{"email_verified":null}}`;
    }

    addFacebook()
    {
      
    }

    async addYoutube()
    {
      try
      {
        let result = await axios.post('http://localhost:3001/youtube/get_auth_url',);
        window.location.href = result.data.url;
      }
      catch(e)
      {
        console.log(e.response);
      }    
    }

    render(){
        return(
          <>
            <div className="main-container">
            <Navbar></Navbar>
            <div className="content-area">
              <Sidebar selected ='destinations'></Sidebar>
    
              <div className="sidebar-right">
                <div className="destination-title">
                  <h2><b>Add Destinations </b></h2>
                </div>
                <div style={{marginBottom:'1rem'}}>
                <Breadcrumb>
                      <Breadcrumb.Item>Destinations</Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <a href="">Add Destinations</a>
                      </Breadcrumb.Item>
                </Breadcrumb>
                </div>
    
                <div className="button-area">
                <button className="option-button button-youtube" onClick={()=>{this.addYoutube()}}>
                <div>
                  <img className="button-logo" src="/images/youtube.svg"></img>
                </div>
                <div className="button-text">
                  <span>Youtube</span>
                </div>
              </button>

              <button
                className="option-button button-twitch"
                onClick={() => {
                  this.addTwitch();
                }}
              >
                <div>
                  <img className="button-logo" src="/images/twitch.svg"></img>
                </div>
                <div className="button-text">
                  <span>Twitch</span>
                </div>
              </button>

              <button
                className="option-button button-facebook"
                onClick={() => {
                  this.addFacebook();
                }}
              >
                <div>
                  <img className="button-logo" src="/images/facebook.svg"></img>
                </div>
                <div className="button-text">
                  <span>Facebook</span>
                </div>
              </button>


                </div>
              </div>
            </div>
          </div>
          </>
        )
    }


}

export default Destinations;