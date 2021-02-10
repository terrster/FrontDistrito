import React, { useEffect, useState } from 'react';
import Title from '../Generic/Title';
import { Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import OpenBankingForm from '../../forms/OpenBankingForm';

/*Images*/
import openBankingWeb from '../../assets/img/open_banking/openbanking_banner-01.jpg';
import io from 'socket.io-client';

const OpenBanking = () => {
    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem("user"));   
    const [socket, setSocket] = useState(null);
    const [banksOptions, setBanksOptions] = useState([]);//Options for select
    const [bankFields, setBankFields] = useState([]);
    const [error, setError] = useState(null);
    const [initialValues, setinitialValues] = useState({
        bank0: {
            id: '',
            idCredential: null,
            values: {},
            validate: false,
        }
    });
    const [validating, setValidating] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [provideToken, setProvideToken] = useState({
        token: '',
        idCredential: ''
    });

    useEffect(() => {
        if(user){
            const socket = io.connect(process.env.REACT_APP_BACKEND, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    'idU': user._id
                }
            });
            setSocket(socket);

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
                                [`bank${Object.keys(initialValues).length}`]: {
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

    useEffect(() => {
        if(socket){
            socket.on('askForToken', (data) => {
                setProvideToken({
                    ...provideToken,
                    idCredential: data.idCredential
                });
                setShowModal(true);
            });

            socket.on('notifySuccess', (callback) => {
                let index = Object.keys(initialValues)[Object.values(initialValues).findIndex(bank => bank.credentialId == callback.credentialId)];

                let initialValuesCopy = {...initialValues};
                initialValuesCopy[index].validate = true;
                setinitialValues(initialValuesCopy);

                sessionStorage.setItem('user', JSON.stringify(callback.user));
                setValidating(false);
            });

            socket.on('notifyFailure', async(callback) => {
                let index = Object.keys(initialValues)[Object.values(initialValues).findIndex(bank => bank.credentialId == callback.credentialId)];
                
                let {data} = await axios.delete(`api/finerio/credentials/${callback.credentialId}`);
                sessionStorage.setItem('user', JSON.stringify(data.user));

                let initialValuesCopy = {...initialValues};
                initialValuesCopy[index].idCredential = null;
                setinitialValues(initialValuesCopy);
                setError(callback.message);
                setTimeout(() => {
                    setError(null);
                }, 5000);
                setValidating(false);
            });
        }
    }, [socket]);

    useEffect(() => {
        if(!user){
            history.push("/login/open-banking");
        }
        else{
            const getBanks = async () => {
                const { data } = await axios.get("api/finerio/banks");
                setBanksOptions(data);
            };
        
            getBanks();
        }
    }, []);

    const getBankFields = async (idBank, bank) => {
        let bankFieldsCopy = {...bankFields};
        let initialValuesCopy = {...initialValues};

        const { data } = await axios.get(`api/finerio/bank/${idBank}/fields`);

        initialValuesCopy[bank].id = idBank;
        bankFieldsCopy[bank] = data;

        Object.entries(data).forEach(([key]) => {
            initialValuesCopy[bank].values[data[key].name] = '';
        });

        setinitialValues(initialValuesCopy);
        setBankFields(bankFieldsCopy);

        // dispatch(updateLoader(false));
    };

    const handleSubmit = async(values) => {
        setValidating(true);
        
        const { data } = await axios.post(`api/open-banking/store`, values);

        if(data.code === 200){
            let initialValuesCopy = {...initialValues};
            initialValuesCopy[`bank${Object.keys(initialValues).length - 1}`].idCredential = data.idCredential;
            setinitialValues(initialValuesCopy);

            // setValidating(false);
        }
        else{
            setValidating(false);
        }
    }

    const handleProvideToken = async() => {
        setShowModal(false);
        const { data } = await axios.post(`api/open-banking/storeToken`, provideToken);

        if(data.code === 200){

        }
        
        setProvideToken({
            token: '',
            idCredential: ''
        });
    }

    return (
        <>
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
            </div>

            <OpenBankingForm 
                user={user} 
                axios={axios}
                banksOptions={banksOptions} 
                bankFields={bankFields} 
                setBankFields={setBankFields} 
                error={error}
                setError={setError}
                initialValues={initialValues} 
                setinitialValues={setinitialValues} 
                getBankFields={getBankFields} 
                handleSubmit={handleSubmit} 
                validating={validating}
                setValidating={setValidating}
                showModal={showModal}
                setShowModal={setShowModal}
                provideToken={provideToken}
                setProvideToken={setProvideToken}
                handleProvideToken={handleProvideToken}
            />
        </>
    );
}

export default OpenBanking;
