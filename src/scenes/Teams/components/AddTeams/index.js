import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddTeams/api';
import teams from './../../../../Assets/teamList.json';
import './AddTeams.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class TeamView extends Component {

	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTeams = this.handleTeams.bind(this);
		this.handleLeads = this.handleLeads.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleDateRange = this.handleDateRange.bind(this);

		this.state = {
			visible: false,
			confirmLoading: false,
			teams : [],
			selectedTeam : ''
		}
	}

	showModal () {
		this.setState({
		  visible: !this.state.visible,
		});
	}

	handleCancel () {
		console.log('Clicked cancel button');
		this.setState({
		  visible: false,
		});
	}

	handleDateRange(date, dateString) {
		console.log(date, dateString);
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.addTeam(values, this.state.teams))
		    this.props.form.resetFields();
		    this.setState({
			  visible: !this.state.visible,
			});
		  }
		});
	}

	handleTeams(value) {
	  console.log(`selected ${value}`);
	  this.setState({
	  	selectedTeam : value
	  }, function() {
	  	console.log("selected team is :- ", this.state.selectedTeam);
	  })
	}

	handleLeads(value) {
	  console.log(`selected ${value}`);
	  this.setState({
	  	teams : value
	  }, function() {
	  	console.log("selected Leads are :- ", this.state.teams);
	  })
	}

	render(){
		const { 
			visible, 
			confirmLoading, 
			ModalText 
		} = this.state;

		const { 
			getFieldDecorator,  
		} = this.props.form;
		
		const renderTeams = teams.map((team) => (
	    	<Option 
	    		value={ team.teamName } 
	    		key = { team.teamId }
	    	>
	    		{ team.teamId }
	    	</Option>
	    ));
		
		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add Teams </Button>
		        <Modal title="Add Teams"
		          visible={visible}
		          confirmLoading={confirmLoading}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		          <Form onSubmit = { this.handleSubmit }>
			        <FormItem>
			          {
			          	getFieldDecorator('name', {
			             rules: [{ required: true, message: 'Please input your team name!' }]
			          })(
		            		<Input placeholder="Team Name" />
			          )}
			        </FormItem>

			        <FormItem>
			          {
			          	getFieldDecorator('details', {
			            rules: [{ required: true, message: 'Please input details!' }],
			          })(
			            <Input placeholder="Detail" />
			          )}
			        </FormItem>
			        
			        <FormItem>
			          {getFieldDecorator('teams', {
			            rules: [{ required: true, message: 'Please input team name!' }],
			          })(
				          <Select placeholder="Select teams" onChange={this.handleTeams}>
				            {renderTeams}
				         </Select>
			          )}
			        </FormItem>
			        
			        { 
			        	teams.map((team) => ( 
			        		<div>
			        			{ team.teamId == this.state.selectedTeam ?
			        				  <Select mode="multiple" placeholder="Select Leads" onChange={this.handleLeads}>
							            { team.teamLeads.map((team) => (
									    	<Option 
									    		value={ team.teamLeadId } 
									    		key = { team.teamLeadId }
									    	>
									    		{ team.teamLeadName }
									    	</Option>
									    ))}
							         </Select> : ''

			        			}
			        		</div>
			        	))
			        }

			        <FormItem>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			          	Add Team
			          </Button>
			        </FormItem>
			    </Form>
		        </Modal>
			</div>
		)
	}
}

const AddTeams = Form.create()(TeamView);
export default connect(

)(AddTeams);
