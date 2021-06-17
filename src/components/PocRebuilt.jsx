import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import Navbar from "../includes/navbar.jsx";
import Sidebar from "../includes/sidebar.jsx";
import { Tabs } from 'antd';

const { TabPane } = Tabs;


class PocRebuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() 
  {
    

  }

  render() {
    return (
      <div className="main-container">
        <Navbar></Navbar>
        <div className="content-area">
          <Sidebar selected ='destinations'></Sidebar>

          <div className="sidebar-right">
            <div className="destination-title">
              <div><h2><b>Your Destinations</b></h2></div>
              <div style={{order:'2',marginLeft:'auto'}}><button className="add-destination" onClick={()=>{this.props.history.push("/destinations/add");}}><span style={{marginRight:'0.2rem'}}>Add a Destination</span> <i class="fas fa-plus-circle"></i></button></div>
             
            </div>

            {/* <div className="button-area">
                <button className="add-destination"><span style={{marginRight:'0.2rem'}}>Add a Destination</span> <i class="fas fa-plus-circle"></i></button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}


export default PocRebuild;
