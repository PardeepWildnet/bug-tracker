import React, { Component } from 'react';
import { Form, Button, Input, Checkbox, Upload, Icon } from 'antd';
import { connect } from 'react-redux';

import * as addSubTaskApi from './../../data/AddSubTask/api';
import './SubTask.css';
const FormItem = Form.Item;

class AddSubTask extends Component {
	constructor(props){
		super(props);
		this.cancelTask = this.cancelTask.bind(this);
		this.addSubTask = this.addSubTask.bind(this);
		this.addNewTask = this.addNewTask.bind(this);
		this.state = {
			selectedAddTaskIndex : 0
		}
	}

	addNewTask(id) {
		console.log("inside addNewTask " + id);
		this.setState({
			selectedAddTaskIndex : id 
		}) 
	}

	cancelTask() {
		console.log("inside cancelTask method");
		this.setState({
			selectedAddTaskIndex : 0
		})
	}

	addSubTask(e) {
		console.log("inside add subtask method");
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.dispatch(addSubTaskApi.AddSubTaskApi(values))
				this.props.form.resetFields();
			}
		});
	}

	normFile(e) {
	    console.log('Upload event:', e);
	    if (Array.isArray(e)) {
	      return e;
	    }
	    return e && e.fileList;
  	}

	render (){
		const  {
			getFieldDecorator
		} = this.props.form;

		const {
			id, subTasks
		} = this.props;

		return(
			<div>
				{ this.state.selectedAddTaskIndex != id ? 
					<div>
						<Button type="primary" className = 'add-new-subtask' htmlType="submit" onClick = { () => this.addNewTask(id) }>
			            	Add New Task
			         	</Button>
			         </div> :
		         	<Form onSubmit={this.addSubTask} className="login-form">
				        <FormItem style = {{width : '85%', float : 'left'}}>
				          {getFieldDecorator('client_id', {
				            rules: [{ required: true, message: 'Please input client_id' }],
				          })(
				            <Input placeholder="Add New Task" />
				          )}
				        </FormItem>

				        <FormItem
				          label="Upload"
				        >
				          {getFieldDecorator('upload', {
				            valuePropName: 'fileList',
				            getValueFromEvent: this.normFile,
				          })(
				            <Upload name="logo" action="/upload.do" listType="picture">
				              <Button>
				                <Icon type="upload" /> Click to upload
				              </Button>
				            </Upload>
				          )}
					    </FormItem>

						<Button type="primary" htmlType="submit" className = 'button-style'>
			            	Add Task
			         	</Button>

						<Button type="primary" onClick = {this.cancelTask} className = 'button-style'>
			            	Cancel
			         	</Button>
					</Form>
				}
			</div>		
		)
	}
}
AddSubTask = Form.create()(AddSubTask);
export default connect(

)(AddSubTask);
/*{
	this.props.tasks && 
	this.props.tasks.map((subTask) => (
		<div key = { subTask.id }>
			subtask column
		</div>
	))
}*/