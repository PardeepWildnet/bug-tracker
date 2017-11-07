import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import './ProjectList.css'

class ProjectsList extends Component {

	constructor(props){
		super(props);
	}

	render(){
		const { projects } = this.props;
		
		return(
			<div className = 'project-list-container'>
				{
					projects ? 
					projects.data.map((product) => (
						<Link to={'/tasks/' + product.id } key = {product.id}>
							
							<div  className = 'project-box-style'>
								<Card style={{ width: 240 }} bodyStyle={{ padding: 0 }} className = 'project-block-style'>
									<div className="custom-image-container">
									    <img alt="example" height="200px" width="100%" src = {product.image} className = 'custom-image'/>
										<hr />
									</div>
									<div className="custom-card">
									  <h3>{product.email}</h3>
									  <p>www.instagram.com</p>
									  <p> { product.name } </p>
									</div>
								</Card>

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
/*
0
:
agentCount
:
0
email
:
"hydraulix@x.com"
genre
:
"Electronic"
hover_image
:
""
id
:
1191
image
:
"http://actaagency.com.au/administrator//images/users/150660165876525.jpeg"
managerCount
:
0
name
:
"Hydraulix"
rating
:
0
*/
// <Link to={'/tasks?id:' + product.id + '&email:' + product.email} key = {product.id}>
// <img src = 'https://cdn.dribbble.com/users/255512/screenshots/2215917/animation.gif' className = 'loader-style'/>