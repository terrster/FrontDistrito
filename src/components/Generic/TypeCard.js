import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core'
import Modal from 'react-bootstrap/Modal'
import helpImg from '../../assets/img/type_person/help.png'

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#E8E8E8',
    color: '#000000',
  },
}))(Tooltip);

function TypeCardModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-dp mt-4 mb-5">
          {props.text}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={props.onHide} className="btn-blue-general">Cerrar</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const TypeCard = props => {
	const [modalShow, setModalShow] = useState(false);
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
		<div className="full d-flex align-items-center flex-column justify-content-center mb-3" style={{ cursor: 'context-menu'}}>
			<div value={`${props.value}`} className="wht-bg text-center">
				<img value={`${props.value}`} className="card-image" src={props.img} alt="Información tipo de cliente" style={{marginLeft:'-1rem'}} onClick={props.updateUser}/>
			</div>
			<img src={helpImg} className="type-card-help" style={{ cursor: 'pointer' }} onClick={() => setModalShow(true)} />
			<div className={`type-card ${props.class}`} onClick={() => props.refs.current.click()} style={{ cursor: 'pointer' }}>
				<div className="text-dp type-card-text">
					{props.text}
				</div>
			</div>
			<Button type="button" className="mt-2 d-none" id={ids[props.value]} ref={props.refs} onClick={props.updateUser} value={`${props.value}`}></Button>
			<TypeCardModal text={descriptions[props.value]} show={modalShow} onHide={() => setModalShow(false)} title={props.text}/>
		</div>
	);
}
 
export default TypeCard;