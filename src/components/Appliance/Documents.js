import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../Generic/Title";
import CustomModal from "../Generic/CustomModal";
import DocumentsForm from "../../forms/DocumentsForm";
import { execToast } from "../../utils/ToastUtils";
import { Alert, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// Components
import Steps from "./Steps";
import DocumentsModal from './DocumentsModal';

import { updateLoader } from "../../redux/actions/loaderActions";
import { updateToast } from "../../redux/actions/appActions";
import {
  updateDocumentsStatus,
  updateDocumentsNames,
  updateDocumentsType,
} from "../../redux/actions/documentsStatusActions";
import { updateRefDocuments } from '../../redux/actions/modalCiecActions';
import { updateAllDocs, updateDocuments } from "../../redux/actions/documentsActions";
import { updateAlert } from '../../redux/actions/alertActions';
import axios from '../../utils/axios';
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";

const Documents = (props) => {

  const history = useHistory();
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [initialValues, setInitialValues] = useState({});
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const modal = useSelector((state) => state.modal.name);
  const appliance = useSelector((state) => state.appliance.appliance);
  const applianceAmount = useSelector((state) => state.appliance.amount);
  //const user = useSelector(state => state.user.user);
  const toast = useSelector((state) => state.app.toast);
  const documents = useSelector((state) => state.documents);
  const alert = useSelector((state) => state.alert);
  const statusdocument = useSelector((state) => state.docsStatus);

const getDocsMethod = () => {
    const idClient = user.idClient;
    const typePerson = idClient.type;
    const { appliance } = idClient;  
    let ciec = '';
    if (appliance.hasOwnProperty("idComercialInfo")) {
      const { idComercialInfo } = appliance[appliance.length - 1];
      ciec = idComercialInfo.ciec;
    }
    let docFiles = [];
    /**
     * [Dependiendo la persona le creamos los documentos]
     */
    switch (typePerson) {
      case "PF":
        docFiles = ["oficialID", "proofAddress", "bankStatements", "others"];
        break;
      case "PFAE":
        docFiles = [
          "oficialID",
          "rfc",
          "proofAddress",
          "bankStatements",
          "lastDeclarations",
          "acomplishOpinion",
          "others",
        ];
        break;
      case "RIF":
        docFiles = [
          "oficialID",
          "rfc",
          "proofAddress",
          "bankStatements",
          "lastDeclarations",
          "acomplishOpinion",
          "others",
        ];
        break;
      case "PM":
        docFiles = [
          "constitutiveAct",
          "rfc",
          "proofAddress",
          "financialStatements",
          "bankStatements",
          "lastDeclarations",
          "oficialID",
          "proofAddressMainFounders",
          "others",
        ];
        break;
      default:
        break;
    }
    if (ciec){
      if (typePerson === "PM"){
        docFiles = ["constitutiveAct","financialStatements","bankStatements","oficialID", "proofAddressMainFounders", "others"];
      } else if ( typePerson === "RIF" || typePerson === "PFAE") {
        docFiles = ["oficialID", "proofAddress", "others", "bankStatements"];
      }
    }
    return docFiles;
  };

  const onFormSubmit = async (e, finish) => {

    e.preventDefault();
    window.scrollTo(0, 0);
    dispatch(updateRefDocuments(false));
    dispatch(updateLoader(true));
    if (!toast.documents){
		  execToast("documents");
		  dispatch( updateToast(toast,"documents"));
    }
    const formData = new FormData();
    for (const typeDoc in documents){
		documents[typeDoc].forEach(doc => {			
			formData.append(typeDoc,doc);
		});
	}
	try {
		const idClient = user.idClient;
		if (idClient.appliance.length > 0){
			let update = false;
			const appliance = idClient.appliance[idClient.appliance.length - 1];
			if (appliance.hasOwnProperty("idDocuments")){
				update = true;
			}
			if (!update){
				const { data } = await axios.post(`api/documents/${user._id}`, formData, {
					headers:{
					'Content-Type': 'multipart/form-data'
					}	
				});
				if(!data.hasOwnProperty("error") && data.msg !== "Sin archivos"){
					sessionStorage.setItem('user', JSON.stringify(data.user));
				}
			} else {
				const idDocuments = appliance.idDocuments;
				const { data } = await axios.put(`api/documents/${idDocuments._id}`, formData, {
					headers:{
					'Content-Type': 'multipart/form-data'
					}	
				});
				if(!data.hasOwnProperty("error") && data.msg != "Sin archivos"){
					sessionStorage.setItem('user', JSON.stringify(data.user));
				}
			}
		}
		
	} catch(e){
		console.log(e);
	}
	const idClient = user.idClient;
	if (finish === true && idClient.appliance.length > 0){
		// Finalizar solicitud, igual a la función de appliance
		const appliance = idClient.appliance[idClient.appliance.length - 1];
		const applianceRequest = await axios.put(`api/appliance/${appliance._id}`, { status: true });
		if(!applianceRequest.data.hasOwnProperty("error")){
					sessionStorage.setItem('user', JSON.stringify(applianceRequest.data.user));
		}
		history.push('/credito/solicitud/'+appliance._id);
	} else {
		history.push('/credito');
	}
	dispatch(updateLoader(false));
  };

  const testDocumentsMethod = (array) => {
    let status = true;
    let requiredDocs = getDocsMethod();    
    for (const k in requiredDocs) {
      if (array[requiredDocs[k]].length <= 0) {
        status = false;
      }
    }
    if (requiredDocs.length <= 0) {
      status = false;
    }
    return status;
  };

  const testDocuments = (data = documents) => {
    let status = testDocumentsMethod(data);
    dispatch(updateDocumentsStatus(status));
  };

  useEffect(() => {
	  window.scrollTo(0, 0);
    if (!toast) {
      execToast("documents");
      dispatch(updateToast(app, "docs"));
    }    
	  const idClient = user.idClient;
    if (idClient.appliance.length > 0){
		const appliance = idClient.appliance[idClient.appliance.length - 1];
		if (appliance.hasOwnProperty("idDocuments")){
			const { 
				acomplishOpinion, bankStatements, constitutiveAct, 
				cventerprise, facturacion, financialStatements, 
				lastDeclarations, oficialID, otherActs, others, 
				proofAddress, proofAddressMainFounders, 
				rfc } = appliance.idDocuments;
			const currentDocuments = {
				acomplishOpinion, bankStatements, constitutiveAct, 
				cventerprise, facturacion, financialStatements, 
				lastDeclarations, oficialID, otherActs, others, 
				proofAddress, proofAddressMainFounders, 
				rfc
			}
      //let status = testDocumentsMethod(currentDocuments);
      //dispatch(updateDocumentsStatus(status));
			for (const key in currentDocuments){
				const files = currentDocuments[key];
				dispatch(updateAllDocs(files, key));
			};
       testDocuments(currentDocuments);
		}
	}
    dispatch(updateDocumentsNames(getDocsMethod()));
    

  }, []);

  let currentDocs = [];
  let isCompleteForm = statusdocument;

  if (appliance !== undefined && appliance.idDocuments !== undefined) {
    currentDocs = appliance.idDocuments;
    if (!statusdocument.isUpdate) {
      dispatch(updateDocumentsType(true, appliance.idDocuments.id));
      for (const key in documents) {
        if (appliance.idDocuments[key]) {
          dispatch(updateAllDocs(appliance.idDocuments[key], key));
        }
      }
    }
    if (appliance.idDocuments && testDocumentsMethod(appliance.idDocuments)) {
      isCompleteForm.status = true;
    }
  }

  return (
    <div className="container mt-3">
     <ToastContainer />
     <Loader />
      <DocumentsModal />
      <Steps />
      <div className="text-center mb-3">
        <Title
          title="Sube tus documentos"
          className="title-dp fz42"
        />
        <div className="brandonReg fz16 mt-3 mailto-content">
          Procura que la calidad sea óptima y legible en formato: <br></br>
          PNG, JPG, ZIP, PDF y/o FOTO en buena calidad según sea el caso (Peso
          máximo de 10MB por archivo). <br></br>
          Si lo prefieres, también puedes enviarnos tu documentación a{" "}
          <a href="mailto:documentos@distritopyme.com">
            documentos@distritopyme.com
          </a>
        </div>
      </div>
      {alert.status ? (
        <Alert variant="danger">
          Los siguiente archivos no se subieron: {alert.names}
        </Alert>
      ) : (
        ""
      )}

      <CustomModal
        modalName="documentsError"
        message="Error al subir los archivos. Favor de regresar a la pantalla de inicio y continúa tu solicitud."
      />
      <DocumentsForm
        docSelection={sessionStorage.getItem("type")}
        docs={documents}
        updateAllDocs={updateAllDocs}
        updateDocs={updateDocuments}
        testDocs={testDocuments}
        handleSubmit={onFormSubmit}
        updateAlertMsg={updateAlert}
        updateStatusDocs={updateDocumentsStatus}
        currentDocuments={currentDocs}
        statusDocs={isCompleteForm}
        statusComplete={appliance.status}
        setInitialValues={setInitialValues}
      />
    </div>
  );
};

export default Documents;
