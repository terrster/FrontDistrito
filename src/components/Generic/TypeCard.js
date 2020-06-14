import React from 'react';
import { Button } from 'react-bootstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core'

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#E8E8E8',
    color: '#000000',
  },
}))(Tooltip);

const TypeCard = props => {
	let descriptions = {
		PF: "Tienes un negocio que aún no está dado de alta en el SAT",
		RIF: "Tu negocio se encuentra dado de alta en Hacienda para realizar una actividad comercial o prestas algún servicio que no requiere título profesional y utilizas el beneficio de incorporación fiscal",
		PFAE: "Tu negocio se encuentra dado de alta en Hacienda para realizar actividades comerciales, industriales etc. de manera formal",
		PM: "Creaste una empresa con un socio o más a través de una acta constitutiva"
	}
	let ids = {
		PF: "ymb-dp-type-pf",
		RIF: "ymb-dp-type-rif",
		PFAE: "ymb-dp-type-pfae",
		PM: "ymb-dp-type-pm"
	}
	return ( 
		<CustomTooltip title={descriptions[props.value]} placement="bottom" style={{fontSize: '14px'}} >
		<div className="full d-flex align-items-center flex-column justify-content-center mb-3" onClick={() => props.refs.current.click()}>
			<div value={`${props.value}`} className="wht-bg text-center">
				<img value={`${props.value}`} className="card-image position-absolute" src={props.img} alt="Información tipo de cliente" style={{marginLeft:'-1rem'}} onClick={props.updateUser}/>
			</div>
			<div className={`type-card ${props.class}`}>
				<div>
					{props.text}
				</div>
			</div>
			<Button type="button" className="mt-2 d-none" id={ids[props.value]} ref={props.refs} onClick={props.updateUser} value={`${props.value}`}></Button>
		</div>
		</CustomTooltip>
	);
}
 
export default TypeCard;