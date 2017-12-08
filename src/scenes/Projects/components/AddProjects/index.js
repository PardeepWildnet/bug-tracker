import React, { Component } from 'react';
import { Button, Radio, Modal, Form, Input, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';

import * as managerAndLeadApi from './../../data/AddManagerAndLeads/api';
import * as serachApi from './../../data/SearchByDate/api';
import * as api from './../../data/AddProjects/api';
import participants from './../../../../Assets/participantsList.json';
import './AddProjects.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class AddProjectView extends Component {
	managerAndLeadArray = [];
	constructor(props){
		super(props);

		this.searchByDate = this.searchByDate.bind(this);
		this.onDeselect = this.onDeselect.bind(this);
		this.handleTeam = this.handleTeam.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		
		this.state = {
			visible: false,
		}
	}

	// This method is used to show add project modal
	showModal() {
		this.setState({
		  visible: !this.state.visible,
		});
	}

	// This method is used to get the team name 
	handleTeam(value) {
		console.log(`selected ${value}`);
		this.props.dispatch(managerAndLeadApi.ManagerAndLeadApi(value))
	}

	// This method is used to search the projects according to date
	searchByDate (value) {
		console.log("selected date is", value);
		this.props.dispatch(serachApi.searchByDate(value))
	}

	// This method is called to close the add project modal
	handleCancel() {
		console.log('Clicked cancel button');
		this.setState({
		  visible: false,
		});
	}

	// This method id used to add project
	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    this.props.dispatch(api.addProject(values))
		    this.props.form.resetFields();
		    this.setState({
		    	visible: false,
		    });
		  }
		});
	}

	onDeselect (value) {
		console.log("value in onDeselect is", value);
	}

	render() {
		const { 
			visible, 
		} = this.state;

		const { 
			teams, 
			addProjects,
			form : { getFieldDecorator },
			managerAndLeads
		} = this.props;
		
		this.managerAndLeadArray  = managerAndLeads;		
		const renderTeams = teams ? teams.result.map((team) => (
	    	<Option 
	    		value={ team._id } 
	    		key = { team._id }
	    	>
	    		{ team.teamTitle }
	    	</Option>
	    )) : '';
	    
		const renderManagerAndLeads = this.managerAndLeads ? this.managerAndLeads.result.map((item, index) => (
	    	item.teamLeadsId.map((leads, index) => (
	    		<Option 
		    		value={ leads._id } 
		    		key = { leads._id }
		    	>
		    		{ leads.firstName }
		    	</Option>
	    	))	
	    )) : '';

	    console.log("manager and lead dtaa is ", managerAndLeads);
		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add Projects</Button><br />

				<RangePicker onChange={this.searchByDate} className = 'search-by-date'/><br />

		        <Modal title="Add Projects"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
					<Form onSubmit = { this.handleSubmit }>
						<FormItem>
						  {
						  	getFieldDecorator('name', {
						     rules: [{ required: true, message: 'Please input your project name!' }]
						  })(
								<Input placeholder="Name the project" />
						  )}
						</FormItem>

						<FormItem>
						  {getFieldDecorator('teams', {
						    rules: [{ required: true, message: 'Please input participant name!' }],
						  })(
						      <Select mode="multiple" onDeselect = { this.onDeselect } placeholder="Select teams" onChange={this.handleTeam}>
						        {renderTeams}
						     </Select>
						  )}
						</FormItem>

						<FormItem>
						  {getFieldDecorator('teamManager', {
						    rules: [{ required: true, message: 'Please input participant name!' }],
						  })(
						      <Select mode="multiple" placeholder="Select Leads" >
						        {renderManagerAndLeads}
						     </Select>
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
						  {
						  	getFieldDecorator('daterange', {
						    rules: [{ required: false, message: 'Please input time duration!' }],
						  })(
							<RangePicker className = 'range-picker'/>
						  )}
						</FormItem>

						<FormItem>
						  <Button type="primary" htmlType="submit" className="login-form-button">
						    Start the project
						  </Button>
						</FormItem>
					</Form>
		        </Modal>
			</div>
		)
	}
}

const AddProjects = Form.create()(AddProjectView);
export default connect(
	state => {
		debugger
		return ({
			addProjects : state.projects.data.addProjects[state.projects.data.addProjects.length - 1],
			managerAndLeads : state.projects.data.managerAndLeads[state.projects.data.managerAndLeads.length -1]
		})
	}
)(AddProjects);
