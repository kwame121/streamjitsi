import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from '@material-ui/core/Dialog';



class Navbar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }


    componentDidMount()
    {

    }

    render()
    {
        return(
        <div className="nav-bar">
            <div className="nav-bar-left">
              <img src="/images/streamJitsi.svg" style={{ width: "120px" }}></img>
            </div>
            <div className="nav-bar-right"></div>
        </div>
        )
    }
}

export default Navbar;
