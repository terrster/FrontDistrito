import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";
import DocumentsModal from './DocumentsModal';
import Steps from "./Steps";
import Title from "../Generic/Title";
import DocumentsForm from "../../forms/DocumentsForm";
import { ProgressBar, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLoader } from "../../redux/actions/loaderActions";
import { execToast } from "../../utils/ToastUtils";
import { updateToast } from "../../redux/actions/appActions";

const Documents = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const app = useSelector(state => state.app);
    const toast = useSelector((state) => state.app.toast);
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
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [errorUpload, setErrorUpload] = useState({
        msg: '',
        show: false
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
        if(toast) {
            execToast("documents");
            dispatch(updateToast(app, "docs"));
        }  
    }, []);

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

    useEffect(() => {
        if(user.idClient.appliance[0].hasOwnProperty('idDocuments')){
            setValues(user.idClient.appliance[0].idDocuments);
        }
    }, user);

    const handleSubmit = async(files) => {
        window.scrollTo(0, 0);
        dispatch(updateLoader(true));
        if (!toast.documents){
            execToast("documents");
            dispatch( updateToast(toast,"documents"));
        }

        let formData = new FormData();
        var docsToUpload = 0;
        for(const inputField in files){
            if(inputField!= '_id' && inputField!= 'idClient' && inputField!= '__v' && inputField!= 'status'){
                files[inputField].forEach(f => {		
                    if(f.name !== undefined){
                        docsToUpload++;
                        formData.append(inputField, f);
                    }
                });
            }
        }
  
        try{
            if(docsToUpload === 0){
                dispatch(updateLoader(false));
                setErrorUpload({
                    msg: 'No hay documentos que subir.',
                    show: true
                });
                setTimeout(() => {
                    setErrorUpload({
                        msg: '',
                        show: false
                    })
                }, 25000);
                return;
            }
            const idClient = user.idClient;
            if (idClient.appliance.length > 0){
                let update = false;
                const appliance = idClient.appliance[idClient.appliance.length - 1];
                if (appliance.hasOwnProperty("idDocuments")){
                    update = true;
                }
                if(!update){
                    const { data } = await axios.post(`api/documents/${user._id}`, formData, {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    },
                        onUploadProgress: progressEvent => {
                        setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    }	
                    });

                    if(!data.hasOwnProperty("error") && data.msg !== "Sin archivos"){
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        setUser(JSON.parse(sessionStorage.getItem("user")));
                    }
                } 
                else{
                    const idDocuments = appliance.idDocuments;
                    const { data } = await axios.put(`api/documents/${idDocuments._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                        onUploadProgress: progressEvent => {
                        setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    }		
                    });
                    
                    if(!data.hasOwnProperty("error") && data.msg != "Sin archivos"){
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        setUser(JSON.parse(sessionStorage.getItem("user")));
                    }
                }

                if(JSON.parse(sessionStorage.getItem("user")).idClient.appliance[0].idDocuments.status === true && idClient.appliance.length > 0){
                    const appliance = idClient.appliance[idClient.appliance.length - 1];
                    const applianceRequest = await axios.put(`api/appliance/${appliance._id}`, { status: true });
                    if(!applianceRequest.data.hasOwnProperty("error")){
                                sessionStorage.setItem('user', JSON.stringify(applianceRequest.data.user));
                                setUser(JSON.parse(sessionStorage.getItem("user")));
                    }
                    history.push('/credito/solicitud/'+appliance._id);
                } 
                else {
                    history.push('/credito');
                }
            }
            dispatch(updateLoader(false));
        } 
        catch(e){
            console.log(e);
        }
    }; 

    return (
        <div className="container mt-3">
            <ToastContainer />
            <Loader />
            <DocumentsModal />
            <Steps />
            {
                uploadPercentage > 0 &&
                <div className="text-center">
                    <p className="text-dp">Subiendo documento(s)...</p>
                    <p className="text-dp">{uploadPercentage}%</p>
                    <ProgressBar animated now={uploadPercentage}/>
                </div>
            }
            {
                errorUpload.show &&
                <Alert variant="danger">
                    <strong>{errorUpload.msg}</strong>
                </Alert>

            }
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
            <DocumentsForm initialValues={initialValues} setValues={setValues} handleSubmit={handleSubmit} setUser={setUser} history={history} params={props.match.params}/>
        </div>
    );
};

export default Documents;