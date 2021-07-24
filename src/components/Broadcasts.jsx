import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import Navbar from "../includes/navbar.jsx";
import Sidebar from "../includes/sidebar.jsx";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import Createbroadcast from "./Createbroadcast.jsx";

const { TabPane } = Tabs;


//write code to iterate through the broadcasts array, using the function you created in the Utils file....
// display it in some kind of ui view.. use the code i wrote in the PocRebuilt.jsx as a reference....
//also, display a view if there are no available broadcasts, do same for the destinations in the PocRebuilt.jsx file...
class Broadcasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      isCreateModalVisible:false,
    };
    this.vanishModal = this.vanishModal.bind(this); 
  }

  componentDidMount() {}


  setIsModalVisible()
  {
    this.setState({...this.state,isCreateModalVisible:true});
  }

  
  vanishModal()
  {
    this.setState({...this.state,isCreateModalVisible:false});
  }

  changeTabValue(value) 
  {
    this.setState({ ...this.state, tabValue: value });
  }

  render() {
    return (
      <>
      <Createbroadcast isVisible = {this.state.isCreateModalVisible} onOk = {this.vanishModal} ></Createbroadcast>
      <div className="main-container">
        <Navbar></Navbar>
        <div className="content-area">
          <Sidebar selected="broadcasts"></Sidebar>

          <div className="sidebar-right">
            <div className="tab-row">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Upcoming Broadcasts" key="1">
                  <div className="main-area">
                    <div className="button-area">
                      <button className="add-destination" onClick={()=>{this.setIsModalVisible()}}>
                        Create Broadcast
                      </button>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Past Broadcasts" key="2">
                  Content of Tab Pane 2
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Broadcasts;
