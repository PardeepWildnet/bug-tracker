import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, LocaleProvider, Modal, Icon, Button, DatePicker  } from 'antd';
import moment from 'moment';

// import * as userRoleApi from './../../data/UserRole/api';
// import * as editUserApi from './../../data/EditUser/api';
import * as api from './../../data/EditProject/api';
import * as fetchDetailApi from './../../data/ProjectDetail/api';
// import './UserDetail.css';

const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;

class ProjectDetailView extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			visible: false,
		}
	}

	componentWillMount (){
		console.log("id is ", this.props.match.params.id);
		// this.props.dispatch(userRoleApi.userRole());
		this.props.dispatch(fetchDetailApi.fetchProjectDetail(this.props.match.params.id));
	}


	showModal = () => {
		this.setState({
		  visible: !this.state.visible,
		}, function () {
			console.log("show modal button ", this.state.visible);
		});
	}

	handleCancel = () => {
		this.setState({
		  visible: false,
		}, function() {
			console.log('Clicked cancel button');
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    // this.props.dispatch(editUserApi.editUserDetails(values, this.props.match.params.id))
		    this.props.form.resetFields();
		  }
		  this.setState({
	    	visible: false,
	      }, function () {
	      	console.log("inside handle submit of edit user detail, value of visible is", this.state.visible);
	      });
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.editProjectDetails(values, this.props.match.params.id, this.state.projectCreatedBy))
		    this.props.form.resetFields();
		  }
		  this.setState({
	    	visible: false,
	      });
		});
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

	render () {
		const { 
			visible, 
		} = this.state;

		const {
			projectDetail,
			role
		} = this.props;

	    const { 
			getFieldDecorator 
		} = this.props.form;

		console.log("project detail", projectDetail);
		return (
			<div className = 'user-detail-view'>
			<p className = 'heading-style user-style'> Project Detail </p>
				<table className='table table-striped table-responsive table-view'>
					<tbody>
						<tr>
								<th>Key</th>
								<th>Value</th>
						</tr>
					</tbody>
				    {projectDetail ?
			  			<tbody>
				  			<tr>
				  				<td> Name : </td>
				  				<td>{projectDetail.result.projectName}  </td>
				  			</tr>
							<tr>
				  				<td>Start Date :</td>
				  				<td>{projectDetail.result.projectStartDate}</td>
				  			</tr>
							<tr>
				  				<td>End Date :</td>
				  				<td>{projectDetail.result.projectEndDate}</td>
				  			</tr>

				  			<tr>
				  				<td>Created By :</td>
				  				<td>{projectDetail.result.projectCreatedByName}</td>
				  			</tr>

				  			<tr>
				  				<td>Details :</td>
				  				<td>{projectDetail.result.projectDetails}</td>
				  			</tr>
							
			  				<tr>
				  				<td colSpan = '2'>
				  					<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Edit Project</Button>
				  				</td>
				  			</tr>
				  		</tbody> : 
			  			<tbody></tbody>
					}
   				</table>

   				<Modal title="Edit Projects"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		        { projectDetail ?
			          <Form onSubmit = { this.handleSubmit }>
				        <FormItem>
				          {
				          	getFieldDecorator('name', {
				             rules: [{ required: true, message: 'Please input your project name!' }],
				             initialValue : projectDetail.result.projectName
				          })(
			            		<Input prefix={<Icon type="plus" style={{ fontSize: 13 }} />}  />
				          )}
				        </FormItem>

				        <FormItem>
				          {
				          	getFieldDecorator('details', {
				            rules: [{ required: true, message: 'Please input details!' }],
				             initialValue : projectDetail.result.projectDetails
				          })(
				            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} />
				          )}
				        </FormItem>

				        <FormItem>
				          {
				          	getFieldDecorator('daterange', {
				            rules: [{ required: false, message: 'Please input time duration!' }],
				            initialValue : [moment(projectDetail.result.projectStartDate, dateFormat), moment(projectDetail.result.projectEndDate, dateFormat)]
				          })(
							<RangePicker onChange={ this.handleDateRange } className = 'range-picker'/>
				          )}
				        </FormItem>

				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            SAVE
				          </Button>
				        </FormItem>
				    </Form> : ''
				}
			    </Modal>
			</div>
		)
	}
}
const ProjectDetail = Form.create()(ProjectDetailView);

export default connect(
	state => {
		return ({
			projectDetail : state.projects.data.projectDetail[state.projects.data.projectDetail.length - 1],
		})
	}
)(ProjectDetail);
			