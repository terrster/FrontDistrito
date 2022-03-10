import React from 'react';
import ReactPlayer from 'react-player';
import Title from '../../Generic/Title';


const Video = props => {
	return (
		<div id="videoHowWorks" className="pt-0 text-center">
			<Title title="¿Cómo funciona?" className="title-dp fw500 mb-1 fz42 mt-4 mb-4" />

			<div style={{maxWidth : '1000px'}} className="ml-auto mr-auto pt-3">
				<ReactPlayer width="100%" height="400px" style={{maxWidth: '1000'}} url="https://youtu.be/KPq7r-C_3vo" />
			</div>
		</div>
	)
}

export default Video;