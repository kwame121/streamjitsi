import React from "react";
import axios from "axios";
import $ from "jquery";

class Poc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reloadControl: true,
      code: "",
      appSecret: "e0a46a1c5b0ba49776c1cc02dede42eb",
      accessToken: "",
      userid: "",
    };
  }

  componentDidMount() {
    let url = new URL(window.location.href);
    let queryValue = url.search;
    if (queryValue !== "") {
      let modifiedQuery = queryValue.substr(6);
      this.setState({ ...this.state, code: modifiedQuery });
    }
  }

  streamTwitch() {}

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
              <button className="option-button button-twitch">
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
