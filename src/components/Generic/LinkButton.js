import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LinkButton = props => {
	return(
		<div className="mt-45">
			<Link to={`/${props.link}`}>
				<div className="mt-45">
					<Button className="btn-blue-general fz21" style={{ width: '250px' }}>
						completar
					</Button>
				</div>
			</Link>
		</div>
	)
}

export default LinkButton 