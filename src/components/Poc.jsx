
import React from 'react';
import axios from 'axios';
import $ from "jquery";






class Poc extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
           reloadControl:true,
           code:'',
        };
      }

    componentDidMount()
    {   
        let url = new URL(window.location.href);
        let queryValue = url.search;
        if (queryValue !== '')
        {
            this.setState({...this.state,code:queryValue});
            
        }
      

    }

    streamTwitch()
    {

    }

    streamFacebook()
    {
       window.location.href = "https://www.facebook.com/v10.0/dialog/oauth?client_id=560317711602380&redirect_uri=http://localhost:3000/";

    

    }

    streamYoutuube()
    {

    }


    render()
    {
        return(
        <div className = "main-container">
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <img src="/images/streamJitsi.svg" style={{'width':'120px'}}></img>
                </div>
                <div className="nav-bar-right">

                </div>

            </div>

            <div className="content-area">
                <div className="sidebar-menu">
                    <div className="menu-item">
                        <span>Destination</span>
                    </div>

                </div>

                <div className="sidebar-right">

                    <div className="destination-title">
                        <h2>Stream Destination</h2>
                    </div>

                    <div className="button-area">
                        <button className="option-button button-youtube"><div><img className="button-logo" src="/images/youtube.svg"></img></div><div className="button-text"><span>Youtube</span></div></button>
                        <button className="option-button button-twitch"><div><img className="button-logo" src="/images/twitch.svg"></img></div><div className="button-text"><span>Twitch</span></div></button>
                        <button className="option-button button-facebook"  onClick={()=>{this.streamFacebook()}}><div><img className="button-logo" src="/images/facebook.svg"></img></div><div className="button-text"><span>Facebook</span></div></button>
                    </div>

                </div>
            </div>


        </div>)
    }

}

export default Poc;