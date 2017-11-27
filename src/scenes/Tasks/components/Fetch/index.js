import React, { Component } from 'react';
import $ from 'jquery';

export class Fetch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content : []
		}
	}

	componentDidMount() {
		$.ajax({
			url : this.props.url,
			success:(data) => {
				this.setState({
					content : data
				})
			},
			error:(err) => {
				console.log(err);
			}
		})
	}

	render() {
		return (
			<section>
				<h1>fetch api section</h1>
				{this.props.children(this.state.content)}
			</section>
		);
	}
}

// Fetch.propTypes = {
// 	url : React.PropTypes.string.isRequired
// }