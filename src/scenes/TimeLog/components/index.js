import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'antd';

import AddLogTime from './AddLogTime';
import ShowTimeStamps from './ShowTimeStamps';
import * as api from './../data/ShowTimeStamps/api';
const FormItem = Form.Item;

class TimeLog extends Component {
	componentWillMount () {
		this.props.dispatch(api.ShowTimeLogApi());
	}

	render () {
		const { 
			timeLogs,
		} = this.props;

		return (
			<div>
				<AddLogTime key = "add" />
				<ShowTimeStamps timeLog = { timeLogs }/>
			</div>
		)
	}
}

export default connect (
	state => {
		// console.log("data from store in time log is :- ", state.timeLogs.timeLog);
		return ({
			timeLogs : state.timeLogs.timeLog.showTimeLogs[0]
		})
	}
)(TimeLog)


