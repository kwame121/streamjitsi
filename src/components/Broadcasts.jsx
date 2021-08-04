import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import Navbar from "../includes/navbar.jsx";
import Sidebar from "../includes/sidebar.jsx";
import "antd/dist/antd.css";
import { Tabs, Table, Tag, Space  } from "antd";
import Createbroadcast from "./Createbroadcast.jsx";
import { Utils } from "../utils/Utils.js";
import BroadcastCard from "./BroadcastCard.js";

const { TabPane } = Tabs;


//write code to iterate through the broadcasts array, using the function you created in the Utils file....
// go to utils.js, i wrote some comments there too
// display it in some kind of ui view.. use the code i wrote in the PocRebuilt.jsx as a reference....
// to make it easier, create a functional component to render it 
// add a state variable to hold all the broadcasts
//also, display a view if there are no available broadcasts, do same for the destinations in the PocRebuilt.jsx file...
class Broadcasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      isCreateModalVisible:false,
      broadcasts:[],
    };
    this.vanishModal = this.vanishModal.bind(this); 
    this.startBroadcast = this.startBroadcast.bind(this);
  }

  componentDidMount() {
    let broadcasts = Utils.get_broadcasts();
    this.setState({...this.state,broadcasts:broadcasts});
  }


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

  async startBroadcast(broadcast_obj)
  {
    try
    {
      let broadcast_req = await axios.post('http://localhost:3001/youtube/get_stream_credentials',{broadcastObject:broadcast_obj});
      let {status,broadcast} = broadcast_req.data;
      if (status!=='500'){
        console.log(broadcast);
      }
    }
    catch(e)
    {
      console.error('Error occured getting broadcast data',e);
    }
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
                    <div className="upcoming-broadcast-main">
                      <table className="broadcast-table">
                        <thead className="broadcast-table-head">
                          <tr className="broadcast-table-row">
                            <th className="broadcast-head-col">Title</th>
                            <th className="broadcast-head-col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.broadcasts.map((broadcast)=>
                      {
                        return(
                          <BroadcastCard broadcast_obj={broadcast} OnClick={this.startBroadcast}  />
                        )
                      })}
                        </tbody>
                      </table>

                    
                          
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
