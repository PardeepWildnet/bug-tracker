import React, { Component } from 'react';
import { Form, Affix, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as projectListApi from './../../data/ProjectsList/api';
import * as api from './../../data/DeleteProject/api';
import EditProject from './../EditProjectDetails';
import './ProjectList.css'

const FormItem = Form.Item;

class ProjectsListView extends Component {
	constructor(props) {
		super(props);
		this.editProject = this.editProject.bind(this);
		this.deleteProject = this.deleteProject.bind(this);
		this.handlePageNumber = this.handlePageNumber.bind(this);
		this.state = {
			visible : false,
			projectName : 'nmnm',
			projectCreatedBy : 'jhjhj',
			projectDetails : 'kjk',
			projectStartDate : '',
			projectEndDate : '',
		}
	}

	handlePageNumber (value) {
		this.props.dispatch(projectListApi.fetchProjectsList(value));
	}

	editProject (project) {
		console.log("inside edit project", project);
		if(project) {
			this.setState({
				visible : !this.state.visible,
				projectName : project.projectName ,
				projectCreatedBy : project.projectCreatedBy , 
				projectDetails : project.Details ,
				projectStartDate : project.projectStartDate ,
				projectEndDate : project.projectEndDate
			})
		}
		else {
			this.setState({
				visible : !this.state.visible
			})
		}
		this.forceUpdate();
    	console.log(this.state.visible, project);
	}

	deleteProject (project) {
		this.props.dispatch(api.deleteProject(project))
		console.log("inside delete project", project);
	}

	render(){
		const { 
			projects 
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;
		console.log("project list is", projects);
		// const totalPages = (projects.totalRecords && projects.totalRecords / 10 )|| 2;
		return(
			<div>
				<div className = 'project-list-container'>
					<table className = 'table table-striped table-responsive'>
						<tbody>
								<tr>
								<th>S No.</th>
								<th>Name</th>
								<th>Created By</th>
								<th>Details</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Action</th>
							</tr>
						</tbody>
						
						<tbody>
					{
						projects ? 
						projects.data.result.map((project, index) => (
								<tr key = {index}>
									<td><Link to={'/tasks/' + project.id }> {index + 1} </Link></td>
									<td><Link to={'/tasks/' + project.id }> {project.projectName} </Link></td>
									<td><Link to={'/tasks/' + project.id }> {project.projectCreatedBy} </Link></td>
									<td><Link to={'/tasks/' + project.id }> {project.projectDetails} </Link></td>
									<td><Link to={'/tasks/' + project.id }> {project.projectStartDate} </Link></td>
									<td><Link to={'/tasks/' + project.id }> {project.projectEndDate} </Link></td>
									<td><i className="fa fa-pencil icon-style" onClick = {() => this.editProject(project) } aria-hidden="true"></i>
									<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteProject(project) } aria-hidden="true"></i></td>
								</tr>
						)) :
						<tr>
							<td colSpan = '7'>
								<img src={require("./../../../../Assets/loader.gif")} className = 'loader-style'/>
							</td>
						</tr>
					}
					</tbody>
					</table>
					<FormItem>
			          {getFieldDecorator('editProjectDetails', {
			            initialValue: { 
			            	projectName : this.state.projectName, 
			            	projectCreatedBy : this.state.projectCreatedBy,
			            	projectDetails : this.state.projectDetails, 
			            	projectStartDate : this.state.projectStartDate,
			            	projectEndDate : this.state.projectEndDate
			            },
			          })(
				          <EditProject
							visible = {this.state.visible}
							onCancel = { () => this.editProject()}
						/>
					  )}
			        </FormItem>
				</div>
			<Pagination defaultCurrent={1} total={this.totalPages} onChange = {this.handlePageNumber}/>
		</div>
		)
	}
}
const ProjectsList = Form.create()(ProjectsListView);
export default connect(
	state => {
		return ({
			projects : state.projects.data.projectsList[0]
		})
	}
)(ProjectsList);