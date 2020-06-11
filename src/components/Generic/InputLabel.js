import React from 'react';

const InputLabel = props => {
	return (
		<div className={`fz16 metropolisReg ${props.class}`}>
			{props.label}
		</div>
	)
}

export default InputLabel