import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import clip from "../assets/img/clip-copy-2@3x.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../css/dnd.css";
import { array } from "prop-types";

// Components
import FileInput from "../components/Generic/FileInput";

import { updateLoader } from '../redux/actions/loaderActions';

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

  let fileHandler = async (component, key, e) => {
    let value;
    let limitSize = 1000000; // 1 MB
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
            `${filesNotUploaded.names.toString()} - El peso de la imágen debe ser menor o igual a 1MB`
          )
        );
      } else {
        dispatch(updateLoader(true));
        console.log("Value: File handler");
        console.log(value);
        const api = "https://api.ocr.space/parse/image";
        const formData = new FormData();
        formData.append("file", value[0]);
        formData.append("language", "spa");
        formData.append("isOverlayRequired", false);
        formData.append("iscreatesearchablepdf", false);
        formData.append("issearchablepdfhidetextlayer", false);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            apikey: "891950076088957",
          },
        };
        try {
          const res = await axios.post(api, formData, config);
          if (!!res.data.ErrorMessage) {
            console.log(res.data.ErrorMessage[0]);
          } else {
            const {
              data: { OCRExitCode, ParsedResults },
            } = res;
            const { ParsedText, FileParseExitCode } = ParsedResults[0];
            if (
              OCRExitCode === 1 &&
              FileParseExitCode === 1
            ) {
              setValidFiles([...validFiles, true]);
            } else {
              setValidFiles([...validFiles, false]);
              filesNotUploaded.names.push(value[i].name);
              filesNotUploaded.keys.push(i);
              dispatch(
                props.updateAlertMsg(
                  true,
                  `${filesNotUploaded.names.toString()} - La calidad del documento/imagen no es suficiente`
                )
              );
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    dispatch(updateLoader(false));

    for (let j = 0; j < filesNotUploaded.keys.length; j++) {
      value.splice(filesNotUploaded.keys[j] - j, 1);
    }

    setFileToKey(key, value);
    if (filesNotUploaded.names.length > 0) {
      setTimeout(() => {
        dispatch(props.updateAlertMsg(false, ""));
      }, 10000);
    }
  };

  let statusDocs = (status) => {
    dispatch(props.updateStatusDocs(status));
  };

  let setFileToKey = (key, file) => {
    dispatch(props.updateDocs(file, key));
    props.testDocs();
  };

  let deleteChip = (index, key) => {
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
    props.testDocs();
    dispatch(props.updateAllDocs(arr));
  };

  let empty = () => {
    let flag = true;

    submitButtom.current.click();
  };
  let typePerson = "PF"; // sessionStorage.getItem('type');
  let docFiles = [];
  /**
   * [Dependiendo la persona le creamos los documentos]
   */
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
          title: "Comprobante de domicilio particular y del negocio",
          subtitle: "(Antigüedad no mayor a 3 meses. Luz, Agua, Gas, Teléfono)",
          name: "proofAddress",
          files: props.docs.proofAddress,
          refs: proofAddress,
        },
        {
          title: "Estados financiero",
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
    default:
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
          title: "Comprobante de domicilio particular y del negocio",
          subtitle: "(Antigüedad no mayor a 3 meses. Luz, Agua, Gas, Teléfono)",
          name: "proofAddress",
          files: props.docs.proofAddress,
          refs: proofAddress,
        },
        {
          title: "Estados financiero",
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
  const [errorFiles, setErrorFiles] = useState([]);

  return (
    <div>
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
              className="reduce-font mt-50 btn-blue-general ml-2"
            >
              Guardar y Enviar Solicitud
            </Button>
          )}
          <Button type="submit" className="d-none" ref={submitButtom} />
        </div>
      </form>
    </div>
  );
};

export default DocumentsForm;
