import React, {useState} from "react";
import HubspotForm from 'react-hubspot-form';
import Loader from "../Loader/Loader";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { updateLoader } from '../../redux/actions/loaderActions';

const AlliePartner = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    dispatch( updateLoader(true) );

    const [cover, setCover] = useState(false);

    const handleSubmit = () => {
        setCover(true);
        dispatch( updateLoader(true) );
        setTimeout(() => {
            dispatch( updateLoader(false) );
            // history.push("/solicitud_enviada_brokers");
        }, 3000);
    }

    return(
        <>
            {cover == true &&
                <div className={'styleCover'}></div>
            }

            <Loader/>

            <div style={{padding: '20px', marginRight: '20px'}}>
                <HubspotForm
                portalId='4957447'
                formId='a9eb65ec-7b91-4a2e-bb25-2915e103e8d2'
                onSubmit={() => handleSubmit()}
                onReady={() => dispatch( updateLoader(false) )}
                loading={() => dispatch( updateLoader(true) )}
                />
            </div>

            <style>{"\
                #clgo{\
                    display: none !important;\
                }\
                #clgo-wsp{\
                    display: none !important;\
                }\
            "}</style>
        </>
    );
}

export default AlliePartner;