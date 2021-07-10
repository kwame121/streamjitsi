import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { Menu, Dropdown, Button, Space } from "antd";
import { Modal } from "antd";
import MenuItems from './MenuItems.jsx';



class Createbroadcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.useFacebook = this.useFacebook.bind(this);
    this.useTwitch = this.useTwitch.bind(this);
  }

  useTwitch()
  {
   

  }

  useFacebook()
  {

  }

  useYoutube()
  {
    
  }

  componentDidMount()
  {
    
  }

  //pass through some auth data and whatnot to validate shit...

  render() {
    return (
      <>
        <Modal
          title="Broadcast To"
          visible={this.props.isVisible}
          onOk={() => {
            this.props.onOk();
          }}
          onCancel={() => {
            this.props.onOk();
          }}
          footer={null}
        >
          <p>
            <Dropdown overlay={<MenuItems useTwitch = {this.useTwitch} useFacebook = {this.useFacebook} useYoutube = {this.useYoutube}  ></MenuItems>}>
              <button className="add_broadcast_btn">
                <i class="fas fa-plus"></i>
              </button>
            </Dropdown>

            
          </p>
        </Modal>
      </>
    );
  }
}

export default Createbroadcast;
