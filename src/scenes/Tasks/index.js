import React, { Component } from 'react'
import Tasks from './components'

const Task = (props) => 
	<Tasks id = {props.match.params.id}/>

export default Task