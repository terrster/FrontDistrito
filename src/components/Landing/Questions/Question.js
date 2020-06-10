import React from 'react';


const Question = props => {
	return (
		<div className="mt-3">
			<div className="coolvetica blackBlue fz22">
				{props.question}
			</div>
			<div className="text-justify metropolisReg fz20" style={{letterSpacing: '0.1px'}}>
				{props.text}
			</div>
		</div>
	)
}

export default Question