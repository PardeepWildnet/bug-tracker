import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';

// import * as userRoleApi from './../../data/UserRole/api';
// import * as editUserApi from './../../data/EditUser/api';
import * as managerApi from './../../data/Manager/api';
import * as tlApi from './../../data/TL/api';
import * as editTeamApi from './../../data/EditTeam/api';
import * as api from './../../data/TeamDetail/api';
import './UserDetail.css';

const FormItem = Form.Item;
const Option = Select.Option;

class TeamDetailView extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			teams : [],
			visible: false,
		}
	}

	componentWillMount (){
		console.log("id is ", this.props.match.params.id);
		// this.props.dispatch(userRoleApi.userRole());
		this.props.dispatch(tlApi.tlApi());
		this.props.dispatch(managerApi.manager());
		this.props.dispatch(api.fetchTeamDetail(this.props.match.params.id));
	}

	handleTeams(value) {
	  console.log(`selected ${value}`);
	  
	}

	handleLeads(value) {
	  console.log(`selected ${value}`);
	  this.setState({
	  	teams : value
	  }, function() {
	  	console.log("selected Leads are :- ", this.state.teams);
	  })
	}

	showModal = () => {
		this.setState({
		  visible: !this.state.visible,
		}, function () {
			console.log("show modal button ", this.state.visible);
		});
	}

	handleCancel = () => {
		this.setState({
		  visible: false,
		}, function() {
			console.log('Clicked cancel button');
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(editTeamApi.editTeamDetails(values, this.state.teams, this.props.match.params.id))
		    this.props.form.resetFields();
		  }
		  this.setState({
	    	visible: false,
	      }, function () {
	      	console.log("inside handle submit of edit team detail, value of visible is", this.state.visible);
	      });
		});
	}

	render () {
		const { 
			visible, 
		} = this.state;

		const {
			teamDetail,
			tlList,
			manager
		} = this.props;

		const renderManager = manager ? manager.result.map((manager) => (
	    	<Option 
	    		value={ manager._id } 
	    		key = { manager._id }
	    	>
	    		{ manager.firstName } { manager.lastName}
	    	</Option>
	    )) : '';

	    const renderTl = tlList ? tlList.result.map((tl) => (
	    	<Option 
	    		value={ tl._id } 
	    		key = { tl._id }
	    	>
	    		{ tl.firstName }
	    	</Option>
	    )) : '';

	    const { 
			getFieldDecorator 
		} = this.props.form;

		console.log("team detail is", teamDetail);
		return (
			<div className = 'user-detail-view'>
				<p className = 'heading-style user-style'> Team Detail </p>
				<table className='table table-striped table-responsive table-view'>
					<tbody>
						<tr>
								<th>Key</th>
								<th>Value</th>
						</tr>
					</tbody>
				    {teamDetail ?
			  			<tbody>
							<tr>
				  				<td>Title :</td>
				  				<td>{teamDetail.result.teamTitle}</td>
				  			</tr>
				  			
				  			<tr>
				  				<td>Details: </td>
				  				<td>{teamDetail.result.teamDetails} </td>
				  			</tr>
							
							<tr>
				  				<td>Manager :</td>
				  				<td>{teamDetail.result.teamManagerId}</td>
				  			</tr>

				  			<tr>
				  				<td>Leads :</td>
				  				<td>{teamDetail.result.teamLeadsId}
					  				{
					  					teamDetail.result.teamLeadsId ? teamDetail.result.teamLeadsId.map((tl, index) => (
											<p key = {index}>{teamDetail.result.teamLeadsId}</p>
										))  : '-'
									}
								</td>
				  			</tr>
							
			  				<tr>
				  				<td colSpan = '2'>
				  					<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Edit Team</Button>
				  				</td>
				  			</tr>
				  		</tbody> : 
			  			<tbody></tbody>
					}
   				</table>


		        <Modal title="Edit User Details"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		        { teamDetail ?
					  <Form onSubmit = { this.handleSubmit }>
				        <FormItem>
				          {
				          	getFieldDecorator('name', {
				             rules: [{ required: true, message: 'Please input your team name!' }],
				             initialValue : teamDetail.result.teamTitle
				          })(
			            		<Input />
				          )}
				        </FormItem>

				        <FormItem>
				          {
				          	getFieldDecorator('details', {
				            rules: [{ required: true, message: 'Please input details!' }],
				             initialValue : teamDetail.result.teamDetails
				          })(
				            <Input placeholder="Detail" />
				          )}
				        </FormItem>
				        
				        <FormItem>
				          {getFieldDecorator('teams', {
				            rules: [{ required: true, message: 'Please input team name!' }],
				            initialValue : teamDetail.result.teamManagerId
				          })(
					          <Select placeholder="Select manager" onChange={this.handleTeams}>
					            {renderManager}
					         </Select>
				          )}
				        </FormItem>
				        
				        <FormItem>
				          {getFieldDecorator('tl', {
				            rules: [{ required: true, message: 'Please input manager name!' }],
				            initialValue : teamDetail.result.teamLeadsId
				          })(
					          <Select  mode="multiple" placeholder="Select TLs" onChange={this.handleLeads}>
					            {renderTl}
					         </Select>
				          )}
				        </FormItem>

				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				          	SAVE
				          </Button>
				        </FormItem>
			    	</Form>
					 : ''
				}

		        </Modal>
			</div>
		)
	}
}
const TeamDetail = Form.create()(TeamDetailView);

export default connect(
	state => {
		return ({
			teamDetail : state.teams.data.teamDetail[state.teams.data.teamDetail.length - 1],
			tlList : state.teams.data.tlList[state.teams.data.tlList.length - 1],
			manager : state.teams.data.manager[state.teams.data.manager.length - 1]
		})
	}
)(TeamDetail);
			// role : state.user.data.userRole[0]
				/*<p className = 'heading-style user-style'> User Detail </p>
   				
		        <Modal title="Edit User Details"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		        { userDetail ?
					  <Form onSubmit = { this.handleSubmit }>
					    <FormItem>
					      {
					      	getFieldDecorator('Fname', {
					         rules: [{ required: true, message: 'Please input First name!' }],
					         initialValue : userDetail.result.firstName

					      })(
					    		<Input />
					      )}
					    </FormItem>

						<FormItem>
					      {
					      	getFieldDecorator('Lname', {
					         rules: [{ required: true, message: 'Please input Last name!' }],
					         initialValue : userDetail.result.lastName

					      })(
					    		<Input/>
					      )}
					    </FormItem>

						<FormItem>
					      {
					      	getFieldDecorator('email', {
					         rules: [{ required: true, message: 'Please input email!' }],
					         initialValue : userDetail.result.email

					      })(
					    		<Input  />
					      )}
					    </FormItem>

					    <FormItem>
					      {getFieldDecorator('designation', {
					        rules: [{ required: true, message: 'Please input designation of user!' }],
					         initialValue : userDetail.result.accountType
					      })(
					          <Select >
					          	{renderDesignation}
					         </Select>
					      )}
					    </FormItem>

					    <FormItem>
					      {getFieldDecorator('gender', {
					        rules: [{ required: true, message: 'Please input designation of user!' }],
					         initialValue : userDetail.result.gender
					      })(
					          <Select >
					          		<Option value="Male">Male</Option>
									<Option value="Female">Female</Option>
					         </Select>
					      )}
					    </FormItem>

					    <FormItem>
					      <Button type="primary" htmlType="submit" className="login-form-button">
					        SAVE
					      </Button>
					    </FormItem>
					</Form> : ''
				}

		        </Modal>*/
