import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import comparativeImage from "../../assets/img/comparativapopup-01.jpg";

function DocumentsModal() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <img
          src={comparativeImage}
          className="modal-comparative--image"
          alt="Comparativo de imagenes en buena calidad"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="btn-blue-documents" onClick={handleClose}>
          Entiendo
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DocumentsModal;

/*
<img
src={comparativeImage}
className="modal-comparative--image"
alt="Comparativo de imagenes en buena calidad"
/>
<Button
onClick={() => setShow(false)}
className="btn-blue-documents"
block
>
Entiendo
</Button> */
