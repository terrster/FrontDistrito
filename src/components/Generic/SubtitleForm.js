import React from 'react';


const SubtitleForm = props => {
	return (
		<div id={props.id} className={`subtitle form fz24 ${props.className}`}>
			{props.subtitle}
		</div>
	)
}

export default SubtitleForm