import React, { Component } from 'react';
import { Form, Input, LocaleProvider, Modal, Button, Icon, DatePicker, Select  } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';

import teams from './../../../../Assets/teamList.json';
import * as api from './../../data/EditTeam/api';

const Option = Select.Option;
const FormItem = Form.Item;

class EditTeamDetailView extends Component {
	constructor (props) {
		super(props);

		const value = this.props.value || {};
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleTeams = this.handleTeams.bind(this);
		this.handleLeads = this.handleLeads.bind(this);
		
		this.state = {
			visible : this.props.visible,
			teamName : value.teamName || 'teamName',
			teamDetails : value.teamDetails || 'teamDetails',
			teamCreatedBy : value.teamCreatedBy || 'teamCreatedBy',
			teamStartDate : value.teamStartDate || 'teamStartDate',
			teamEndDate : value.teamDeEndDate| 'teamEndDate',
			confirmLoading: false,
			teams : ['mansi', 'mini'],
			selectedTeam : ''
		}
	}

	componentWillReceiveProps(nextProps) {
	    // Should be a controlled component.
	    if ('value' in nextProps) {
	      const value = nextProps.value;
	      this.setState(value);
	    }
	}

	handleDateRange = (date, dateString) => {
		console.log(date, dateString);
	}

   	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	    	visible: false,
	    });
    	this.props.onCancel();
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    console.log(" stringify values :- ",JSON.stringify(values, this.state.selectedDate, this.state.selectedTime));
		    this.props.dispatch(api.editTeamDetails(values))
		    this.props.form.resetFields();
		  }
		  this.setState({
	    	visible: false,
	      });
	      this.props.onCancel();
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

	render () {
		const {
			projectName,
			projectCreatedBy,
			projectDetails,
			projectStartDate,
			projectEndDate,
			visible
		} = this.props;

		const renderTeams = teams.map((team) => (
	    	<Option 
	    		value={ team.teamName } 
	    		key = { team.teamId }
	    	>
	    		{ team.teamName }
	    	</Option>
	    ));

		const { 
			getFieldDecorator 
		} = this.props.form;

		return (
			<LocaleProvider locale={enUS}>
		       <Modal title="Edit Team Details"
		          visible={visible}
		          confirmLoading={this.state.confirmLoading}
		          onCancel={this.handleCancel}
		          footer={[
		            <Button key="back" size="large" className = 'edit-ant-btn-lg ' onClick={this.handleCancel}>Return</Button>,
		          ]}
		        >
		           <Form onSubmit = { this.handleSubmit }>
				        <FormItem>
				          {
				          	getFieldDecorator('name', {
				             rules: [{ required: true, message: 'Please input your team name!' }],
				             initialValue : this.state.teamName
				          })(
			            		<Input />
				          )}
				        </FormItem>

				        <FormItem>
				          {
				          	getFieldDecorator('details', {
				            rules: [{ required: true, message: 'Please input details!' }],
				             initialValue : this.state.teamDetails
				          })(
				            <Input placeholder="Detail" />
				          )}
				        </FormItem>
				        
				        <FormItem>
				          {getFieldDecorator('teams', {
				            rules: [{ required: true, message: 'Please input team name!' }],
				            initialValue : this.state.teamCreatedBy
				          })(
					          <Select placeholder="Select teams" onChange={this.handleTeams}>
					            {renderTeams}
					         </Select>
				          )}
				        </FormItem>
				        
				        { 
				        	teams.map((team, index) => ( 
				        		<div key = {index}>
				        			{ team.teamId == this.state.selectedTeam ?
				        				  <Select mode="multiple" placeholder="Select Leads" onChange={this.handleLeads} defaultValue = {this.state.teams}>
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
				          	SAVE
				          </Button>
				        </FormItem>
			    	</Form>
			 	</Modal>
			</LocaleProvider>
		)
	}
}
const EditTeam = Form.create()(EditTeamDetailView);
export default connect(

)(EditTeam)