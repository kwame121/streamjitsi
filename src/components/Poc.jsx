import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from '@material-ui/core/Dialog';

class Poc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reloadControl: true,
      code: "",
      appSecret: "e0a46a1c5b0ba49776c1cc02dede42eb", //this is hella unsafe i knowwwwwwwww this is for demonstration.....
      accessToken: "",
      userid: "",
      testingFlag: "twitch",
      clientId: "h0rfqdr3ilgi6v6d4tcws0wtzl6cml",
      authorizationCodeTwitch: "",
      authorizationTwitchResponse: {},
      oauthResponseData: {},
      streamKeyTwitch: "",
      userObjectTwitch: {},
      streamInformation:
      {
        "twitch":false,
        "facebook":false,
        "youtube":false,
      },
      streamInforationDialog:false,
    };
  }


  validateTwitchOauth() //this should be a promise
  {


    let oauthAccessToken = this.state.authorizationCodeTwitch;
    let config = {
      headers: 
      {
        Authorization: "OAuth "+oauthAccessToken,
      }
    }

    return new Promise(function(resolve,reject)
    {
      
    axios.post(`https://id.twitch.tv/oauth2/validate`,config).then((response)=>
    {
      let data = response.data;
      // if ()
      // {
      //   resolve
       
      // }
      // else
      // {
       
      // }


    }).catch((error)=>
    {
      console.log(error);
    });

    })

  }

  componentDidMount() {
    if (this.state.testingFlag !== "twitch") {
      let url = new URL(window.location.href);
      let queryValue = url.search;
      if (queryValue !== "") {
        let modifiedQuery = queryValue.substr(6);
        console.log(modifiedQuery);
        this.setState({ ...this.state, code: modifiedQuery });
      }
    } else if (this.state.testingFlag==="twitch") { // url reading for data ...........
      let url = new URL(window.location.href);
      let hash = url.hash;
      if (hash !== "") {
        let parameterArray = hash.split("&");
        if (parameterArray.length !== 0) {
          let access_token = parameterArray[0].split("=");
          let id_token = parameterArray[1].split("=");
          let scope = parameterArray[2].split("=");
          let state = parameterArray[3].split("=");
          let token_type = parameterArray[4].split("=");

          access_token = access_token[1];
          id_token = id_token[1];
          scope = scope[1];
          state = state[1];
          token_type = token_type[1];

          let finalParameterObject = {};
          finalParameterObject["access_token"] = access_token;
          finalParameterObject["id_token"] = id_token;
          finalParameterObject["scope"] = scope;
          finalParameterObject["state"] = state;
          finalParameterObject["token_type"] = token_type;

          console.log(finalParameterObject);
          this.setState({
            ...this.state,
            oauthResponseData: finalParameterObject,
            authorizationCodeTwitch: finalParameterObject.access_token,
          });
        }
      }
    }
  }

  streamTwitch() {
    if (this.state.authorizationCodeTwitch === "") {
      window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=${this.state.clientId}&redirect_uri=http://localhost:3000/poc&scope=viewing_activity_read+openid%20user_read%20channel:read:stream_key&state=c3ab8aa609ea11e793ae92361f002671&claims={"id_token":{"email_verified":null}}`;
    } else {
      console.log("Twitch url", this.state.authorizationCodeTwitch);
      let oauthResponseData = this.state.oauthResponseData;
      let authorizationCodeTwitch = this.state.authorizationCodeTwitch;

      axios.post('http://localhost:3001/twitch/stream_twitch',{oauthResponseData,authorizationCodeTwitch}).then((result)=>
      {
        let data = result.data;
        console.log(data.data);
        let streamKey = data.data[0].stream_key;
        this.setState({...this.state,streamKeyTwitch:streamKey})


      }).catch((error)=>
      {
        console.log(error);
      })
    }
  }

  streamFacebook() {
    if (this.state.code === "") {
      window.location.href =
        "https://www.facebook.com/v10.0/dialog/oauth?client_id=560317711602380&redirect_uri=http://localhost:3000/";
    } else {
      axios
        .get(
          `https://graph.facebook.com/v10.0/oauth/access_token?client_id=560317711602380&redirect_uri=http://localhost:3000/&client_secret=e0a46a1c5b0ba49776c1cc02dede42eb&code=${this.state.code}`
        )
        .then((result) => {
          let userobject = result.data;
          let accessToken = userobject.access_token;
          this.setState({ ...this.state, accessToken: accessToken });

          axios
            .get(
              `https://graph.facebook.com/me?fields=id&access_token=${this.state.accessToken}`
            )
            .then((result) => {
              let userid = result;
              this.setState({ ...this.state, userid: userid.data.id });

              axios
                .get(
                  `https://graph.facebook.com/${this.state.userid}/live_videos?status=LIVE_NOW&title=Today%27s%20Live%20Video&description=This%20is%20the%20live%20video%20for%20today.&access_token=${this.state.accessToken}`
                )
                .then((result) => {
                  let responseData = result.data;
                  let { id, stream_url, secure_stream_url } = responseData;
                  console.log(stream_url);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          window.location.href =
            "https://www.facebook.com/v10.0/dialog/oauth?client_id=560317711602380&redirect_uri=http://localhost:3000/";
        });
    }
  }

  streamYoutube() {
    
  }

  render() {
    return (
      <>
      <Dialog
        PaperProps={{
          style: {
            minWidth: "50%",
            padding: "2rem",
          },
        }}

        open={this.state.streamInforationDialog}
        onClose={()=>{this.setState({...this.state,streamInforationDialog:false})}}
      >

        <div className="stream-information-main"> 
        <div className="stream-information-title">
          Stream Preferences
        </div>
        <div className="stream-information-body">
          <div className="stream-option-card">

          </div>
        </div>
        </div>

      </Dialog>

      <div className="main-container">
        <div className="nav-bar">
          <div className="nav-bar-left">
            <img src="/images/streamJitsi.svg" style={{ width: "120px" }}></img>
          </div>
          <div className="nav-bar-right"></div>
        </div>

        <div className="content-area">
          <div className="sidebar-menu">
            <div className="menu-item">
              <span>Destination</span>
            </div>
            <div className="menu-item">
              <span>Broadcasts</span>
            </div>
          </div>

          <div className="sidebar-right">
            <div className="destination-title">
              <h2>Stream Destination</h2>
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
    );
  }
}

export default Poc;
