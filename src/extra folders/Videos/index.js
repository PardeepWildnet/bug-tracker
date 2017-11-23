import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class Videos extends Component {
	render () {
		return (
			<div>
				<ReactPlayer 
					url='https://www.youtube.com/watch?v=PvjNglsyOHs' 
					playing = {false} 
					controls={true}
				/>
			</div>
		)
	}
}

export default Videos