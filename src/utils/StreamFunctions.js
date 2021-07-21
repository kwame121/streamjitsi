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

function validateFacebook() {}



export function streamTwitch(url) {
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

  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:3001/twitch/stream_twitch", { twitchObject })
      .then((result) => {
        let data = result.data;
        let streamData = data["stream_data"].data[0];
        let userData = data["user_data"];
        resolve([streamData, userData]);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function streamFacebook(url) {}

export async function streamYoutube(url) {
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

// export function streamYoutube(url)
// {

//   let query = url.search;
//   let params = query.split('&');
//   let youtubeObject = {};
//   for (let i = 0; i<params.length; i++) // getting all the needed params and putting them into an object quickly...
//   {
//    let [name,value] = params[i].split("=");
//    name = name.replace(/[&?#]/g,'');
//    youtubeObject[name] = value;
//   }

//   let sessionToken = localStorage.getItem('session_token');
//   if (sessionToken != youtubeObject['state'])
//   {
//     console.log('error, invalid authentication...');
//   }
//   else
//   {
//     console.log(youtubeObject);
//     let postObject = {
//       code:youtubeObject['code'],
//       client_id:CONSTANTS.Youtube.clientId,
//       redirect_uri:'http%3A%2F%2Flocalhost%3A3000%2Fdestinations%2Fauth%2Fyoutube',
//       grant_type:'authorization_code',
//     }

//     axios.post('http://localhost:3001/youtube/get_auth_details',{postObject})
//     .then((result)=>{
//       console.log(result.data);
//     })
//     .catch((error)=>{
//       console.log(error);
//     })

//   }

// return new Promise((resolve,reject)=>
// {
//   validateYoutube(youtubeObject).then((result)=>
//   {
//     //happen here?

//     console.log(result);
//     if (result)
//     {
//       resolve({status:true,youtubeObject:youtubeObject});
//     }

//     else
//     {
//       resolve({status:false,youtubeObject:{}});
//     }

//   }).catch((error)=>
//   {
//     reject(error);

//   })

// })

export default { streamTwitch, streamFacebook, streamYoutube };
