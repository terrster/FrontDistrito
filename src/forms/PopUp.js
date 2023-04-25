import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { updateModalCiec, updateRefDocuments } from '../redux/actions/modalCiecActions';
import Beneficios from '../assets/img/Beneficios.jpg';

function Pop_up({ isDocuments=false }) {
  const dispatch = useDispatch(); 
  const { showModal, refDocuments } = useSelector(state => state.modalCiec);

	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [load, setLoad] = useState(false);

  const history = useHistory();

  const handleClose = () => dispatch(updateModalCiec(false));

  useEffect(() => {
    if(!user){
      setLoad(true);
      return;
    }

    const { appliance } = user.idClient;  
	  let ciec = '';
    if (appliance.hasOwnProperty("idComercialInfo")){
      const { idComercialInfo } = appliance[appliance.length - 1];
	    ciec = idComercialInfo[idComercialInfo.length - 1].ciec;
    }

    if ((ciec === "" || ciec == null) && !refDocuments ){
      dispatch(updateModalCiec(true));
    }

    setLoad(true);

  },[])

    return load && (
      <>
        <Modal show={showModal} centered={true} onHide={handleClose}>
          {/* Boton Cerrar
          <Modal.Header closeButton>
          </Modal.Header>
          */}
          <Modal.Body>
              <img src={Beneficios} width="100%" height="auto" alt="Informacion sobre ciec"/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} block className="btn-blue-documents">
              entiendo los beneficios
            </Button>
            {
				    isDocuments &&
				      <Button onClick={() => { 
                dispatch(updateRefDocuments(true));
                dispatch(updateModalCiec(false));
                history.push(`/informacion-comercial/${user._id}`);

              }} block className="btn-blue-secondary">
					     ir a colocar mi CIEC
      				</Button>
      			}
          </Modal.Footer>
          
        </Modal>
      </>
    );
  }
export default Pop_up;
