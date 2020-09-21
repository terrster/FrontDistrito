import React, {useState, useLayoutEffect, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLoader } from '../../redux/actions/loaderActions';
import CustomLoader from '../Generic/CustomLoader';
import Axios from "../../utils/axios";

import Curso from "./Curso";
import Pendiente from "./Pendiente";
import BuroPendiente from "./BuroPendiente";
import BuroPendienteAnalisando from "./BuroPendienteAnalisando";
import BuroEmpresa from "./BuroEmpresa";
import PropuestaEnviada from "./PropuestaEnviada";

const Solicitud = () => {
    const dispatch = useDispatch();
    const {
        loader: { isLoading },
      } = useSelector((state) => state);
    const user = JSON.parse(sessionStorage.getItem("user"));
    // const user = {
    //     _id: '5ec8365e67de6c3fd0d807c7',
    //     hubspotDealId: '2935598659'
    // }
    const [properties, setProperties] = useState(null);
    const [estatus, setEstatus] = useState(null);
    const [component, setComponent] = useState(null);
    
    const showEstatus = (estatus) => {
        switch(estatus){
            case '366828'://Registro
            break;

            case '88b229ab-5161-4c94-ab74-fd68faee5140'://Solicitud Curso (Info Parcial)
                setComponent(<Curso user={user}/>);
            break;

            case 'd52c3e71-74ee-499b-8af9-abe5245deaaa'://Integrando Documentación
                setComponent(<Pendiente id={user._id}/>);
            break;

            case 'd0874266-3f5f-44a4-9905-76f9e1871805'://No autenticó
                setComponent(<BuroPendiente id={user._id}/>);
            break;

            case 'a91d7ff2-ad67-4953-8d60-f08cb14a328d'://Consulta Buró Física
                setComponent(<BuroPendienteAnalisando/>);
            break;

            case '1210171'://Consulta Buró Moral
                setComponent(<BuroEmpresa/>);
            break;

            case '768759'://Pre-análisis y Envío de Propuesta
                setComponent(<PropuestaEnviada/>);
            break;

            case '768760'://Integrando/Contactar
            break;

            case 'cb42f8c5-4c77-498c-a4e9-e02b74b9bc4c'://Información Adicional Requerida
            break;

            case '58b0edce-4810-4be2-85e4-b3fa4b2239bf'://Validación de Documentos
            break;

            case '8e979808-5a1d-4d08-b03f-d369c6370355'://Análisis Banco/Financiera
            break;

            case 'e831b8e3-4a3a-429e-932e-6fb7fa40d011'://Formalización
            break;

            case '9d2b4ccf-18ad-4dd6-9d10-ff4f65d6f1be'://Cierre Exitoso
            break;
            
            case 'ebdea2f6-dea7-4646-b8e0-089a4b7f5c02'://Rechazado
            break;

            case 'fdf366d3-865e-4fe4-844e-d16dc64c58d5'://Inactivo (Cliente no continuo)
            break;

            case '7e4ec2de-1478-45e3-9fab-b702740d4733'://Sin requisitos básicos
            break;

            case '4289875'://StandBy
            break;

            default:// ****Falta determinar un componente por defecto en caso de un error con backend o la api de hubspot
                setComponent(null);
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
            //showEstatus(estatus);//etapa del deal
            showEstatus('a91d7ff2-ad67-4953-8d60-f08cb14a328d');//forzar visualización de etapa
        }
    }, [estatus]);

    if(isLoading)
		return <CustomLoader />

    return(
        <div className="container mt-30 mb-5">
            {component}
        </div>
    );
}

export default Solicitud;