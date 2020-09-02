import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { updateModalBanks } from '../redux/actions/modalBanksActions';
import BancaElectronica from '../assets/img/banca-electrónica-01.jpg';

function PopUpBanks() {
    const dispatch = useDispatch(); 
    const { showModal } = useSelector(state => state.modalBanks);

    const handleClose = () => dispatch(updateModalBanks(false));

    return (
        <>
        <Modal show={showModal} centered={true} onHide={handleClose}>
            <Modal.Body>
                <img src={BancaElectronica} width="100%" height="auto" alt="Informacion sobre datos bancarios"/>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleClose} block className="btn-blue-documents">
                Entiendo los Beneficios
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
    }
export default PopUpBanks;
