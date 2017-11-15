import React, { Component } from 'react';
import { Modal, Form } from 'antd';

import timeLogs from './../../../../Assets/timeLogList.json';
import EditLogTime from './../EditLogTime';
import './ShowTimeStamps.css';

const FormItem = Form.Item;

class ShowTimeStampView extends Component {
	constructor () {
		super();
		this.editTimeLog = this.editTimeLog.bind(this);
		this.state = {
			visible : false,
			title : '',
			category : ''
		}
	}

	editTimeLog (item) {
		console.log(" inside methos of edit time log is :- ", item);
		console.log(" value of visible bfore change is :- ", this.state.visible);
		if(item) {
			this.setState({
				visible : !this.state.visible,
				title : item.desc,
				category : item.category
			})
		}
		else {
			this.setState({
				visible : !this.state.visible
			})
		}
		this.forceUpdate();
    	console.log(this.state.visible, item);
 	}

	render () {
		const { 
			timeLog 
		} = this.props;
		
		const { 
			getFieldDecorator 
		} = this.props.form;

		return (
			<div>
				<h1>TimeLog List</h1><br />
				<hr />
				{
					timeLog &&
					timeLog.map((item) => (
						<div key = {item.id} className = 'time-log-list-container'>
							<p className = 'date-style'> { item.desc } </p>
							<p className = 'detail-style'>{ item.category } </p>
							<p className = 'time-style'>{ item.desc } </p>
							<i className="fa fa-pencil icon-style" aria-hidden="true" onClick = {() => this.editTimeLog(item)}></i>
							<i className="fa fa-clock-o icon-style" aria-hidden="true"></i>
							<br />
						</div>
					))
				}
				<FormItem label="Price">
		          {getFieldDecorator('addTimeLog', {
		            initialValue: { title : this.state.title, category : this.state.category},
		          })(
			          <EditLogTime 
						visible = {this.state.visible}
						onCancel = { () => this.editTimeLog()}
					/>
				  )}
		        </FormItem>
				
			</div>
		)
	}
}
const ShowTimeStamps = Form.create()(ShowTimeStampView);
export default ShowTimeStamps

				/*
				when data is coming from api
				{
					timeLog &&
					timeLog.map((item) => (
						<div key = {item.id} className = 'time-log-list-container'>
							<p className = 'date-style'> { item.desc } </p>
							<p className = 'detail-style'>{ item.category } </p>
							<p className = 'time-style'>{ item.desc } </p>
							<i className="fa fa-pencil icon-style" aria-hidden="true"></i>
							<i className="fa fa-clock-o icon-style" aria-hidden="true"></i>
							<br />
						</div>
					))
				}*/

				/*
				when data is coming from json
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
				}*/