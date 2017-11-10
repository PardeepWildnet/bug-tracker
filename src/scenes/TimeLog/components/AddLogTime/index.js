import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, LocaleProvider, TimePicker, Upload, Icon, message  } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'

import * as api from './../../data/AddLogTime/api';
import { PriceInput } from './PriceInput.js';
import './AddLogTime.css';
import moment from 'moment';
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

class AddLogTimeView extends Component {
	constructor(props) {
		super(props);
		this.submitTime = this.submitTime.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		const value = this.props.value || {};
		this.state = {
			selectedTime : '', 
			selectedDate : '',
			fileList: [],
			name : 'mansi',
		    date: value.date || '22',
		    currency: value.currency || 'rmb',
		}
	}

	handleNumberChange = (e) => {
	    const date = parseInt(e.target.value || 0, 10);
	    if (!('value' in this.props)) {
	      this.setState({ date });
	    }
	    this.triggerChange({ date });
	  }

	   triggerChange = (changedValue) => {
	    // Should provide an event to pass value to Form.
	    const onChange = this.props.onChange;
	    if (onChange) {
	      onChange(Object.assign({}, this.state, changedValue));
	    }
	  }
	  
	submitTime(e) {
		e.preventDefault();
		const { 
			fileList, 
			selectedDate, 
			selectedTime 
		} = this.state;
		
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    console.log(" stringify values :- ",JSON.stringify(values, this.state.selectedDate, this.state.selectedTime));
		    this.props.dispatch(api.addLogTime(values, fileList , selectedDate, selectedTime))
		    this.setState({
	          fileList: [],
	        });
	        message.success('upload successfully.');
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

	render () {
		const { 
			getFieldDecorator 
		} = this.props.form;
		console.log("props value in add time log is :- ", this.props.value);
	    const props = {
	    	onRemove: (file) => {
		        this.setState(({ fileList }) => {
		          const index = fileList.indexOf(file);
		          const newFileList = fileList.slice();
		          newFileList.splice(index, 1);
		          return {
		            fileList: newFileList,
		          };
		        });
		      },

			beforeUpload: (file) => {
				this.setState(({ fileList }) => ({
				  fileList: [...fileList, file],
				}));
				return false;
			},
	        fileList: this.state.fileList,
	    };

		return (
			<div>
				 <Form onSubmit={this.submitTime} className="time-log-form">
					 <Input
				          type="text"
				          value={this.state.date}
				          onChange={this.handleNumberChange}
				          style={{ width: '100%', marginRight: '3%' }}
			        />
			        
					<LocaleProvider locale={enUS}> 
						<DatePicker  onChange={this.onChangeDate} defaultValue = {moment(this.state.date, dateFormat)}/>
					</LocaleProvider>

		          	<LocaleProvider locale={enUS}> 
		            	<TimePicker use12Hours format="h:mm a" onChange={this.onChangeTime} defaultValue = {moment('2015-06-06', dateFormat)}/>
					</LocaleProvider>

					<Upload {...props}>
						<Button>
							<Icon type="upload" /> Select File
						</Button>
					</Upload>

					<Button type="primary" 
					  onClick={this.submitTime} 
					  disabled={this.state.fileList.length === 0} 
					  htmlType="submit" 
					  className="login-form-button"
					>
						Save
					</Button>

			       </Form>
			</div>
		)
	}
}
const AddLogTime = Form.create()(AddLogTimeView);

export default connect(

)(AddLogTime);

