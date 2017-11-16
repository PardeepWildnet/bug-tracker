import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import './Links.css';

const menu = (
  <Menu>
	<NavLink  to="/dashboard" > Edit Profile  </NavLink><br />
	<NavLink  to="/dashboard" > Logout  </NavLink>
   
  </Menu>
);

const Links = () => (
    <div className = 'nav'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmaIqS1TAB4QRTndganGMDhkE9qjMlDjIJtpkKUs4DvuHq-C8O" className = 'logo-style'/>
        <NavLink  to="/dashboard" activeClassName = 'title-style' className = 'list-group-item title-style'  > Bug Tracker  </NavLink>
        <div className = 'navigations-style'>
	        <NavLink  to="/dashboard" activeClassName = 'active' className = 'list-group-item' > Dashboard  </NavLink>
	        <NavLink to="/projects" activeClassName = 'active' className = 'list-group-item' > Projects  </NavLink>
	        <NavLink to="/time" activeClassName = 'active' className = 'list-group-item' > Time Log  </NavLink>
	    </div>
	    <Dropdown overlay={menu} trigger={['click']}>
        	<img src="https://irp-cdn.multiscreensite.com/caad034c/dms3rep/multi/desktop/person-dummy-imagegirlnew.png" className = 'user-profile-style'/>
        </Dropdown>
    </div>
)

export default Links
// <Link to="ideas" params={{ testvalue: "hello" }}>Create Idea</Link>    