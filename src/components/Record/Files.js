import React from 'react';
import FileRow from '../Generic/FileRow';


const Files = props => {

	return (
		<div className="mb-158">
			{
				(props.proposals.length !== 0)
				? props.proposals.map( (value, index) => <FileRow file={value.file} name={value.fileName} key={index} /> )
				: 
				<div className="text-center mt-120 mb-120 fz17 brandonReg gray24">
					Aún no tienes ninguna propuesta
				</div>
			}
		</div>
	)
}

export default Files