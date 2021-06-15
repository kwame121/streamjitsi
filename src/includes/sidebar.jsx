import React from "react";
import axios from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import classNames from 'classnames/bind';
import {Link} from "react-router-dom";



class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let classNameDestination = classNames('menu-item',{selected:(this.props.selected==='destinations')});
    let classNameBroadcasts = classNames('menu-item',{selected:(this.props.selected==='broadcasts')});
    return (
      <div className="sidebar-menu">
          <Link to ={`/`} style={{ textDecoration: 'none' }}>
          <div className={classNameDestination}>
          <div style={{marginRight:'1rem'}}>
            <i class="fas fa-share-alt"></i>
          </div>
          <div>Destination</div>
        </div>
          </Link>
        <Link to ={`/broadcasts`} style={{ textDecoration: 'none' }}>
        <div className={classNameBroadcasts}>
          <div style={{marginRight:'1rem'}}>
            <i class="fas fa-video"></i>
          </div>
          <div>Broadcasts</div>
        </div>
        </Link>
        </div>

    );
  }
}

export default Sidebar;
