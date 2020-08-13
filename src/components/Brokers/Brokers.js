import React from "react";
import HubspotForm from 'react-hubspot-form';
import Loader from "../Loader/Loader";
import CustomModal from "../Generic/CustomModal";
import { useDispatch } from "react-redux";
import {
    updateLoader
  } from '../../redux/actions/loaderActions';
import {
    updateModal
} from '../../redux/actions/modalActions';

const Brokers = () => {
    let dispatch = useDispatch();
    dispatch( updateLoader(true) );
    
    return(
        <>
            <CustomModal modalName="brokers_modal"/>

            <div style={{padding: '20px', marginRight: '20px'}}>
                <HubspotForm
                portalId='4957447'
                formId='9d3b7766-2ffe-441a-8a62-e7fd39d0aca4'
                onSubmit={() => dispatch( updateModal('brokers_modal', 'Gracias por llenar el formulario, en breve nos comunicaremos contigo.') )}
                onReady={(form) => dispatch( updateLoader(false) )}
                loading={<Loader/>}
                />
            </div>

        </>
    );
}

export default Brokers;