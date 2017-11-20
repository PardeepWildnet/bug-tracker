import React, { Component } from 'react';
import { withRouter, NavLink } from "react-router-dom";
import { Dropdown, Menu } from 'antd';

import './Links.css';

class Links extends Component {
    constructor(props) {
        super(props);
        this.handleMenu = this.handleMenu.bind(this);
    }

    handleMenu (e) {
        if(e.key == '2') {
            localStorage.clear();
            this.forceUpdate();
            window.location.reload();
        }
    }

    render () {
        const menu = (
            <Menu onClick = { this.handleMenu } >
                <Menu.Item key="1"> Edit Profile </Menu.Item>
                <Menu.Item key="2"> Logout </Menu.Item>
            </Menu>
        );

        return (
            <div>
            
            <div className = 'nav' >
                <img src={require("./../../Assets/logo.jpg")}  className = 'logo-style'/>
                <NavLink  to="/dashboard/home" activeClassName = 'title-style' className = 'list-group-item title-style'  > Bug Tracker  </NavLink>
                
                <div className = 'navigations-style'>
                    <NavLink  to="/dashboard/home" activeClassName = 'active' className = 'list-group-item' > Dashboard  </NavLink>
                    <NavLink to="/dashboard/projects" activeClassName = 'active' className = 'list-group-item' > Projects  </NavLink>
                    <NavLink to="/dashboard/time" activeClassName = 'active' className = 'list-group-item' > Time Log  </NavLink>
                </div>

                <Dropdown overlay={menu} trigger={['click']}>
                    <img src={require("./../../Assets/userProfile.png")} className = 'user-profile-style'/>
                </Dropdown>
            </div>
            </div>
        )

  }
}

export default withRouter(Links);