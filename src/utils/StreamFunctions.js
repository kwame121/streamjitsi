import Constants from "./Constants.js";
const axios = require("axios");
const CONSTANTS = require("./Constants.js");

function validateTwitch(twitchObject) {}

function validateYoutube(youtubeObject) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${youtubeObject.access_token}`
      )
      .then((result) => {
        let data = result.data;
        console.log("CONSOLE DATAAAAA", data);
        if (data["issued_to"]) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        // reject(error);
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${CONSTANTS.Youtube.clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdestinations%2Fauth%2Fyoutube&scope=https://www.googleapis.com/auth/youtube&response_type=token`;
      });
  });
}



export async function start_streaming(broadcast,twitchObject)
{
  try
  {
    let destinations = broadcast.selectedDestinations;
    let promise_array = [];
    destinations.map((destination)=>{
      if (destination.destination==='youtube')
      {
        //trigger some kind of flow here....
        let youtube_promise = axios.post('http://localhost:3001/youtube/get_stream_credentials',{broadcastObject:broadcast});
        promise_array.push(youtube_promise);
      }
      else if (destination.destination==='twitch')
      {
        let twitch_promise = axios.post('http://localhost:3001/twitch/stream_twitch',{twitchObject:twitchObject});
        promise_array.push(twitch_promise);
        //trigger some kind of flow here..
  
      }
    });
    
    let stream_result = await axios.all(promise_array);
    console.log(stream_result.data);

    
  }
  catch(e)
  {
    console.error('error starting stream',e);
    return Promise.reject(e);
  }


}



export async function auth_youtube(url) {
  let query = url.search;
  let params = query.split("&");
  let authData = {};
  params.forEach((param) => {
    let [name, value] = param.split("=");
    name = name.replace(/[&?#]/g, "");
    authData[name] = value;
  });

  try
  {
    let result = await axios.post("http://localhost:3001/youtube/get_access_token", { authData });
    let {status,tokens,error,access_token} = result.data;
    if (status==='500')
    {
      console.error('Some kind of error occured',error);
    }
    else
    {
      console.dir('tokens',tokens);
      if (tokens!==null)
      {
        localStorage.setItem('youtube_oauth',JSON.stringify(tokens));
        try
        {
          let result = await axios.post('http://localhost:3001/youtube/get_user_data',{tokens:tokens});
          let {data} = result.data.user_data;
          localStorage.setItem('youtube_userData',JSON.stringify(data));
          console.log('IT IS FINISHEDDDDD....');
          window.location.href= 'http://localhost:3000/broadcasts';
          // alert('destination added....');
        }
        catch(e)
        {
          console.log('failed to get user data...',e);
        }   
      }
    }

  }

  catch(e)
  {
    console.error('Error detected',e.response);
  }
}


export function auth_twitch(url) {

  try
  {
    let hash = url.hash;
    let twitchObject = {};
    let params = hash.split("&");
    for (
      let i = 0;
      i < params.length;
      i++ // getting all the needed params and putting them into an object quickly...
    ) {
      let [name, value] = params[i].split("=");
      name = name.replace("#", "");
      twitchObject[name] = value;
    }
  
    let request = axios.post(`http://localhost:3001/twitch/get_user`,{twitchObject});
    let {data} = request;
    console.log(data);

    // //do the local storage stuff here...
    // window.location.href= 'http://localhost:3000/broadcasts';  
  }

  catch(e)
  {
    console.error(e);
  }
 
}


export function streamFacebook(url) {}




export default { auth_twitch,auth_youtube,start_streaming };
