import React from "react";
import HubspotForm from 'react-hubspot-form';
import Loader from "../Loader/Loader";
// import CustomModal from "../Generic/CustomModal";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {
    updateLoader
  } from '../../redux/actions/loaderActions';
// import {
//     updateModal
// } from '../../redux/actions/modalActions';

const Brokers = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    dispatch( updateLoader(true) );

    const handleSubmit = () => {
        dispatch( updateLoader(true) );
        setTimeout(() => {
            dispatch( updateLoader(false) );
            history.push("/solicitud_enviada_brokers");
        }, 3000);
    }

    return(
        <>
            {/* <CustomModal modalName="brokers_modal"/> */}

            <div style={{padding: '20px', marginRight: '20px'}}>
                <HubspotForm
                portalId='4957447'
                formId='9d3b7766-2ffe-441a-8a62-e7fd39d0aca4'
                // onSubmit={() => dispatch( updateModal('brokers_modal', 'Gracias por llenar el formulario, en breve nos comunicaremos contigo.') )}
                onSubmit={() => handleSubmit}
                onReady={() => dispatch( updateLoader(false) )}
                loading={<Loader/>}
                />
            </div>

        </>
    );
}

export default Brokers;