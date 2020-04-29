import React from 'react';

const Paragraph = props => {
	return(
		<div className="mt-2">
			{
				props.title && 
				<div className="lucida fz22">
					{props.title}
				</div>
			}

			{
				props.texts.map((value, index) => 
					<div className="text-justify brandonLight fz20" style={{letterSpacing: '0.1px'}}>
						{value}
					</div>
				)
			}
		</div>	
	)
}

export default Paragraph