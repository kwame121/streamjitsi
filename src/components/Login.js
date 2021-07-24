import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import StreamJitsiAuthenticator from "../utils/Auth";
import Utils from "../utils/Utils";


export default function Login()
{
    const [loginData, setLoginData] = useState({});
    const [registerData, setRegisterData] = useState({});
    const [view, setView] = useState(0);


    useEffect(()=>{
        // is there any required code here...
        let auth_controller =  new StreamJitsiAuthenticator();
        auth_controller.get_user_auth()
        .then((result)=>
        {
            if(result)
            {
                window.href.location = 'http://localhost:3000/';
            }
        })
        .catch((error)=>
        {
            // stay here.. basically means user has not logged in...
        })
    });

    return(
        <div className="login-area-main">
            <div className="login-area-content">
                {view===0?
                <LoginCard
                 changeView = {setView} 
                 view = {view}
                 editField = {setLoginData}
                 />:
                 <RegisterCard 
                 changeView = {setView} 
                 view = {view}
                 editField = {setRegisterData}/>
                 }
            </div>
        </div>

    );

}