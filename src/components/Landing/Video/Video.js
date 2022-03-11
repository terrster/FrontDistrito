import React from 'react';
import ReactPlayer from 'react-player';
import Title from '../../Generic/Title';
import {Card} from 'react-bootstrap';

const Video = props => {
	return (
		<div id="videoHowWorks" className="pt-0 text-center">
			<Card.Header id="header"  className="title-dp-blue fz48  fw300 text-left line-height"><span className='title-dp'> ¿cómo </span> funciona? </Card.Header>

			<div style={{maxWidth : '1000px'}} className="ml-auto mr-auto pt-3">
				<ReactPlayer width="100%" height="400px" style={{maxWidth: '1000'}} url="https://youtu.be/KPq7r-C_3vo" />
			</div>
		</div>
	)
}

export default Video;