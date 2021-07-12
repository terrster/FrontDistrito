import React, {useState, useLayoutEffect, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLoader } from '../../../redux/actions/loaderActions';
import CustomLoader from '../../Generic/CustomLoader';
import Axios from "../../../utils/axios";

import CursoAldo from "./cursoAldo";
import PendienteAldo from "./pendienteAldo";


const solicitudAldo = () => {
    const dispatch = useDispatch();

    const { loader: { isLoading } } = useSelector((state) => state);

    //const user = JSON.parse(sessionStorage.getItem("user"));
    const user = {
        _id: '5ec8365e67de6c3fd0d807c7',
        hubspotDealId: '2951617913'//2951617913 //2947900743
    }
    const [properties, setProperties] = useState(null);
    const [estatus, setEstatus] = useState(null);
    const [component, setComponent] = useState(null);
    
    const showEstatus = (estatus) => {
        switch(estatus){
            case '366828'://Registro, se deshabilitará cuando no haya elegido tipo de persona
            break;

            case '1'://Solicitud Curso (Info Parcial)
                setComponent(<CursoAldo/>);
            break;

            case '2'://Integrando Documentación
                setComponent(<PendienteAldo/>);
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
            showEstatus('2');//forzar visualización de etapa
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

export default solicitudAldo;
