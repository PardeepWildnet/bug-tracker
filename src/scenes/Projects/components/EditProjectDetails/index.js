import React, { Component } from 'react';
import { Form, Input, LocaleProvider, Modal, Button, Icon, DatePicker  } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';

import * as api from './../../data/EditProject/api';
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;

class EditProjectDetailView extends Component {
	constructor (props) {
		super(props);
		const value = this.props.value || {};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.state = {
			visible : this.props.visible,
			projectName : value.projectName || 'projectName',
			projectDetails : value.projectDetails || 'projectDetails',
			projectCraetedBy : value.projectCraetedBy || 'projectCraetedBy',
			projectStartDate : value.projectStartDate || 'projectStartDate',
			projectEndDate : value.projectEndDate| 'projectEndDate',
			confirmLoading: false
		}
	}

	componentWillReceiveProps(nextProps) {
	    // Should be a controlled component.
	    if ('value' in nextProps) {
	      const value = nextProps.value;
	      this.setState(value);
	    }
	}

	handleDateRange = (date, dateString) => {
		console.log(date, dateString);
	}

   	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	    	visible: false,
	    });
    	this.props.onCancel();
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.editProjectDetails(values))
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
			projectName,
			projectCreatedBy,
			projectDetails,
			projectStartDate,
			projectEndDate,
			visible
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;

		return (
			<LocaleProvider locale={enUS}>
		       <Modal title="Edit Projects"
			          visible={visible}
			          confirmLoading={this.state.confirmLoading}
			          onCancel={this.handleCancel}
			          footer={[]}
			        >
			          <Form onSubmit = { this.handleSubmit }>
				        <FormItem>
				          {
				          	getFieldDecorator('name', {
				             rules: [{ required: true, message: 'Please input your project name!' }],
				             initialValue : this.state.projectName
				          })(
			            		<Input prefix={<Icon type="plus" style={{ fontSize: 13 }} />}  />
				          )}
				        </FormItem>

				        <FormItem>
				          {
				          	getFieldDecorator('details', {
				            rules: [{ required: true, message: 'Please input details!' }],
				             initialValue : this.state.projectDetails
				          })(
				            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} />
				          )}
				        </FormItem>

				        <FormItem>
				          {
				          	getFieldDecorator('daterange', {
				            rules: [{ required: false, message: 'Please input time duration!' }],
				            initialValue : [moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]
				          })(
							<RangePicker onChange={ this.handleDateRange } className = 'range-picker'/>
				          )}
				        </FormItem>

				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            SAVE
				          </Button>
				        </FormItem>
				    </Form>
			        </Modal>
			</LocaleProvider>
		)
	}
}
const EditProject = Form.create()(EditProjectDetailView);
export default connect(

)(EditProject)