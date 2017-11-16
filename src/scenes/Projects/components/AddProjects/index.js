import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, Checkbox, DatePicker } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddProjects/api';
import './AddProjects.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;

class AddProjectView extends Component {

	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			visible: false,
			confirmLoading: false
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

	handleOk = () => {
		this.setState({
		  ModalText: 'The modal will be closed after two seconds',
		  confirmLoading: true,
		});
		setTimeout(() => {
		  this.setState({
		    visible: false,
		    confirmLoading: false,
		  });
		}, 2000);
	}

	handleSubmit (e) {
		e.preventDefault();
		debugger
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values.daterange[1]);
		    this.props.dispatch(api.addProject(values))
		    this.props.form.resetFields();
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

		return(
			<LocaleProvider locale={enUS}> 
				<div className = 'add-project-container'>
					<Button type="primary"  icon="plus-circle-o" >Add Projects</Button>
			        <Modal title="Add Projects"
			          visible={visible}
			          onOk={this.handleOk}
			          confirmLoading={confirmLoading}
			          onCancel={this.handleCancel}
			          footer={[]}
			        >
			          <Form onSubmit = { this.handleSubmit }>
				        <FormItem label = 'Add Projects'>
				          {
				          	getFieldDecorator('name', {
				             rules: [{ required: true, message: 'Please input your project name!' }]
				          })(
			            		<Input prefix={<Icon type="plus" style={{ fontSize: 13 }} />} placeholder="Name the project" />
				          )}
				        </FormItem>

				        <FormItem>
				          {
				          	getFieldDecorator('details', {
				            rules: [{ required: true, message: 'Please input details!' }],
				          })(
				            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Detail" />
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
			</LocaleProvider>
		)
	}
}

const AddProjects = Form.create()(AddProjectView);
export default connect(

)(AddProjects);
