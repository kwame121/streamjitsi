import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import Navbar from "../includes/navbar.jsx";
import Sidebar from "../includes/sidebar.jsx";
import { Breadcrumb } from 'antd';




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

    streamTwitch(){


    }

    streamFacebook()
    {

    }

    streamYoutube()
    {
      
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
                <button className="option-button button-youtube">
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
                  this.streamTwitch();
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
                  this.streamFacebook();
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