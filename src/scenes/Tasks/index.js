import React, { Component } from 'react'
import Tasks from './components'

const Task = (props) => {
		const id = props.match.params.id
		console.log(" id is:- " + id);
		return(
			<Tasks id = {id}/>
		)
	}

export default Task