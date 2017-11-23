import React, { Component } from 'react';
import { Form, Input, DatePicker, LocaleProvider, TimePicker, Modal, Button  } from 'antd';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';

import * as api from './../../data/EditTimeLog/api';
import './EditTimeLog.css';
const FormItem = Form.Item;

class EditLogTimeView extends Component {
	constructor (props) {
		super(props);
		this.submitTime = this.submitTime.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		const value = this.props.value || {};
		console.log("props value in edit log time is :- ", value);
		this.state = {
			visible : this.props.visible,
			title : value.title || 'title',
			category : value.category || 'category',
			selectedTime : '', 
		    date: '21',
			selectedDate : '',
		}
	}

	componentWillReceiveProps(nextProps) {
	    // Should be a controlled component.
	    if ('value' in nextProps) {
	      const value = nextProps.value;
	      this.setState(value);
	    }
	}

   	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	    	visible: false,
	    });
    	this.props.onCancel();
	}

	submitTime(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    console.log(" stringify values :- ",JSON.stringify(values, this.state.selectedDate, this.state.selectedTime));
		    this.props.dispatch(api.editLogTime(values))
		    this.props.form.resetFields();
		  }
		  this.setState({
	    	visible: false,
	      });
	      this.props.onCancel();
		});
	}

	render () {
		const {
			title,
			category,
			visible
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;

		return (
			<LocaleProvider locale={enUS}>
				<Modal
		          title="Basic Modal"
		          visible={visible}
		          onCancel={this.handleCancel}
		           footer={[
		            <Button key="back" size="large" className = 'edit-ant-btn-lg ' onClick={this.handleCancel}>Return</Button>,
		          ]}
		        >
				 <Form onSubmit={this.submitTime} className="edit-time-log-form">
			        <FormItem className = "edit-ant-form-input">
					 {getFieldDecorator('task', {
			            rules: [{ required: true, message: 'Please input your title!' }],
			            initialValue : this.state.title
			          })(
			            <Input />
			          )}
			        </FormItem>	

			        <FormItem className = "edit-ant-form-input">
					 {getFieldDecorator('category', {
			            rules: [{ required: true, message: 'Please input your category!' }],
			            initialValue : this.state.category
			          })(
			            <Input />
			          )}
			        </FormItem>
			        
			        <FormItem>
					 {getFieldDecorator('date', {
			            rules: [{ required: true, message: 'Please input your date!' }],
			            initialValue : this.state.selectedDate
			          })(
						<DatePicker />
 					  )}
			        </FormItem>

			        <FormItem>
					 {getFieldDecorator('time', {
			            rules: [{ required: true, message: 'Please input your time!' }],
			          })(
		        		<TimePicker use12Hours format="h:mm a" />
 					  )}
			        </FormItem>

		        	<Button type="primary" 
					  htmlType="submit" 
					  className="login-form-button edit-form-button"
					>
						Save
					</Button>
			   	  </Form>
		       </Modal>
			</LocaleProvider>
		)
	}
}
const EditLogTime = Form.create()(EditLogTimeView);
export default connect(

)(EditLogTime)