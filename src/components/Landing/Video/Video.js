import React from 'react';
import ReactPlayer from 'react-player';
import Title from '../../Generic/Title';


const Video = props => {
	return (
		<div className="pt-0 text-center">
			<Title title="¿Como funciona?" className="title-dp fw500 mb-1 fz42" />

			<div style={{maxWidth : '1000px'}} className="ml-auto mr-auto pt-3">
				<ReactPlayer width="100%" height="400px" style={{maxWidth: '1000'}} url="https://www.youtube.com/watch?v=nn0Z67Fc0Xk&feature=youtu.be" />
			</div>
		</div>
	)
}

export default Video;