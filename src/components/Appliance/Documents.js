import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Title from "../Generic/Title";
import CustomModal from "../Generic/CustomModal";
import DocumentsForm from "../../forms/DocumentsForm";
import { execToast } from "../../utils/ToastUtils";
import { Alert, Button } from "react-bootstrap";

// Components
import Steps from "./Steps";
import comparativeImage from "../../assets/img/comparativapopup-01.jpg";

import { updateLoader } from "../../redux/actions/loaderActions";
import { updateToast } from "../../redux/actions/appActions";
import {
  updateDocumentsStatus,
  updateDocumentsNames,
  updateDocumentsType,
} from "../../redux/actions/documentsStatusActions";
import { updateAllDocs, updateDocuments } from "../../redux/actions/documentsActions";
import { updateAlert } from '../../redux/actions/alertActions';
import { updateAppliance } from '../../redux/actions/applianceActions';
import axios from '../../utils/axios'

const Documents = (props) => {

  const { idAppliance } = useParams();

  const [show, setShow] = useState(true);
  const [data, setData] = useState(undefined); // Dato de prueba
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  const modal = useSelector((state) => state.modal.name);
  const appliance = useSelector((state) => state.appliance.appliance);
  const applianceAmount = useSelector((state) => state.appliance.amount);
  const applianceData = useSelector((state) => state.appliance);
  //const user = useSelector(state => state.user.user);
  const toast = useSelector((state) => state.app.toast.docs);
  const documents = useSelector((state) => state.documents);
  const alert = useSelector((state) => state.alert);
  const statusdocument = useSelector((state) => state.docsStatus);

  const onFormSubmitClose = async (e) => {
    onFormSubmit(e, true);
  };

  const onFormSubmitContinue = (e) => {
    onFormSubmit(e);
  };

  const onFormSubmit = async (e, finish) => {
    e.preventDefault();
    dispatch(updateLoader(true));
    const formData = new FormData();
    for (const typeDoc in documents){
		documents[typeDoc].forEach(doc => {
			console.log(typeDoc);
			formData.append(typeDoc,doc);
		});
	}
	try {
		const { data } = await axios.post(`api/documents/${user._id}`, formData, {
		headers:{
			'Content-Type': 'multipart/form-data'
			}	
		});
		if(!data.hasOwnProperty("error")){
			sessionStorage.setItem('user', JSON.stringify(data.user));
		}
	} catch(e){
		console.log(e);
	}
	if (finish === true){
		// Finalizar solicitud, igual a la función de appliance
	}
    /* try {
			let ans = await manager.assignFiles(this.props.documents);
			let variables = variablesManager.createDocumentsVariables(ans);

			variables.status =
				this.props.statusdocument.status && statusClose ? true : false;

			
			// Revisar si hay que actualizar o crear documentos
			

			let newDocs = {};
			let idDocument;
			if (this.props.statusdocument.isUpdate) {
				variables.documentId = this.props.statusdocument.id;
				newDocs = await this.props.updateDocumentsGraph({
					variables
				});
				idDocument = newDocs.data.updateDocuments.id;
			} else {
				newDocs = await this.props.createDocuments({
					variables
				});
				idDocument = newDocs.data.createDocuments.id;
			}

			let updatedAppliance = await this.props.updateApplianceGraph({
				variables: {
					idDocuments: idDocument,
					idAppliance: this.props.match.params.idAppliance
				}
			});
			this.props.updateAppliance(updatedAppliance.data.updateAppliance);
			this.props.updateLoader(false);
			this.props.history.push(
				`/credito/solicitud/${this.props.match.params.idAppliance}`
			);
			window.location.reload();
		} catch (err) {
			this.props.updateModal('documentsError');
			this.props.updateLoader(false);
			window.scrollTo(0, 0);
		} */
  };

  const getDocsMethod = () => {
    let typePerson = user.idClient[user.idClient.length - 1].type;
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
    return docFiles;
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
    dispatch(updateDocumentsNames(getDocsMethod()));
    testDocuments();
    /*    
    const getDocuments = async () => {
		const idClient = user.idClient[user.idClient - 1];
      console.log(idDocuments);
    }

    
    * */
    

  }, []);

  //let appliance = data.getAppliance;
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
      {show && (
        <div className="modal-comparative">
          <div className="modal-comparative--content">
            <img src={comparativeImage} className="modal-comparative--image" alt="Comparativo de imagenes en buena calidad" />
            <Button variant="success" block onClick={() => setShow(false)}>
              Entiendo{" "}
            </Button>
          </div>
        </div>
      )}
      <Steps />
      <div className="text-center mb-3">
        <Title
          title="Sube tus documentos"
          className="coolvetica fz42 blackBlue"
        />
        <div className="brandonReg fz16 mt-3 mailto-content">
          Procura que la calidad sea óptima y legible en formato: <br></br>
          PNG, JPG, ZIP, PDF y/o FOTO en buena calidad según sea el caso (Peso
          máximo de 1MB por archivo). <br></br>
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
      />
    </div>
  );
};

export default Documents;
