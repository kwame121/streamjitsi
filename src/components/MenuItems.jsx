import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { Menu, Dropdown, Button, Space } from "antd";
import { Modal } from "antd";


class MenuItems extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        { 

        }
    }

    render()
    {
        return(
            <>
              <Menu>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={()=>{this.props.useFacebook()}} >
                    Facebook
                </a>
                </Menu.Item>
                <Menu.Item>
                <a target="_blank" onClick={()=>{this.props.useTwitch()}}>
                    Twitch
                </a>
                </Menu.Item>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={()=>{this.props.useYoutube()}}>
                    Youtube
                </a>
                </Menu.Item>
            </Menu>
            </>
        )
    }
}

export default MenuItems;

