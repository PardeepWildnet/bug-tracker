import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Upload, Icon, message  } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddLogTime/api';
import './AddLogTime.css';
import moment from 'moment';
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

class AddLogTimeView extends Component {
	constructor(props) {
		super(props);

		this.submitTime = this.submitTime.bind(this);
		
		this.state = {
			fileList: [],
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
		    console.log(" stringify values :- ",JSON.stringify(values, selectedDate, selectedTime));
		    this.props.dispatch(api.addLogTime(values, fileList , selectedDate, selectedTime))
		    this.setState({
	          fileList: [],
	        });
		    this.props.form.resetFields();
		  }
		});
	}

	render () {
		const { getFieldDecorator } = this.props.form;

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
			            rules: [{ required: true, message: 'Please input your title!' }],
			          })(
			            <Input placeholder="title" />
			          )}
			        </FormItem>
			        
					<FormItem>
					 {getFieldDecorator('date', {
			            rules: [{ required: true, message: 'Please input your date!' }],
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

					<Upload {...props}>
						<Button>
							<Icon type="upload" /> Select File
						</Button>
					</Upload>

					<Button type="primary" 
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

