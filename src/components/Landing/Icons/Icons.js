import React from 'react';
const Icons = props => {
	return (
		<div>
			<div className="text-center mt-4">
				<div className="d-flex align-items-end">
					<img src={props.img} alt={props.alt} width={props.width} className="icon-image mb-2 mr-auto ml-auto" />
				</div>
			</div>
			
			<div className="text-center">
				<div className="brandonReg mxw-160 fz21 blackBlue ml-auto mr-auto">
					{props.text}
				</div>
			</div>
		</div>
	)
}

export default Icons