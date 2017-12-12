import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Modal, Select, Button, Form, Tooltip, Popconfirm  } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as teamListApi from './../../data/TeamsList/api';
import * as api from './../../data/DeleteTeam/api';
import * as addMemberApi from './../../data/AddMember/api';
import * as getMemberApi from './../../data/GetMember/api';
// import EditTeam from './../EditTeamDetails';
import './TeamList.css'

const Option = Select.Option;
const FormItem = Form.Item;

class TeamsListView extends Component {
	constructor() {
		super();

		this.handlePageNumber = this.handlePageNumber.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.showModal = this.showModal.bind(this);
		this.deleteTeam = this.deleteTeam.bind(this);

		this.state = {
			visible : false,
			id : '',
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


	// This method is used to show the add team modal
	showModal (values) {
		this.props.dispatch(getMemberApi.getMemberList(values))
		this.setState({
		  visible: !this.state.visible,
		  id : values._id
		});
	}

	// This method is used to close the add team modal
	handleCancel () {
		console.log('Clicked cancel button');
		this.setState({
		  visible: false,
		});
	}

	// This method is used to add team
	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(addMemberApi.addTeamMember(values, this.state.id))
		    this.setState({
			  visible: false,
			});
		  }
		});
	}

	// This method is used to get the leads
	/*handleTeamMembers(value) {
	  console.log(`selected ${value}`);
	  this.setState({
	  	teamMember : value
	  }, function() {
	  	console.log("selected Leads are :- ", this.state.teamMember);
	  })
	}*/

	deleteTeam (team) {
		this.props.dispatch(api.deleteTeam(team))
		console.log("inside delete team", team);
	}

	render(){
		const {
			teams,
			teamMember ,
			form : {getFieldDecorator}
		} = this.props;

		debugger
		const renderMemberList = teamMember ? teamMember.result.map((tl) => (
	    	<Option
	    		value={ tl._id }
	    		key = { tl._id }
	    	>
	    		{ tl.firstName } { tl.lastName }
	    	</Option>
	  )) : '';

	  console.log("memberList is", teamMember);
		return(
			<div className = 'project-list-container'>
				<p className = 'total-record-style'>Total Teams : {teams ? teams.totalRecords : '0'} </p>
				<table width = '100%' className = 'table table-striped table-responsive'>
					<tbody>
						<tr>
							<th>S No.</th>
							<th>Name</th>
							<th>Manager</th>
							<th>Team Leads</th>
							<th>Team Members</th>
							<th>Action</th>
						</tr>
					</tbody>

					<tbody>
						{
							teams ?
							teams.result.map((team, index) => (
								<tr key = {index}>
									<td> {index + ((this.state.pageNumber - 1) * 10) + 1}</td>
									<td> {team.teamTitle ? team.teamTitle : '-'} </td>
									<td> {team.teamManagerId ? team.teamManagerId.firstName + " " + team.teamManagerId.lastName : '-'} </td>
									<td>
										{
											team.teamLeadsId ? team.teamLeadsId.map((tl, index) => (
												<p key = {index}>{tl ? tl.firstName + " " + tl.lastName : '-'}</p>))  : '-'
										}
									</td>
									<td>
										{
											team.teamMembersId ? team.teamMembersId.map((tl, index) => (
												<p key = {index}>{tl ? tl.firstName + " " + tl.lastName : '-'}</p>))  : '-'
										}
									</td>
									<td>
										<Link to={'/dashboard/teams/' + team._id }>
											<Tooltip title="Team Detail Here">
												<i className="fa fa-eye icon-style" aria-hidden="true"></i>
											</Tooltip>
										</Link>

										<Tooltip title="Add Team Member">
											<i className="fa fa-plus-square icon-style" onClick={() => this.showModal(team) } aria-hidden="true"></i>
										</Tooltip>

										<Popconfirm title="Are you sure delete this Team ?" onConfirm= {() => this.deleteTeam(team) } okText="Yes" cancelText="No">
											<i className="fa fa-trash-o icon-style"  aria-hidden="true"></i>
										</Popconfirm>
									</td>
								</tr>
							)) :
							<tr>
								<td colSpan = '6'>
									No Record Found
								</td>
							</tr>
						}
					</tbody>
				</table>

				<Modal title="Add Team Member"
		          visible={this.state.visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		        	<Form onSubmit = { this.handleSubmit }>
			        	<FormItem>
				          {getFieldDecorator('teamMember', {
				            rules: [{ required: true, message: 'Please input TL name!' }],
				          })(
							<Select  mode="multiple" placeholder="Select Team Member" onChange={this.handleTeamMembers} >
						        {renderMemberList}
						    </Select>
						  )}
				        </FormItem>

				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				          	Add Team Member
				          </Button>
				        </FormItem>
			    	</Form>
			    </Modal>

			{ teams && teams.totalRecords > 10 ?
				<Pagination defaultCurrent={1} total={teams ? teams.totalRecords : 10} onChange = {this.handlePageNumber}/> : ''
			}
			</div>
		)
	}
}

TeamsListView.propTypes = {
  teams: PropTypes.object
};

const TeamsList = Form.create()(TeamsListView);
export default connect(
	state => {
		return ({
			teamMember : state.teams.data.memberList[state.teams.data.memberList.length - 1],
		})
	}
)(TeamsList);
