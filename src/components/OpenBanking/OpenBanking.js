import React, { useEffect, useState, useCallback } from 'react';
import Title from '../Generic/Title';
import { Carousel, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import OpenBankingForm from '../../forms/OpenBankingForm';
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { updateLoader } from "../../redux/actions/loaderActions";

/*Images*/
import openBankingWeb from '../../assets/img/open_banking/openbanking_banner-01.jpg';
import io from 'socket.io-client';

const OpenBanking = () => {
    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem("user"));   
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const [banksOptions, setBanksOptions] = useState([]);//List of banks to choose
    const [initialValues, setinitialValues] = useState({
        bank0: {
            id: '',
            idCredential: null,
            values: {},
            validate: false,
        }
    });
    const [validating, setValidating] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if(user){
            connectSocket();

            if(user.idClient.appliance[0].hasOwnProperty('idFinerio')){
                let credentials = user.idClient.appliance[0].idFinerio.credentials;
                let initialValuesCopy = {...initialValues};

                if(credentials.length){
                    credentials.map((credential, index) => {
                        if(index === 0){
                            initialValuesCopy[`bank0`].id = credential.idBank;
                            initialValuesCopy[`bank0`].idCredential = credential.id;
                            initialValuesCopy[`bank0`].values = {};
                            initialValuesCopy[`bank0`].validate = true;
                        }
                        else{
                            initialValuesCopy = {
                                ...initialValuesCopy,
                                [`bank${Object.keys(initialValuesCopy).length}`]: {
                                    id: credential.idBank,
                                    idCredential: credential.id,
                                    values: {},
                                    validate: true
                                }
                            };
                        }
                    });
                    
                    setinitialValues(initialValuesCopy);
                }
            }
        }
    }, []);

    const connectSocket = useCallback(() => {//process.env.REACT_APP_BACKEND, https://apidev.distritopyme.com/
        const socket = io.connect(process.env.REACT_APP_BACKEND, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'idU': user._id
            }
        });
        setSocket(socket);
    }, []);

    useEffect(() => {
        if(!user){
            history.push("/login/open-banking");
        }
        else{
            dispatch(updateLoader(true));

            const getBanks = async() => {
                try{
                    const { data } = await axios.get("api/finerio/banks");

                    if(data.code === 200){
                        setBanksOptions(data.banks);
                    }
                    else{
                        throw Error;
                    }

                    dispatch(updateLoader(false));
                } 
                catch(error){
                    setError("Ha ocurrido un error tratando de obtener los bancos.");
                    dispatch(updateLoader(false));
                }
            };
        
            getBanks();
        }
    }, []);

    const handleSubmit = async(values) => {
        // let banks = Object.keys(values).filter(bank => values[bank].validate === false);

        // if(banks.length){
            try{
                dispatch(updateLoader(true));
                setValidating(true);
        
                const { data } = await axios.post(`api/open-banking/store`, values);
        
                if(data.code === 200){
                    let initialValuesCopy = {...initialValues};
                    initialValuesCopy[`bank${Object.keys(initialValuesCopy).length - 1}`].idCredential = data.idCredential;
                    setinitialValues(initialValuesCopy);
                }
                else if(data.code === 500){
                    dispatch(updateLoader(false));
                    setValidating(false);
        
                    setError("Ha ocurrido un error tratando de registrar la credencial bancaria");
        
                    setTimeout(() => {
                        setError(null);
                    }, 5000);
                }
            }
            catch(error){
                dispatch(updateLoader(false));
                setValidating(false);
    
                setError("Ha ocurrido un error tratando de registrar la credencial bancaria");
    
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        // }
        // else{
        //     setMessage("No hay nuevas credenciales que guardar.");
        //     setTimeout(() => {
        //         setMessage(null);
        //     }, 5000);
        // }
    }

    return (
        <>
            <Loader />
            <Title title="Open Banking" className="title-dp fz42 fw500 mb-1 text-center"/>
            <Carousel controls={false} indicators={false}>
                <Carousel.Item>
                    <img className="d-block w-100" src={openBankingWeb} alt="web"/>
                </Carousel.Item>
            </Carousel>
            <div className="text-dp pl-4 pr-4 mt-4">
                <p>
                    <strong>¿Qué es el open banking?</strong>
                </p>
                <p>
                    El <strong>open banking</strong>  es el uso de tecnología automatizada para acceder de forma segura y controlada a 
                    información de tu banco para extraer info como: saldos y movimientos, haciendo que el trámite de tu crédito sea 
                    reducido a la mitad del tiempo.​
                </p>
                <p>
                    El open banking es una tendencia global y ya está siendo utilizada en México por Fintechs, Bancos y Financieras.​
                </p>
                <p>
                    Es un servicio 100% regulado por la CNBV a través de la ley Fintech.
                </p>

                <p>Antes de agregar tus datos:</p>
                <ul>
                   <li>Verifica que tu usuario/cuenta y contraseña de tu banca por internet estén actualizados.</li> 
                   <li>Cierra tu sesión de tu banca por internet (página web o aplicación móvil).</li> 
                   <li>Si tu banco requiere un Token dinámico para entrar a la banca por internet, debes tenerlo cerca de ti.</li> 
                   <li>Al dar click en validar, no cierres la ventana mientras el proceso avanza.</li> 
                </ul>
            </div>

            {
                banksOptions.length === 0 && error &&
                <Alert className="container" variant="danger">
                    {error}
                </Alert>
            }

            {
                banksOptions.length > 0 &&
                
                <OpenBankingForm 
                    socket={socket}
                    axios={axios}
                    banksOptions={banksOptions} 
                    initialValues={initialValues} 
                    setinitialValues={setinitialValues} 
                    handleSubmit={handleSubmit}
                    validating={validating}
                    setValidating={setValidating}
                    dispatch={dispatch}
                    updateLoader={updateLoader}
                    error={error}
                    setError={setError}
                    message={message}
                    setMessage={setMessage}
                />
            }
        </>
    );
}

export default OpenBanking;
