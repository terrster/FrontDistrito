import React, { useState, useEffect } from 'react';
import Steps from "./Steps";
import Title from "../Generic/Title";
import DocumentsForm from "../../forms/DocumentsForm2";

const Documents = () => {
    const [initialValues, setValues] = useState({
        oficialID : [], 
        proofAddress : [], 
        bankStatements : [],  
        constitutiveAct : [], 
        otherActs : [], 
        financialStatements : [], 
        rfc : [] , 
        acomplishOpinion : [], 
        lastDeclarations : [], 
        facturacion: [],
        others : [], 
        cventerprise: [], 
        proofAddressMainFounders: [],
        collectionReportSaleTerminals: [],
        localContractLease: [],
        status: false
    });
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        if(user.idClient.appliance[0].hasOwnProperty('idDocuments')){
            setValues(user.idClient.appliance[0].idDocuments);
        }
    }, user);

    return (
        <div className="container mt-3">
            <Steps />
            <div className="text-center mb-3">
                <Title
                title="Sube tus documentos"
                className="title-dp fz42"
                />
                <div className="metropolisReg fz16 mt-3 mailto-content">
                Procura que la calidad sea óptima y legible en formato: <br></br>
                PNG, JPG, ZIP, PDF y/o FOTO en buena calidad según sea el caso (Peso
                máximo de 10MB por archivo). <br></br>
                Si lo prefieres, también puedes enviarnos tu documentación a{" "}
                <a href="mailto:documentos@distritopyme.com">
                    documentos@distritopyme.com
                </a>
                </div>
            </div>
            <DocumentsForm initialValues={initialValues} setValues={setValues}/>
        </div>
    );
};

export default Documents;