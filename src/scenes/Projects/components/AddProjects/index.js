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
	checkVisibility = false;
	managerAndLeadArray = [];
	constructor(props){
		super(props);
		this.state = { visible: false }
	}


	// This method is called after getting any props
	componentWillReceiveProps = (nextProps, nextState) => {
			if(nextProps.addProjects && nextProps.addProjects.status === 200  && this.checkVisibility == false){
				this.setState({ visible: false });
		    this.props.form.resetFields();
				this.forceUpdate();
			}
		}

	// This method is used to show add project modal
	showModal = () => {
		this.setState({ visible: !this.state.visible })
		this.checkVisibility = true;
	}

	// This method is used to get the team name
	handleTeam = (value) => this.props.dispatch(managerAndLeadApi.ManagerAndLeadApi(value))

	// This method is used to search the projects according to date
	searchByDate = (value) =>	this.props.dispatch(serachApi.searchByDate(value))

	// This method is used to close the add team modal
	handleCancel = () => {
		this.setState({ visible: false });
		this.checkVisibility = false;
	}

	// This method id used to add project
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    this.props.dispatch(api.addProject(values))
				this.checkVisibility = false;
		  }
		});
	}

	render() {
		const { visible } = this.state;

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
								<Input placeholder="Name the Project" />
						  )}
						</FormItem>

						<FormItem>
						  {getFieldDecorator('teams', {
						    rules: [{ required: true, message: 'Please input participant name!' }],
						  })(
						      <Select mode="multiple" placeholder="Select Teams" onChange={this.handleTeam}>
						        {renderTeams}
						     </Select>
						  )}
						</FormItem>

						<FormItem>
						  {getFieldDecorator('teamManager', {
						    rules: [{ required: false, message: 'Please input participant name!' }],
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
						    rules: [{ required: true, message: 'Please input time duration!' }],
						  })(
							<RangePicker className = 'range-picker'/>
						  )}
						</FormItem>

						<FormItem>
						  <Button type="primary" htmlType="submit" className="login-form-button">
						    Add Project
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
		return ({
			addProjects : state.projects.data.addProjects[state.projects.data.addProjects.length - 1],
			managerAndLeads : state.projects.data.managerAndLeads[state.projects.data.managerAndLeads.length -1]
		})
	}
)(AddProjects);
