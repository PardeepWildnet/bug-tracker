import React, { Component } from 'react';
import { connect } from 'react-redux';
import Time from 'react-time';
import { Form, Input, LocaleProvider, Modal, Icon, Button, DatePicker  } from 'antd';
import moment from 'moment';

import * as api from './../../data/EditProject/api';
import * as fetchDetailApi from './../../data/ProjectDetail/api';
import './ProjectDetail.css';

const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;

class ProjectDetailView extends Component {
	checkVisibility = false;
	constructor(props){
		super(props);
		this.state = { visible: false }
	}

	// This method is called before rendering the component and to get details of project
	componentWillMount = () => 	this.props.dispatch(fetchDetailApi.fetchProjectDetail(this.props.match.params.id))

	// This method is called after getting any props
	componentWillReceiveProps = (nextProps, nextState) => {
		console.log("After Login ", nextProps.editProjects)
		if(nextProps.projectDetail && nextProps.projectDetail.status === 200  && this.checkVisibility == false){
			this.setState({
		    	visible: false,
		    });
				this.checkVisibility = false;
		    this.props.form.resetFields();
				this.forceUpdate();
		}
	}

	// This method is used to show the add team modal
	showModal = () => {
		this.setState({ visible: !this.state.visible });
		this.checkVisibility = true;
	}

	// This method is used to close the add team modal
	handleCancel = () => {
		this.setState({ visible: false });
		this.checkVisibility = false;
	}

	// This method is used to edit project details
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.editProjectDetails(values, this.props.match.params.id))
				this.checkVisibility = false;
				this.props.history.push('/dashboard/projects');
		  }
		});
	}

	render () {
		const { visible } = this.state;

		const {
			projectDetail,
			role,
			editProjects,
			form : { getFieldDecorator }
		} = this.props;

		return (
			<div className = 'project-detail-view'>
			<p className = 'heading-style project-style'> Project Detail </p>
				<table className='table table-striped table-responsive table-view'>
					<tbody>
						<tr>
								<th>Title</th>
								<th>Description</th>
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
				  				<td><Time value={projectDetail.result.projectStartDate} format="DD-MM-YYYY" /></td>
				  			</tr>
							<tr>
				  				<td>End Date :</td>
				  				<td><Time value={projectDetail.result.projectEndDate} format="DD-MM-YYYY" /></td>
				  			</tr>

				  			<tr>
				  				<td>Created By :</td>
				  				<td>{projectDetail.result.projectCreatedBy?projectDetail.result.projectCreatedBy.firstName + " " + projectDetail.result.projectCreatedBy.lastName : '-'}</td>
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
							<RangePicker className = 'range-picker'/>
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
			editProjects : state.projects.data.editProjects[state.projects.data.editProjects.length - 1],
		})
	}
)(ProjectDetail);
