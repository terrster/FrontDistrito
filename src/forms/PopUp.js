import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Beneficios from '../assets/img/Beneficios.jpg';
function Pop_up({show, setShow}) {
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
            <Button variant="primary" onClick={handleClose}>
              Entiendo los Beneficios
            </Button>
          </Modal.Footer>
          
        </Modal>
      </>
    );
  }
export default Pop_up;
