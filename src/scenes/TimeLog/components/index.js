import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'antd';
import AddLogTime from './AddLogTime';
import ShowTimeStamps from './ShowTimeStamps';
import * as api from './../data/ShowTimeStamps/api';
const FormItem = Form.Item;

const timeLog1 = "hi";

class TimeLogView extends Component {
	constructor () {
		super();
		this.state = {
			task : 'task',
			date : '2017-11-08',
			time : '6.23 am'
		}
	}

	componentWillMount () {
		this.props.dispatch(api.ShowTimeLogApi());
	}

	render () {
		const { 
			timeLogs 
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;

		return (
			<div>
				<FormItem label="Price">
		          {getFieldDecorator('addTimeLog', {
		            initialValue: { task : this.state.task, date : this.state.date, time : this.state.time},
		          })(<AddLogTime />)}
		        </FormItem>
				<ShowTimeStamps timeLog = { timeLogs }/>
			</div>
		)
	}
}
const TimeLog = Form.create()(TimeLogView);

export default connect (
	state => {
		// console.log("data from store in time log is :- ", state.timeLogs.timeLog);
		return ({
			timeLogs : state.timeLogs.timeLog.showTimeLogs[0]
		})
	}
)(TimeLog)


