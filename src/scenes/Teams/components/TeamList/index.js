import React, { Component } from 'react';
import { Card, Form } from 'antd';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import * as teamListApi from './../../data/TeamsList/api';
import * as api from './../../data/DeleteTeam/api';
// import EditTeam from './../EditTeamDetails';
import './TeamList.css'

const FormItem = Form.Item;

class TeamsListView extends Component {
	constructor() {
		super();

		this.handlePageNumber = this.handlePageNumber.bind(this);
		this.deleteTeam = this.deleteTeam.bind(this);
		
		this.state = {
			visible : false,
			pageNumber : 1
		}
	}

	handlePageNumber (value) {
		this.setState({
			pageNumber : value
		}, function() {
			console.log("current page number is", this.state.pageNumber);
		})
		this.props.dispatch(teamListApi.fetchTeamList(value));
	}

	deleteTeam (team) {
		this.props.dispatch(api.deleteTeam(team))
		console.log("inside delete team", team);
	}

	render(){
		const { teams } = this.props;

		const { getFieldDecorator } = this.props.form;

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
									<td><Link to={'/tasks/' + team.id }> {index + ((this.state.pageNumber - 1) * 10) + 1}</Link></td>
									<td><Link to={'/tasks/' + team.id }> {team.teamTitle ? team.teamTitle : '-'} </Link></td>
									<td><Link to={'/tasks/' + team.id }> {team.teamDetails ? team.teamDetails : '-'} </Link></td>
									<td><Link to={'/tasks/' + team.id }> {team.teamManagerId ? team.teamManagerId : '-'} </Link></td>
									<td>
										<Link to={'/tasks/' + team.id }> 
											{team.teamLeadsId ? team.teamLeadsId.map((tl, index) => (
												<p key = {index}>{tl ? tl : '-'}</p>))  : '-'
											} 
										</Link>
									</td>
									<td>
										<Link to={'/dashboard/teams/' + team._id }><i className="fa fa-eye icon-style" aria-hidden="true"></i></Link>
										<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteTeam(team) } aria-hidden="true"></i>
									</td>
								</tr>
							)) :
							<tr>
								<td colSpan = '6'>
									<img src={require("./../../../../Assets/loader.gif")} role="presentation" className = 'loader-style'/>
								</td>
							</tr>
						}
					</tbody>
				</table>
				
				<Pagination defaultCurrent={1} total={teams ? teams.totalRecords : 10} onChange = {this.handlePageNumber}/>
			</div>
		)
	}
}
const TeamsList = Form.create()(TeamsListView);
export default connect()(TeamsList);