import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { withRouter, NavLink } from "react-router-dom";
import { Dropdown, Menu, Affix } from 'antd';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './Links.css';


const DrawerWidth = {
  width: '50%',
  '@media(minWidth: 768px)' : {
    width: '100%'
  }
}

class Links extends Component {
    constructor(props) {
        super(props);
        this.handleMenu = this.handleMenu.bind(this);
        this.state = {
            open: false
        };
    }


    handleMenu (e) {
        if(e.key === '2') {
            localStorage.clear();
            this.props.history.push('/logout');
            this.forceUpdate();
        }
        else {
            this.props.history.push('/dashboard/edit-profile');
        }
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
         const menu = (
            <Menu onClick = { this.handleMenu } >
                <Menu.Item key = '1'> Edit Profile </Menu.Item>
                <Menu.Item key = '2'> Logout </Menu.Item>
            </Menu>
        );
        return (
            <MuiThemeProvider>
                <div className = 'appbar-container'>
                        <AppBar
                            title="Bug Tracker"
                            iconElementRight= {<Dropdown overlay={menu} trigger={['click']}>
                                <img src={require("./../../Assets/userProfile.png")} style = {{height : '60px'}} />
                            </Dropdown>}
                            onLeftIconButtonTouchTap = {this.handleToggle}
                            className = 'appbar-style'
                            titleStyle = {{ textAlign : 'center'}}
                        />
                    
                    <Drawer
                        docked={false}
                        width= '50%'
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                        containerClassName = {`drawer-width-class ${(this.state.open ? 'open' : '' )}`}
                        width = { DrawerWidth.width }
                    >
                    <img src={require("./../../Assets/logo.jpg")}  className = 'logo-style'/>
                    
                    <i className="fa fa-times fa-lg close-icon-style" aria-hidden="true" onClick = { this.handleToggle }></i>

                      <ul className='list-style'>
                            <li><NavLink  to="/dashboard/user" className = 'list-group-item' activeClassName = 'active'  > User  </NavLink></li>
                            <li><NavLink  to="/dashboard/home" className = 'list-group-item' activeClassName = 'active'  > Dashboard  </NavLink></li>
                            <li><NavLink to="/dashboard/projects" className = 'list-group-item' activeClassName = 'active'  > Projects  </NavLink></li>
                            <li><NavLink to="/dashboard/teams" className = 'list-group-item' activeClassName = 'active'  > Teams  </NavLink></li>
                            <li><NavLink to="/dashboard/time" className = 'list-group-item' activeClassName = 'active'  > Time Log  </NavLink></li>
                            <li><NavLink to="/dashboard/task" className = 'list-group-item' activeClassName = 'active'  > Task  </NavLink></li>
                      </ul>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(Links);