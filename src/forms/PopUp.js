import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Beneficios from '../assets/img/Beneficios.jpg';
function Pop_up({show, setShow, isDocuments=false}) {
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const handleClose = () => setShow(false);
    return (
      <>
        <Modal show={show} centered={true} onHide={handleClose}>
          {/* Boton Cerrar
          <Modal.Header closeButton>
          </Modal.Header>
          */}
          <Modal.Body>
              <img src={Beneficios} width="100%" height="auto" alt="Informacion sobre ciec"/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose} block>
              Entiendo los Beneficios
            </Button>
            {
				isDocuments &&
				<Button variant="info" onClick={() => window.location.href = `/informacion-comercial/${user._id}`} block>
					Ir a colocar mi CIEC
				</Button>
			}
          </Modal.Footer>
          
        </Modal>
      </>
    );
  }
export default Pop_up;
