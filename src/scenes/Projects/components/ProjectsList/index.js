import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import './ProjectList.css'

class ProjectsList extends Component {
	render(){
		const { 
			projects 
		} = this.props;
		
		return(
			<div className = 'project-list-container'>
				{
					projects ? 
					projects.data.map((product) => (
						<Link to={'/tasks/' + product.id } key = {product.id}>
							
							<div key = {product.id} className = 'time-log-list-container'>
								<p className = 'date-style'> {product.email} </p>
								<p className = 'detail-style'>www.instagram.com </p>
								<p className = 'time-style'>{ product.name } </p>
								<i className="fa fa-pencil icon-style" aria-hidden="true"></i>
								<i className="fa fa-clock-o icon-style" aria-hidden="true"></i>
								<br />
							</div>
						</Link>
					)) :
					<img src={require("./../../../../Assets/loader.gif")} className = 'loader-style'/>
				}
			</div>
		)
	}
}

export default ProjectsList

// <Link to={'/tasks?id:' + product.id + '&email:' + product.email} key = {product.id}>
// <img src = 'https://cdn.dribbble.com/users/255512/screenshots/2215917/animation.gif' className = 'loader-style'/>

