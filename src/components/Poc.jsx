import React from "react";
import axios from "axios";
import $ from "jquery";

class Poc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reloadControl: true,
      code: "",
      appSecret: "e0a46a1c5b0ba49776c1cc02dede42eb", //this is hella unsafe i knowwwwwwwww this is for demonstration.....
      accessToken: "",
      userid: "",
      testingFlag:'twitch',
      clientId:'h0rfqdr3ilgi6v6d4tcws0wtzl6cml',
      authorizationCodeTwitch:'',
      authorizationTwitchResponse:{},
      oauthResponseData:{}
    };
  }

  componentDidMount() {

     
      if(this.state.testingFlag!=='twitch')
      {
        let url = new URL(window.location.href);
        let queryValue = url.search;
        if (queryValue !== "") {
        let modifiedQuery = queryValue.substr(6);
        console.log(modifiedQuery);
        this.setState({ ...this.state, code: modifiedQuery });
      }
      }
      else
      {
        let url = new URL(window.location.href);
        let hash = url.hash;
        if (hash!=='')
        {
          let parameterArray = hash.split('&');
          if (parameterArray.length !== 0)
          {
            console.log(parameterArray);
  
            let access_token = parameterArray[0].split('=');
            let id_token = parameterArray[1].split('=');
            let scope = parameterArray[2].split('=');
            let state = parameterArray[3].split('=');
            let token_type = parameterArray[4].split('=');
    
            access_token = access_token[1];
            id_token = id_token[1];
            scope = scope[1];
            state  = state[1];
            token_type = token_type[1];
    
            let finalParameterObject = {};
            finalParameterObject['access_token'] = access_token;
            finalParameterObject['id_token'] = id_token;
            finalParameterObject['scope'] = scope;
            finalParameterObject['state'] = state;
            finalParameterObject['token_type'] = token_type;
    
            console.log(finalParameterObject);
            this.setState({...this.state,oauthResponseData:finalParameterObject,authorizationCodeTwitch:finalParameterObject.access_token});
          }

        }


}
}

  streamTwitch() {

    if (this.state.authorizationCodeTwitch ==="")
    {
      window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=${this.state.clientId}&redirect_uri=http://localhost:3000/&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671&claims={"id_token":{"email_verified":null}}`;
    }

    else
    {
      console.log('Twitch url',this.state.authorizationCodeTwitch);
      axios.post( `https://id.twitch.tv/oauth2/token?client_id=${this.state.clientId}&client_secret=9iyv343znh91asivljziyqjlzmgyyw&grant_type=client_credentials`)
      .then((result)=>{
        let data = result.data;
        console.log('twitch response',data);
        this.setState({...this.state,authorizationTwitchResponse:data});
        
        let config = {headers:{
                      Authorization: 'Bearer' + this.state.authorizationCodeTwitch, 'Client-Id': this.state.clientId,
                      // Client-Id: this.state.clientId,
        }};

        axios.get(' https://api.twitch.tv/helix/streams/key',config).then((response)=>
        {
          let data = response.data;
          console.log(data);

        }).catch((error)=>{console.log(error)})

      })
      .catch((error)=>{
        console.log(error);})

    }
  }

  streamFacebook() {
    if (this.state.code === "") {
      window.location.href = "https://www.facebook.com/v10.0/dialog/oauth?client_id=560317711602380&redirect_uri=http://localhost:3000/";
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
                    let {id,stream_url,secure_stream_url} = responseData;
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

  streamYoutuube() {}

  render() {
    return (
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
              <button className="option-button button-twitch" onClick={()=>{this.streamTwitch();}}>
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
    );
  }
}

export default Poc;
