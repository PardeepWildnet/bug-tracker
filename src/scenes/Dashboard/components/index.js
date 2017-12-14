import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, Icon, Avatar } from 'antd';
import './style.css';

import { Link } from 'react-router-dom';
// import App from 'containers/App/App.js';
/*
import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';*/
const ContainerStyle = {
  margin: '0 auto',
  float: 'none',
  textAlign: 'center'
};

class DashboardView extends Component {
	render() {
		return (
			<div style = {ContainerStyle}>
        <div className = 'logo-style-container'>
          <img src={require("./../../../Assets/logo.jpg")}  />
        </div>

        <Link to="/dashboard/projects" >
          <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
             <img alt="example" width="100%" src={require("./../../../Assets/project.jpg")} className="custom-image"/>
             <div className="custom-card">
               <h3>Projects</h3>
             </div>
           </Card>
         </Link>

         <Link to="/dashboard/teams" >
          <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
             <img alt="example" width="100%" src={require("./../../../Assets/team.jpg")} className="custom-image"/>
             <div className="custom-card">
               <h3> Teams</h3>
             </div>
           </Card>
         </Link>

         <Link to="/dashboard/user" >
          <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
             <img alt="example" width="100%" src={require("./../../../Assets/users.jpg")} className="custom-image"/>
             <div className="custom-card">
               <h3>Users</h3>
             </div>
           </Card>
          </Link>

          <Link to="/dashboard/task" >
            <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
               <img alt="example" width="100%" src={require("./../../../Assets/tasks.png")} className="custom-image"/>
               <div className="custom-card">
                 <h3>Tasks</h3>
               </div>
             </Card>
          </Link>
			</div>
		)
	}
}

export default DashboardView;
			// <App />
