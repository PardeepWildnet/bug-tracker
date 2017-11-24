import React, { Component } from 'react';
import { Card, Form } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as api from './../../data/DeleteTeam/api';
import EditTeam from './../EditTeamDetails';
import './TeamList.css'

const FormItem = Form.Item;

class TeamsListView extends Component {
	constructor() {
		super();
		this.editTeam = this.editTeam.bind(this);
		this.deleteTeam = this.deleteTeam.bind(this);
		this.state = {
			visible : false,
			teamName : 'name',
			teamCreatedBy : 'created by',
			teamDetails : 'detail',
			teamStartDate : '',
			teamEndDate : ''
		}
	}

	editTeam (team) {
		console.log("inside edit team", team);
		if(team) {
			this.setState({
				visible : !this.state.visible,
				teamName : team.teamName ,
				teamCreatedBy : team.teamCreatedBy , 
				teamDetails : team.Details ,
				teamStartDate : team.teamStartDate ,
				teamEndDate : team.teamEndDate
			})
		}
		else {
			this.setState({
				visible : !this.state.visible
			})
		}
		this.forceUpdate();
    	console.log(this.state.visible, team);
	}

	deleteTeam (team) {
		this.props.dispatch(api.deleteTeam(team))
		console.log("inside delete team", team);
	}

	render(){
		const { 
			teams 
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;

		return(
			<div className = 'project-list-container'>
				<table width = '100%' className = 'table table-striped table-responsive'>
					<tbody>
						<tr>
							<th>S No.</th>
							<th>Name</th>
							<th>Details</th>
							<th>Manager</th>
							<th>Team Leads</th>
							<th>Action</th>
						</tr>
					</tbody>
					
					<tbody>
						{
							teams ? 
							teams.result.map((team, index) => (
								<tr key = {index}>
									<td><Link to={'/tasks/' + team.id }> {index + 1} </Link></td>
									<td><Link to={'/tasks/' + team.id }> {team.projectName} </Link></td>
									<td><Link to={'/tasks/' + team.id }> {team.projectCreatedBy} </Link></td>
									<td><Link to={'/tasks/' + team.id }> {team.projectDetails} </Link></td>
									<td><Link to={'/tasks/' + team.id }> {team.projectStartDate} </Link></td>
									<td><i className="fa fa-pencil icon-style" onClick = {() => this.editTeam(team) } aria-hidden="true"></i>
									/<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteTeam(team) } aria-hidden="true"></i></td>
								</tr>
							)) :
							<tr>
								<td colSpan = '6'>
									<img src={require("./../../../../Assets/loader.gif")} className = 'loader-style'/>
								</td>
							</tr>
						}
					</tbody>
				</table>
				<FormItem>
		          {getFieldDecorator('editProjectDetails', {
		            initialValue: { 
		            	teamName : this.state.teamName, 
		            	teamCreatedBy : this.state.teamCreatedBy,
		            	teamDetails : this.state.teamDetails, 
		            	teamStartDate : this.state.teamStartDate,
		            	teamEndDate : this.state.teamEndDate
		            },
		          })(
			          <EditTeam
						visible = {this.state.visible}
						onCancel = { () => this.editTeam()}
					/>
				  )}
		        </FormItem>
			</div>
		)
	}
}
const TeamsList = Form.create()(TeamsListView);
export default connect(

)(TeamsList);