import React, { Component } from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio, Modal, Form, Input, Select, InputNumber, Progress  } from 'antd';

import * as userApi from './../../../User/data/UserList/api';
import * as api from './../../data/TaskDetail/api';
import * as editTaskApi from './../../data/EditTask/api';
import './TaskDetail.css';
import { EditTaskModal } from './EditTaskModal.js'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export const EditTaskModal = () => {
    return (
        <Modal title="Edit Task Details"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		        { taskDetail ?
					<Form onSubmit={this.handleSubmit}  >
				        <FormItem>
				          {getFieldDecorator('title', {
				            rules: [{ required: true, message: 'Please input title of task!' }],
				            initialValue : taskDetail.result.taskTitle
				          })(
				            <Input placeholder="Give the list a title" />
				          )}
				        </FormItem>
						
						<FormItem>
				          {getFieldDecorator('assignee', {
				            rules: [{ required: true, message: 'Please input participant name!' }],
				            initialValue : taskDetail.result.assignTo
				          })(
					         <Select mode = 'multiple' placeholder="Select default Assignee" onChange={this.handleParticipants}>
					            {renderParticipants}
					         </Select>
				          )}
				        </FormItem>

				        <FormItem>
				          {getFieldDecorator('detail', {
				            initialValue : taskDetail.result.taskComment
				          })(
				            <Input placeholder="Describe this List (optional)" />
				          )}
				        </FormItem>

				        <p style = {{marginTop : '16px'}}> Who can view this task list :-</p>
				        
				        <FormItem>
				          {getFieldDecorator('scope', {
				            initialValue : 'Everyone'
				          })(
					        <RadioGroup >
						        <Radio value='Everyone'> Everyone </Radio>
						        <Radio value='Private'> Private </Radio>
						    </RadioGroup>
				          )}
				        </FormItem>

					    <div>
					    	<span> Select number of days </span> 
					    	<FormItem>
					          {getFieldDecorator('days', {
					            rules: [{ required: true, message: 'Please input your task option!' }],
					            initialValue : '3'
					          })(
					    		<InputNumber min={1} max={10} />
					          )}
					        </FormItem>
					    </div>

						<Button type="primary" htmlType="submit" className="login-form-add-button">
			            	SAVE
			         	</Button>
			         	<br />	
	         		</Form>	: ''
				}
	        </Modal>
    )
}