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
		this.handleLeads = this.handleLeads.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.state = {
			visible: false,
			teams : [],
		}
	}

	// This method is used to show the add team modal
	showModal () {
		this.setState({
		  visible: !this.state.visible,
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
		    this.props.dispatch(api.addTeam(values, this.state.teams))
		    this.props.form.resetFields();
		    this.setState({
			  visible: !this.state.visible,
			});
		  }
		});
	}
	
	// This method is used to get the leads
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
			ModalText 
		} = this.state;

		const { getFieldDecorator } = this.props.form;
		
		const {
			managerList, 
			tlList
		} = this.props;

		const renderManager = managerList ? managerList.result.map((manager) => (
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

		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add Teams </Button>
		        <Modal title="Add Teams"
		          visible={visible}
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
			          {getFieldDecorator('manager', {
			            rules: [{ required: true, message: 'Please input manager name!' }],
			          })(
				          <Select placeholder="Select manager" >
				            {renderManager}
				         </Select>
			          )}
			        </FormItem>  

			        <FormItem>
			          {getFieldDecorator('tl', {
			            rules: [{ required: true, message: 'Please input manager name!' }],
			          })(
				          <Select  mode="multiple" placeholder="Select TLs" onChange={this.handleLeads}>
				            {renderTl}
				         </Select>
			          )}
			        </FormItem>
			       
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
export default connect()(AddTeams);
