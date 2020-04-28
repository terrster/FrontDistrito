import React from 'react';
import ReactPlayer from 'react-player';

const Video = props => {
	return (
		<div style={{maxWidth : '1000px'}} className="ml-auto mr-auto pt-3">
			<ReactPlayer width="100%" height="400px" style={{maxWidth: '1000'}} url="https://www.youtube.com/watch?v=nn0Z67Fc0Xk&feature=youtu.be" />
		</div>
	)
}

export default Video;