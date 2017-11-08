import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, LocaleProvider, TimePicker, Upload, Icon, message  } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import * as api from './../../data/AddLogTime/api';
import './AddLogTime.css';
const FormItem = Form.Item;

	function beforeUpload(file) {
	  console.log("image is :- ", file);
	  const isJPG = file.type === 'image/jpeg';
	  if (!isJPG) {
	    message.error('You can only upload JPG file!');
	  }
	  const isLt2M = file.size / 1024 / 1024 < 2;
	  if (!isLt2M) {
	    message.error('Image must smaller than 2MB!');
	  }
	  return isJPG && isLt2M;
	}

class AddLogTimeView extends Component {
	constructor(props) {
		super(props);
		this.submitTime = this.submitTime.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.userName = "jfgsuyfgdfhd";
		this.state = {
			selectedTime : '', 
			selectedDate : '',
			imageFile : null,
			fileList: [],
		}
	}

	handleUpload = () => {
	    const { fileList } = this.state;
		const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	    const formData = new FormData();
	    fileList.forEach((file) => {
	      formData.append('files[]', file);
	    });

	    const header = {     
	    	headers: { 'content-type': 'multipart/form-data' }
		}
	    // You can use any AJAX library you like
	   axios.post(url, formData, header)
		.then(response => {
			 console.log(response, "time-log response");
		},
		err => {
			console.log(err, "time-log error response");
		})
	 }

	submitTime(e) {
		e.preventDefault();
		const { fileList, selectedDate, selectedTime } = this.state;
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    console.log(" stringify values :- ",JSON.stringify(values, this.state.selectedDate, this.state.selectedTime));
		    this.props.dispatch(api.addLogTime(values, fileList , selectedDate, selectedTime))
		    this.setState({
	          fileList: [],
	        });
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
		const { getFieldDecorator } = this.props.form;

		const config = {
	      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
	    };
	    
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

			        <FormItem>
			          {getFieldDecorator('task', {
			            rules: [{ required: true, message: 'Please input your task!' }],
			          })(
			            <Input placeholder = "enter your task title"/>
			          )}
			        </FormItem>
			        
					<LocaleProvider locale={enUS}> 
						<DatePicker  onChange={this.onChangeDate}/>
					</LocaleProvider>

		          	<LocaleProvider locale={enUS}> 
		            	<TimePicker use12Hours format="h:mm a" onChange={this.onChangeTime} />
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

export default connect()(AddLogTime);

