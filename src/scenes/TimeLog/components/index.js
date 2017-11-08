import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddLogTime from './AddLogTime';
import ShowTimeStamps from './ShowTimeStamps';
import * as api from './../data/ShowTimeStamps/api';

const timeLog1 = "hi";

class TimeLog extends Component {
	componentWillMount () {
		this.props.dispatch(api.ShowTimeLogApi());
	}

	render () {
		const { 
			timeLogs 
		} = this.props;
		
		return (
			<div>
				<AddLogTime />
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


