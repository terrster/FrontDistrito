import React, { useEffect, useState } from 'react';
import Title from '../Generic/Title';
import { Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import OpenBankingForm from '../../forms/OpenBankingForm';

/*Images*/
import openBankingWeb from '../../assets/img/open_banking/openbanking_banner-01.jpg';

const OpenBanking = () => {
    const history = useHistory();
    const [user] = useState(JSON.parse(sessionStorage.getItem("user")));   
    const [initialValues, setinitialValues] = useState([{
        bank0: {
            id: ''
        }
    }]);
    const [banksOptions, setBanksOptions] = useState([]);//Options for select
    const [bankFields, setBankFields] = useState([]);//Fields required for each bank
    const [banks, setBanks] = useState([{
        id: null,
        idArray: 0,
    }]);//Banks choosen by user

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

    const getBankFields = async (idBank, i) => {
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

        // console.log(data);

        let initialValuesCopy = [...initialValues];
        initialValuesCopy[i][`bank${i}`].id = parseInt(idBank);
        setinitialValues(initialValuesCopy);

        let banksCopy = [...banks];
        banksCopy[i] = {
            id: parseInt(idBank),
            idArray: 0
        };
        setBanks(banksCopy);
        
        let newFieldsBank = [...bankFields];
        newFieldsBank[i] = data;
        setBankFields(newFieldsBank);

        // setBankFields({...bankFields, 
        //     [i]: {
        //         idBank,
        //         data
        //     }
        // });

        // dispatch(updateLoader(false));
    };

    useEffect(() => {
        console.log("bankFields");
        console.log(bankFields);
    }, [bankFields]);

    useEffect(() => {
        console.log("banks");
        console.log(banks);
    }, [banks]);

    useEffect(() => {
        console.log("initialValues");
        console.log(initialValues);
    }, [initialValues]);

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
                    información de tu banco para extraer info como: saldos y movimientos haciendo que el trámite de tu crédito sea 
                    reducido a la mitad del tiempo.​
                </p>
                <p>
                    El open banking es una tendencia global y ya está siendo utilizada en México por Fintechs, Bancos y Financieras.​
                </p>
                <p>
                    Es un servicio 100% regulado por la CNBV a través de la ley Fintech.
                </p>
            </div>

            <OpenBankingForm user={user} initialValues={initialValues} setinitialValues={setinitialValues} banksOptions={banksOptions} getBankFields={getBankFields} bankFields={bankFields} setBankFields={setBankFields} banks={banks} setBanks={setBanks}/>
        </>
    );
}

export default OpenBanking;
