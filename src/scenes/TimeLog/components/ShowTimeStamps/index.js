import React, { Component } from 'react';

import timeLogs from './../../../../Assets/timeLogList.json';
import './ShowTimeStamps.css';

class ShowTimeStamps extends Component {
	render () {
		const { 
			timeLog 
		} = this.props;
		
		return (
			<div>
				<h1>TimeLog List</h1><br />
				<hr />
				{
					timeLogs.map((item) => (
						<div key = { item.id } className = 'time-log-list-container'>
							<p className = 'date-style'> { item.date } </p>
							<p className = 'detail-style'>{ item.detail } </p>
							<p className = 'time-style'>{ item.time } </p>
							<i className="fa fa-pencil icon-style" aria-hidden="true"></i>
							<i className="fa fa-clock-o icon-style" aria-hidden="true"></i>
							<br />
						</div>
					))
				}
			</div>
		)
	}
}

export default ShowTimeStamps
/*{
		this.props.timeLog && 
	this.props.timeLog.map((timeLog, index) => (
		<div key = { index } >
			<li>{ timeLog.desc }</li>
		</div>
	))
}*/
				/*{
					timeLog &&
					timeLog.map((item) => (
						<div key = {item.id}>
							<p>{ item.desc }</p>
							<p>{ item.category }</p>
							<p>{ item.desc }</p><br /><br />
							<br />
							<hr />
						</div>
					))
				}*/