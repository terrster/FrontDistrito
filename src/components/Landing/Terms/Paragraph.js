import React from 'react';

const Paragraph = props => {
	return(
		<div className="mt-2">
			{
				props.title && 
				<div dangerouslySetInnerHTML={{ __html: "<br>" + props.title }} className="subtitle-dp fz22">
					{/* {props.title} */}
				</div>
			}
			

			{
				props.texts.map((value, index) => 
					<div dangerouslySetInnerHTML={{ __html: value }} className="text-dp text-justify fz20" style={{letterSpacing: '0.1px'}}>
						{/* {value} */}
					</div>
				)
			}
		</div>	
	)
}

export default Paragraph