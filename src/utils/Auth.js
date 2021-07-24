
// first, check local storage for user data... get most recent user object
//verify user credentials.. if verified, allow to remain on page, else redirect to login page..
//if logged out, destroy local storage stuff..
//get all destinations from destination table.. (that needs to be created...)
//create a flow for validating destinations... 

import axios from "axios";


//destination validation flow
//


export default class StreamJitsiAuthenticator
{
    constructor()
    {
        //check local storage for user data...
        //if data does not exist, redirect to auth page
        //if data does exist, verify that it is still valid... 
        //get token, use that to verify future api calls...
     

    }

    user_data = {};

    get_user_auth()
    {
        //need to rewrite this a bit....
        return new Promise((resolve,reject)=>
        {
            try
            {
                this.user_data = JSON.parse(localStorage.getItem('user_data'));
                resolve(this.user_data);
            }
            catch(e)
            {
                // lets assume this means no json exists in local storage...
                // window.location.href = 'http://localhost:3000/auth';
                reject(e);
            }

        }) 
    }

    login_user(username,password)
    {
        let login_data  = {"username":username,"password":password};
        return new Promise((resolve,reject)=>
        {
            axios.post('',{login_data})
            .then((result)=>
            {
                //read result to get login data
                resolve(result);
    
            })
            .catch((error)=>
            {
                reject(error);
            })

        })

    }

    register_user(userObject)
    {
        axios.post('',{userObject})
        .then((result)=>
        {

        })
        .catch((error)=>
        {

        })
    }





}