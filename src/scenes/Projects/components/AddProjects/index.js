import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddProjects/api';
import participants from './../../../../Assets/participantsList.json';
import './AddProjects.css';

const FormItem = Form.Item;
const Option = Select.Option;
const {  RangePicker } = DatePicker;

class AddProjectView extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			visible: false,
			confirmLoading: false,
			teams : []
		}
	}

	showModal = () => {
		this.setState({
		  visible: !this.state.visible,
		});
	}

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
		  visible: false,
		});
	}

	handleDateRange = (date, dateString) => {
		console.log(date, dateString);
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values.daterange[1]);
		    this.props.dispatch(api.addProject(values))
		    this.props.form.resetFields();
		    this.setState({
			  visible: !this.state.visible,
			});
		  }
		});
	}

	render(){
		const { 
			visible, 
			confirmLoading, 
			ModalText 
		} = this.state;

		const { 
			getFieldDecorator, 
			loginState 
		} = this.props.form;

		const { 
			teams
		} = this.props;
		
		 const renderTeams = teams ? teams.result.map((team) => (
	    	<Option 
	    		value={ team.teamTitle } 
	    		key = { team._id }
	    	>
	    		{ team.teamTitle }
	    	</Option>
	    )) : '';
	    
	    console.log("team in project  is", teams ? teams.result : teams);
		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add Projects</Button>
		        <Modal title="Add Projects"
		          visible={visible}
		          confirmLoading={confirmLoading}
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
						      <Select mode="multiple" placeholder="Select teams">
						        {renderTeams}
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
							<RangePicker onChange={ this.handleDateRange } className = 'range-picker'/>
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

)(AddProjects);
