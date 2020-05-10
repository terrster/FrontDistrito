import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LinkButton = props => {
	return(
		<div className="mt-45">
			<Link to={`/${props.link}`}>
				<div className="brandonBld mt-45 text-center">
					<Button className="appliance-button fz21 bluePrimary">
						Completar
					</Button>
				</div>
			</Link>
		</div>
	)
}

export default LinkButton 