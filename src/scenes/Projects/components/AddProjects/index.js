import React, { Component } from 'react';
import { Button, Radio, Modal, Form, Input, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddProjects/api';
import participants from './../../../../Assets/participantsList.json';
import './AddProjects.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class AddProjectView extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		
		this.state = {
			visible: false,
			teams : []
		}
	}

	// This method is called after getting any props
	componentWillReceiveProps(nextProps, nextState){
		if(nextProps.addProjects && nextProps.addProjects.status === 200){
			this.setState({
		    	visible: false,
		    });
			this.forceUpdate();
		}
	}
	
	// This method is used to show add project modal
	showModal() {
		this.setState({
		  visible: !this.state.visible,
		});
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
		  }
		});
	}

	render() {
		const { 
			visible, 
		} = this.state;

		const { 
			teams, 
			addProjects,
			form : { getFieldDecorator }
		} = this.props;
		
		const renderTeams = teams ? teams.result.map((team) => (
	    	<Option 
	    		value={ team.teamTitle } 
	    		key = { team._id }
	    	>
	    		{ team.teamTitle }
	    	</Option>
	    )) : '';
	    
		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add Projects</Button>
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
		return ({
			addProjects : state.projects.data.addProjects[state.projects.data.addProjects.length - 1],
		})
	}
)(AddProjects);
