const axios = require('axios');


function validateTwitch(twitchObject)
{

}

function validateYoutube(youtubeObject)
{
  return new Promise((resolve,reject)=>
  {
    axios.post(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${youtubeObject.access_token}`)
    .then((result)=>{

    })
    .catch((error)=>{
      reject(error);
    })

  })

}

function validateFacebook()
{

}

export function streamTwitch(url)
{
   let hash = url.hash;
   let twitchObject = {};
   let params = hash.split('&');
   for (let i = 0; i<params.length; i++) // getting all the needed params and putting them into an object quickly...
   {
    let [name,value] = params[i].split("=");
    name = name.replace('#','');    
    twitchObject[name] = value;
   }

   return new Promise ((resolve,reject)=>
   {
    axios.post('http://localhost:3001/twitch/stream_twitch',{twitchObject}).then((result)=>
    {
      let data = result.data;
      let streamData = data['stream_data'].data[0];
      let userData = data['user_data'];
      resolve([streamData,userData]);
 
    }).catch((error)=>
    {
      reject(error);
    })

   })
  }

export function streamFacebook(url)
{

}

export function streamYoutube(url)
{
  let hash = url.hash;
  let youtubeObject = {};
  let params = hash.split('&');
  for (let i = 0; i<params.length; i++) // getting all the needed params and putting them into an object quickly...
  {
   let [name,value] = params[i].split("=");
   name = name.replace('#','');    
   youtubeObject[name] = value;
  }

  validateYoutube(youtubeObject).then((result)=>
  {

  }).catch((error)=>
  {
    
  })


  console.log(youtubeObject);
}

export default {streamTwitch, streamFacebook, streamYoutube}
