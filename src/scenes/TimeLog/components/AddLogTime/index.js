import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, LocaleProvider, TimePicker, Upload, Icon } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { connect } from 'react-redux';
import moment from 'moment';

import * as api from './../../data/AddLogTime/api';
import './AddLogTime.css';
const FormItem = Form.Item;

class AddLogTimeView extends Component {
	constructor(props) {
		super(props);
		this.submitTime = this.submitTime.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.userName = "jfgsuyfgdfhd";
		this.state = {
			selectedTime : '', 
			selectedDate : ''
		}
	}

	submitTime(e) {
		e.preventDefault();
		console.log("date is inside submit time and time is :- ", this.state.selectedDate, this.state.selectedTime);
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    console.log(" stringify values :- ",JSON.stringify(values, this.state.selectedDate, this.state.selectedTime));
		    this.props.dispatch(api.addLogTime(values, this.state.selectedDate, this.state.selectedTime))
		    this.props.form.resetFields();
		  }
		});
	}

	onChangeTime(time, timeString) {
	  console.log("onChange Time", time, timeString);
	  this.setState({
	  	selectedTime : timeString
	  })
	 }

	onChangeDate(date, dateString) {
	  console.log("onChange Date",date, dateString);
	  this.setState({selectedDate: dateString}, function () {
	    console.log(this.state.selectedDate);
	  });	
	}

	normFile(e) {
	    console.log('Upload event:', e);
	    if (Array.isArray(e)) {
	      return e;
	    }
	    return e && e.fileList;
  	}
  	
	render () {
		const { getFieldDecorator } = this.props.form;

		const config = {
	      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
	    };
	    
		return (
			<div>
				 <Form onSubmit={this.submitTime} className="time-log-form">

			        <FormItem>
			          {getFieldDecorator('userName', {
			            rules: [{ required: true, message: 'Please input your task!' }],
			          })(
			            <Input  defaultValue = "name"/>
			          )}
			        </FormItem>
			        
					<LocaleProvider locale={enUS}> 
						<DatePicker  onChange={this.onChangeDate}/>
					</LocaleProvider>

		          	<LocaleProvider locale={enUS}> 
		            	<TimePicker use12Hours format="h:mm a" onChange={this.onChangeTime} />
					</LocaleProvider>

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

			        <FormItem>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			           	Save
			          </Button>
			        </FormItem>

			       </Form>
			</div>
		)
	}
}
const AddLogTime = Form.create()(AddLogTimeView);

export default connect()(AddLogTime);

