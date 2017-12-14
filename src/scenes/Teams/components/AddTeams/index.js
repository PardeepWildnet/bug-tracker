import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddTeams/api';
import teams from './../../../../Assets/teamList.json';
import './AddTeams.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class TeamView extends Component {
	checkVisibility = false;

	constructor(props){
		super(props);
		this.state = { visible: false }
	}

	// This method is called after getting any props
	componentWillReceiveProps = (nextProps, nextState) => {
		if(nextProps.addTeam && nextProps.addTeam.status === 200  && this.checkVisibility == false){
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

	// This method is used to add team
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.addTeam(values))
				this.checkVisibility = false;
		  }
		});
	}

	render(){
		const {
			visible,
			ModalText
		} = this.state;

		const {
			managerList,
			tlList,
			addTeam,
			form : { getFieldDecorator }
		} = this.props;

		const renderManager = managerList ? managerList.result.map((manager) => (
	    	<Option
	    		value={ manager._id }
	    		key = { manager._id }
	    	>
	    		{ manager.firstName } { manager.lastName}
	    	</Option>
	    )) : '';

	    const renderTl = tlList ? tlList.result.map((tl) => (
	    	<Option
	    		value={ tl._id }
	    		key = { tl._id }
	    	>
	    		{ tl.firstName } { tl.lastName}
	    	</Option>
	    )) : '';

		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add Teams </Button>
		        <Modal title="Add Teams"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		          <Form onSubmit = { this.handleSubmit }>
			        <FormItem>
			          {
			          	getFieldDecorator('name', {
			             rules: [{ required: true, message: 'Please input your team name!' }]
			          })(
		            		<Input placeholder="Team Name" />
			          )}
			        </FormItem>

			        <FormItem>
			          {
			          	getFieldDecorator('details', {
			            rules: [{ required: true, message: 'Please input details!' }],
			          })(
			            <Input placeholder="Detail" />
			          )}
			        </FormItem>

			        <FormItem>
			          {getFieldDecorator('manager', {
			            rules: [{ required: true, message: 'Please input manager name!' }],
			          })(
				          <Select placeholder="Select Manager" >
				            {renderManager}
				         </Select>
			          )}
			        </FormItem>

			        <FormItem>
			          {getFieldDecorator('tl', {
			            rules: [{ required: true, message: 'Please input TL name!' }],
			          })(
				          <Select  mode="multiple" placeholder="Select TLs" >
				            {renderTl}
				         </Select>
			          )}
			        </FormItem>

			        <FormItem>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			          	Add Team
			          </Button>
			        </FormItem>
			    </Form>
		        </Modal>
			</div>
		)
	}
}

const AddTeams = Form.create()(TeamView);
export default connect(
	state => {
		return ({
			addTeam : state.teams.data.addTeam[state.teams.data.addTeam.length - 1],
		})
	}
)(AddTeams);
