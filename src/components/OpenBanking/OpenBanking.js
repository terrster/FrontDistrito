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
    const [initialValues, setinitialValues] = useState({
        bank0: {
            id: '',
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

            socket.on('askForTokenResult', data => {
                console.log('askForTokenResult');
                console.log(data);
            });

            socket.on("credentialSuccessfullyStored", data => {
                console.log("credentialSuccessfullyStored");
                console.log(data);
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
        // let newFieldsBank = bankFields;
        // if (idBank === 1) {
        //   const tokenField = {
        //     friendlyName: "Token",
        //     name: "securityCode",
        //     type: "TEXT",
        //     position: data.length + 1,
        //   };
        //   const newFields = [...data, tokenField];
        //   newFieldsBank[i] = newFields;
        // } else {
        //   newFieldsBank[i] = data;
        // }
        // setForceRender(!forceRender);

        initialValuesCopy[bank].id = idBank;
        bankFieldsCopy[bank] = data;

        Object.entries(data).forEach(([key]) => {
            initialValuesCopy[bank].values[data[key].name] = '';
        });

        setinitialValues(initialValuesCopy);
        setBankFields(bankFieldsCopy);

        // dispatch(updateLoader(false));
    };

    // useEffect(() => {
    //     console.log("initialValues");
    //     console.log(initialValues);
    // }, [initialValues]);

    // useEffect(() => {
    //     console.log("bankFields");
    //     console.log(bankFields);
    // }, [bankFields]);


    const handleSubmit = async(values) => {

        setValidating(true);
        const { data } = await axios.post(`api/open-banking/store`, values);
        console.log(data);
        if(data.code === 200){
            
            setValidating(false);
        }
        else{
            setValidating(false);
        }
    }

    const handleProvideToken = async() => {
        setShowModal(false);
        const { data } = await axios.post(`api/open-banking/storeToken`, provideToken);
        console.log(data);
        // console.log(provideToken);
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
                banksOptions={banksOptions} 
                bankFields={bankFields} 
                setBankFields={setBankFields} 
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
