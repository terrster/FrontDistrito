import React, {useState, useLayoutEffect, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLoader } from '../../redux/actions/loaderActions';
import CustomLoader from '../Generic/CustomLoader';
import Axios from "../../utils/axios";

import Curso from "./Curso";
import Pendiente from "./Pendiente";
import BuroPendiente from "./BuroPendiente";
import BuroPendienteAnalizando from "./BuroPendienteAnalizando";
import BuroEmpresa from "./BuroEmpresa";
import PropuestaEnviada from "./PropuestaEnviada";
import PropuestaEnviadaPendiente from "./PropuestaEnviadaPendiente";
import PropuestaEnviadaAdicional from "./PropuestaEnviadaAdicional";
import ValidacionDocumentos from "./ValidacionDocumentos";
import AnalisisCredito from "./AnalisisCredito";
import Formalizacion from "./Formalizacion";
import Depositado from "./Depositado";
import NoViableRechazado from "./NoViableRechazado";
import Inactivo from "./Inactivo";
import NoViableSinRequisitos from "./NoViableSinRequisitos";
import Error from "./Error";

const Solicitud = () => {
    const dispatch = useDispatch();

    const { loader: { isLoading } } = useSelector((state) => state);

    const user = JSON.parse(sessionStorage.getItem("user"));
    // const user = {
    //     _id: '5ec8365e67de6c3fd0d807c7',
    //     hubspotDealId: '3444093998'//2951617913 //2947900743 //3444093998
    // }
    const [properties, setProperties] = useState(null);
    const [estatus, setEstatus] = useState(null);
    const [component, setComponent] = useState(null);
    
    const showEstatus = (estatus) => {
        switch(estatus){
            // case '366828'://Registro, se deshabilitará cuando no haya elegido tipo de persona
            // break;

            case '88b229ab-5161-4c94-ab74-fd68faee5140'://Solicitud Curso (Info Parcial) - DP
            case '2753634'://SOLICITUD EN PROCESO - ImpulsoMx
                setComponent(<Curso/>);
            break;

            case 'd52c3e71-74ee-499b-8af9-abe5245deaaa'://Integrando Documentación - DP
            case '1849307'://INTEGRANDO EXPEDIENTE - ImpulsoMx
                setComponent(<Pendiente/>);
            break;

            case 'd0874266-3f5f-44a4-9905-76f9e1871805'://No autenticó - DP
                setComponent(<BuroPendiente/>);
            break;

            case 'a91d7ff2-ad67-4953-8d60-f08cb14a328d'://Consulta Buró Física - DP
            case '6509662'://CONSULTAS DE BURÓ - ImpulsoMx
                setComponent(<BuroPendienteAnalizando/>);
            break;

            case '1210171'://Consulta Buró Moral
                setComponent(<BuroEmpresa/>);
            break;

            case '768759'://Pre-análisis y Envío de Propuesta
                setComponent(<PropuestaEnviada/>);
            break;

            case '768760'://Integrando/Contactar - DP
                setComponent(<PropuestaEnviadaPendiente properties={properties}/>);
            break;

            case 'cb42f8c5-4c77-498c-a4e9-e02b74b9bc4c'://Información Adicional Requerida - DP
            case '1849309'://INFO ADICIONAL REQUERIDA - ImpulsoMx
                setComponent(<PropuestaEnviadaAdicional properties={properties}/>);
            break;

            case '58b0edce-4810-4be2-85e4-b3fa4b2239bf'://Validación de Documentos - DP
                setComponent(<ValidacionDocumentos properties={properties}/>);
            break;

            case '8e979808-5a1d-4d08-b03f-d369c6370355'://Análisis Banco/Financiera - DP
            case '1849308'://ANALISIS - ImpulsoMx
            case '6149509'://PROCESO DE VISITA - ImpulsoMx
            case '6149510'://DICTAMEN - ImpulsoMx
            case '1849310'://COMITÉ DE CRÉDITO - ImpulsoMx
                setComponent(<AnalisisCredito properties={properties}/>);
            break;

            case 'e831b8e3-4a3a-429e-932e-6fb7fa40d011'://Formalización - DP
            case '1849311'://AUTORIZADO/ACEPTACIÓN CLIENTE - ImpulsoMx
            case '1849325'://ELABORACIÓN DE CONTRATO - ImpulsoMx
            case '1849326'://CONTRATO ENVIADO - ImpulsoMx
            case '1849327'://LIBERACIÓN DE FONDEO - ImpulsoMx
                setComponent(<Formalizacion properties={properties}/>);
            break;

            case '9d2b4ccf-18ad-4dd6-9d10-ff4f65d6f1be'://Cierre Exitoso - DP
            case '1849312'://NUEVO CLIENTE - ImpulsoMx
                setComponent(<Depositado/>);
            break;
            
            case 'ebdea2f6-dea7-4646-b8e0-089a4b7f5c02'://Rechazado - DP
            case '1849313'://RECHAZADO - ImpulsoMx
                setComponent(<NoViableRechazado/>);
            break;

            case 'fdf366d3-865e-4fe4-844e-d16dc64c58d5'://Inactivo (Cliente no continuo) - DP
            case '1849339'://INACTIVO - ImpulsoMx
                setComponent(<Inactivo properties={properties}/>);
            break;

            case '7e4ec2de-1478-45e3-9fab-b702740d4733'://Sin requisitos básicos - DP
                setComponent(<NoViableSinRequisitos/>);
            break;

            case '4289875'://StandBy - Mostrar la pantalla de inactivo - DP
                setComponent(<Inactivo properties={properties}/>);
            break;

            default://Error
                setComponent(<Error/>);
            break;
        }
    }

    /*Obtener el estatus de solicitud a través de una ruta conectada a hubspot*/
    useLayoutEffect(() => {
        dispatch( updateLoader(true) );

        const getHubspotProperties = async() => {
            try{
                let {data} = await Axios.get(`/api/deal/${user.hubspotDealId}`);
                setProperties(data.properties);
            } 
            catch(error){
                //console.log(error);
                dispatch( updateLoader(false) );
                showEstatus(null);
            }
        }

        setTimeout(() => {
            getHubspotProperties();
        }, 2000);
    
    }, []);

    /*Logica para establecer el componente a mostrar de acuerdo a la etapa del deal*/
    useEffect(() => {
        if(properties != null){
            setEstatus(properties.dealstage.value);
        }
    }, [properties]);

    /*Mostrar componente*/
    useEffect(() => {
        if(estatus != null){
            dispatch( updateLoader(false) );
            showEstatus(estatus);//etapa del deal
            //showEstatus('1210171');//forzar visualización de etapa
        }
    },[estatus]);

    if(isLoading)
		return <CustomLoader />

    return(
        <div className="container mt-30 mb-5">
            {component}
        </div>
    );
}

export default Solicitud;