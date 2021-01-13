import React, { useEffect, useState } from 'react';
import Title from '../Generic/Title';
import { Carousel } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import axios from "../../utils/axios";
import FinancialDataForm from '../../forms/FinancialDataForm';

/*Images*/
import openBankingWeb from '../../assets/img/open_banking/openbanking_banner-01.jpg';

const FinancialData = () => {
    const [user] = useState(JSON.parse(sessionStorage.getItem("user")));   
    const [banksOptions, setBanksOptions] = useState([]);//Options for select
    const [bankFields, setBankFields] = useState([]);//Fields required for each bank
    const [banks, setBanks] = useState([]);//Banks choosen by user

    useEffect(() => {
        const getBanks = async () => {
            const { data } = await axios.get("api/finerio/banks");
            setBanksOptions(data);
        };
    
        getBanks();
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

    // useEffect(() => {
    //     console.log("Cambió");
    //     console.log(bankFields);
    // }, [bankFields]);

    const deleteBank = async (indexBank) => {

    };

    return (
        <>
            {
                !user &&
                <Redirect to="/login/ope-financieros"/>
            }
            <div>
                <Title title="Open Banking" className="title-dp fz42 fw500 mb-1 text-center"/>
                <Carousel controls={false} indicators={false}>
                    <Carousel.Item>
                        <img className="d-block w-100" src={openBankingWeb} alt="web"/>
                    </Carousel.Item>
                </Carousel>
                <div className="text-dp pl-5 pr-5 mt-4">
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

                <FinancialDataForm user={user} banksOptions={banksOptions} getBankFields={getBankFields} bankFields={bankFields} banks={banks} setBanks={setBanks}/>
            </div>
        </>
    );
}

export default FinancialData;
