import React from 'react';

const Title = props => {
	return (
		<div dangerouslySetInnerHTML={{ __html: props.title }} className={props.className}>
			{/* {props.title} */}
		</div>
	);
}

export default Title
