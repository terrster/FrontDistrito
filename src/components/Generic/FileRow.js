import React from 'react';
import '../../css/file-row.css'

const FileRow = props => (
	<a href={props.file}  className="a-file" target="blank">
		<div className="file-row brandonReg fz24 mt-30">
			{props.name}
		</div>
	</a>
	
)


export default FileRow