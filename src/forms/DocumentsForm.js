import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import clip from "../assets/img/clip-copy-2@3x.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import axiosLocal from '../utils/axios';
import "../css/dnd.css";
import { array } from "prop-types";
import PopUp from "./PopUp";

// Components
import FileInput from "../components/Generic/FileInput";

import { updateLoader } from "../redux/actions/loaderActions";

let DocumentsForm = (props) => {
  const dispatch = useDispatch();

  const refOficialId = React.createRef();
  const proofAddress = React.createRef();
  const bankStatements = React.createRef();
  const others = React.createRef();
  const otherActs = React.createRef();
  const constitutiveAct = React.createRef();
  const financialStatements = React.createRef();
  const rfc = React.createRef();
  const submitButtom = React.createRef();
  const lastDeclarations = React.createRef();
  const acomplishOpinion = React.createRef();
  const cventerprise = React.createRef();
  const proofAddressMainFounders = React.createRef();

  const { handleSubmit } = props;
  const [validFiles, setValidFiles] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const [currentDocuments, setCurrentDocuments] = useState({});
  const [show, setShow] = useState(true);

  let fileHandler = async (component, key, e) => {
    dispatch(updateLoader(true));
    let value;
    let limitSize = 10000000; // 10 MB

    let filesNotUploaded = { names: [], keys: [] };
    value = component === "drag" ? e : e.target.files;
    value = Array.from(value);
    for (let i = 0; i < value.length; i++) {
      if (value[i].size > limitSize) {
        filesNotUploaded.names.push(value[i].name);
        filesNotUploaded.keys.push(i);
        dispatch(
          props.updateAlertMsg(
            true,
            `${filesNotUploaded.names.toString()} - El peso de la imágen debe ser menor o igual a 10 MB`
          )
        );
      }
    }

    for (let j = 0; j < filesNotUploaded.keys.length; j++) {
      value.splice(filesNotUploaded.keys[j] - j, 1);
    }

    setFileToKey(key, value);

    if (filesNotUploaded.names.length > 0) {
      setTimeout(() => {
        dispatch(props.updateAlertMsg(false, ""));
      }, 25000);
    }
    dispatch(updateLoader(false));
  };

  let statusDocs = (status) => {
    dispatch(props.updateStatusDocs(status));
  };

  let setFileToKey = (key, file) => {
    dispatch(props.updateDocs(file, key));
    props.testDocs();
  };

  let deleteChip = async (index, key, typeDoc) => {
    // key == url
    dispatch(updateLoader(true));
    let arr = [];
    if (key.includes("https")) {
      let arrInt = props.docs;
      for (const k in arrInt) {
        if (arrInt[k].length > 0 && arrInt[k].indexOf(key) !== -1) {
          arr = arrInt[k];
          arr.splice(index, 1);
          break;
        }
      }
    } else {
      arr = props.docs[key];
      arr.splice(index, 1);
    }
    // Delete file 
    const user = JSON.parse(sessionStorage.getItem("user"));
    const idClient = user.idClient[user.idClient.length - 1];
    if (idClient.appliance.length > 0){
      const appliance = idClient.appliance[idClient.appliance.length - 1];
      const idDocuments = appliance.idDocuments[appliance.idDocuments.length - 1];
      const res = await axiosLocal.delete(`api/documents/${idDocuments._id}`, {
        data: {
          url: key,
          name: typeDoc
        }
      })
      const data = res.data;
      if(!data.hasOwnProperty("error") && data.msg != "Sin archivos") {
          sessionStorage.setItem('user', JSON.stringify(data.user));
      }
    }
    props.testDocs();
    dispatch(props.updateAllDocs(arr, key));
    dispatch(updateLoader(false));
  };

  let empty = () => {
    let flag = true;

    submitButtom.current.click();
  };
  const user = JSON.parse(sessionStorage.getItem("user"));
  const idClient = user.idClient[user.idClient.length - 1];
  const typePerson = idClient.type;
  const appliance = idClient.appliance[idClient.appliance.length - 1];
  const comercialInfo =
    appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
  const ciec = comercialInfo.ciec;

  let docFiles = [];
  switch (typePerson) {
    case "PF":
      docFiles = [
        {
          title: "Identificación oficial",
          subtitle:
            "(INE, Pasaporte, Cédula Profesional o Documento Migratorio)",
          name: "oficialID",
          files: props.docs.oficialID,
          refs: refOficialId,
        },
        {
          title: "Comprobante de domicilio particular y del negocio",
          subtitle: "(Antigüedad no mayor a 3 meses. Luz, Agua, Gas, Teléfono)",
          name: "proofAddress",
          files: props.docs.proofAddress,
          refs: proofAddress,
        },
        {
          title: "Estados de cuenta bancarios",
          subtitle: "(Documento completo, mínimo 6 meses)",
          name: "bankStatements",
          files: props.docs.bankStatements,
          refs: bankStatements,
        },
        {
          title: "Otros",
          subtitle: "(Fotos, notas de venta u otros comprobantes de ingreso)",
          name: "others",
          files: props.docs.others,
          refs: others,
        },
      ];
      break;
    case "PFAE":
      docFiles = [
        {
          title: "Identificación oficial",
          subtitle:
            "(INE, Pasaporte, Cédula Profesional o Documento Migratorio)",
          name: "oficialID",
          files: props.docs.oficialID,
          refs: refOficialId,
        },
        {
          title: "RFC",
          subtitle: "(Constancia de situación fiscal)",
          name: "rfc",
          files: props.docs.rfc,
          refs: rfc,
        },
        {
          title: "Comprobante de domicilio particular y del negocio",
          subtitle: "(Antigüedad no mayor a 3 meses. Luz, Agua, Gas, Teléfono)",
          name: "proofAddress",
          files: props.docs.proofAddress,
          refs: proofAddress,
        },
        {
          title: "Estados de cuenta bancarios",
          subtitle:
            "(Documento completo con todas las hojas que contenga, mínimo 6 meses)",
          name: "bankStatements",
          files: props.docs.bankStatements,
          refs: bankStatements,
        },
        {
          title: "Última declaración de impuestos presentada",
          name: "lastDeclarations",
          files: props.docs.lastDeclarations,
          refs: lastDeclarations,
        },
        {
          title: "Opinión de cumplimiento",
          name: "acomplishOpinion",
          files: props.docs.acomplishOpinion,
          refs: acomplishOpinion,
        },
        {
          title: "Otros",
          subtitle: "(Fotos, notas de venta u otros comprobantes de ingreso)",
          name: "others",
          files: props.docs.others,
          refs: others,
        },
      ];
      break;
    case "RIF":
      docFiles = [
        {
          title: "Identificación oficial",
          subtitle:
            "(INE, Pasaporte, Cédula Profesional o Documento Migratorio)",
          name: "oficialID",
          files: props.docs.oficialID,
          refs: refOficialId,
        },
        {
          title: "RFC",
          subtitle: "(Constancia de situación fiscal)",
          name: "rfc",
          files: props.docs.rfc,
          refs: rfc,
        },
        {
          title: "Comprobante de domicilio particular y del negocio",
          subtitle: "(Antigüedad no mayor a 3 meses. Luz, Agua, Gas, Teléfono)",
          name: "proofAddress",
          files: props.docs.proofAddress,
          refs: proofAddress,
        },
        {
          title: "Estados de cuenta bancarios",
          subtitle:
            "(Documento completo con todas las hojas que contenga, mínimo 6 meses)",
          name: "bankStatements",
          files: props.docs.bankStatements,
          refs: bankStatements,
        },
        {
          title: "Última declaración de impuestos presentada",
          name: "lastDeclarations",
          files: props.docs.lastDeclarations,
          refs: lastDeclarations,
        },
        {
          title: "Opinión de cumplimiento",
          name: "acomplishOpinion",
          files: props.docs.acomplishOpinion,
          refs: acomplishOpinion,
        },
        {
          title: "Fotos de tu empresa o negocio u otros",
          name: "others",
          files: props.docs.others,
          refs: others,
        },
      ];
      break;
    case "PM":
      docFiles = [
        {
          title: "Acta constitutiva, asamblea y poderes",
          name: "constitutiveAct",
          files: props.docs.constitutiveAct,
          refs: constitutiveAct,
        },
        {
          title: "RFC",
          subtitle: "(Constancia de situación fiscal)",
          name: "rfc",
          files: props.docs.rfc,
          refs: rfc,
        },
        {
          title: "Estados financieros",
          subtitle:
            " (Últimos 3 ejercicios completos y parcial del año en curso con relaciones analíticas)",
          name: "financialStatements",
          files: props.docs.financialStatements,
          refs: financialStatements,
        },
        {
          title: "Estados de cuenta bancarios",
          subtitle:
            "(Documento completo con todas las hojas que contenga, mínimo 6 meses)",
          name: "bankStatements",
          files: props.docs.bankStatements,
          refs: bankStatements,
        },
        {
          title: "Declaraciones anuales de los dos últimos años",
          name: "lastDeclarations",
          files: props.docs.lastDeclarations,
          refs: lastDeclarations,
        },
        {
          title:
            "Identificación de representante legal y principales accionistas",
          name: "oficialID",
          files: props.docs.oficialID,
          refs: refOficialId,
        },
        {
          title:
            "Comprobante de domicilio del negocio y particular del representante legal y principales accionistas",
          name: "proofAddressMainFounders",
          files: props.docs.proofAddressMainFounders,
          refs: proofAddressMainFounders,
        },
        {
          title: "Fotos de tu empresa o negocio u otros",
          name: "others",
          files: props.docs.others,
          refs: others,
        },
      ];
      break;
  }
  let currDocs = props.currentDocuments;

  const filterDocs = ["oficialID", "proofAddress", "others", "bankStatements"];
  const filterDocsPM = ["constitutiveAct","financialStatements","bankStatements","oficialID", "proofAddressMainFounders", "others"]

  if ((typePerson === "RIF" || typePerson === "PFAE") && ciec) {
    docFiles = docFiles.filter((doc) => filterDocs.includes(doc.name));
  }
  if (typePerson === "PM" && ciec) {
    docFiles = docFiles.filter((doc) => filterDocsPM.includes(doc.name));
  }

  return (
    <div>
      {idClient.type !== "PF" && (ciec == "" || ciec == null) && (
        <PopUp
          show={show}
          setShow={(value) => setShow(value)}
          isDocuments={true}
        />
      )}
      <form className="ml-auto mr-auto" style={{ maxWidth: "690px" }}>
        {docFiles.map((d, i) => {
          return (
            <div key={`div-file-input-${i}`}>
              <FileInput
                title={d.title}
                subtitle={d.subtitle}
                name={d.name}
                fileMethod={fileHandler}
                nombre={d.name}
                refs={d.refs}
                image={clip}
                files={d.files}
                deleteFile={deleteChip}
                key={`file-input-${i}`}
              />
              <span>{errorFiles[i]}</span>
            </div>
          );
        })}

        <p className="my-2 text-center opacity-75 fz12">
          Al registrarme en www.distritopyme.com autoricé a Distrito Pyme poder
          compartir mi información<br></br> con diferentes instituciones
          financieras para recibir ofertas de crédito para mi empresa o negocio.
        </p>
        <div
          className="d-flex align-items-center justify-content-end"
          style={{ marginBottom: "50px" }}
        >
          {props.statusComplete === true ? (
            <div></div>
          ) : (
            <Button
              type="button"
              onClick={async (e) => {
                handleSubmit(e, false);
              }}
              className="reduce-font mt-50 btn-blue-general"
            >
              Guardar
            </Button>
          )}
          {props.statusDocs.status && (
            <Button
              type="button"
              onClick={(e) => {
                handleSubmit(e, true);
              }}
              className="reduce-font mt-50 btn-blue-general btn-blue-send-documents ml-2"
            >
              Guardar y Enviar Solicitud
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DocumentsForm;
