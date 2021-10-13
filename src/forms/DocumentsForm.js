import React, { createRef, useState } from 'react';
import { withFormik, Form } from 'formik';
import clip from "../assets/img/clip-copy-2@3x.png";
import { FieldDoc } from "../components/Generic/DocInput";
import { Alert, Button } from 'react-bootstrap';
import PopUp from "./PopUp";
import axiosLocal from "../utils/axios";
import { useDispatch } from "react-redux";
import { updateLoader } from "../redux/actions/loaderActions";
// import validationsDocsForm2 from './validationsDocsForm2';

const DocumentsForm = (props) => {
    const [errorDocs, setErrorDocs] = useState({
        files: [],
        show : false
    })
    const refOficialId = createRef();
    const proofAddress = createRef();
    const bankStatements = createRef();
    const others = createRef();
    //const otherActs = createRef();
    const constitutiveAct = createRef();
    const financialStatements = createRef();
    const rfc = createRef();
    //const submitButtom = createRef();
    const lastDeclarations = createRef();
    // const acomplishOpinion = createRef();
    //const cventerprise = createRef();
    const proofAddressMainFounders = createRef();
    const collectionReportSaleTerminals = createRef();
    const localContractLease = createRef();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const idClient = user.idClient;
    const typePerson = idClient.type;
    const appliance = idClient.appliance[0];
    const comercialInfo = appliance.idComercialInfo;
    const ciec = comercialInfo.ciec;
    const tpv = comercialInfo.terminal;

    const [show, setShow] = useState(true);
    const dispatch = useDispatch();

    let docFiles = [];
    switch (typePerson) {
      case "PF":
        docFiles = [
          {
            title: "Identificación oficial",
            subtitle: "(INE, Pasaporte, Cédula Profesional o Documento Migratorio)",
            name: "oficialID",
            refs: refOficialId,
          },
          {
            title: "Comprobante de domicilio particular y del negocio",
            subtitle: "(Antigüedad no mayor a 3 meses. Luz, Agua, Gas, Teléfono)",
            name: "proofAddress",
            refs: proofAddress,
          },
          {
            title: "Estados de cuenta bancarios",
            subtitle: "(Documento completo, mínimo 6 meses, ideal 12 meses)",
            name: "bankStatements",
            refs: bankStatements,
          },
          {
            title: "Otros",
            subtitle: "(Fotos, notas de venta u otros comprobantes de ingreso)",
            name: "others",
            refs: others,
          }
        ];
        break;
      case "PFAE":
      case "RIF":
        docFiles = [
          {
            title: "Identificación oficial",
            subtitle: "INE, Pasaporte, Cédula Profesional o Documento Migratorio)",
            name: "oficialID",
            refs: refOficialId,
          },
          {
            title: "RFC",
            subtitle: "(Constancia de situación fiscal)",
            name: "rfc",
            refs: rfc,
          },
          {
            title: "Comprobante de domicilio particular y del negocio",
            subtitle: "(Antigüedad no mayor a 3 meses. Luz, Agua, Gas, Teléfono)",
            name: "proofAddress",
            refs: proofAddress,
          },
          {
            title: "Estados de cuenta bancarios",
            subtitle: "(Documento completo con todas las hojas que contenga, mínimo 6 meses, ideal 12 meses)",
            name: "bankStatements",
            refs: bankStatements,
          },
          {
            title: "Última declaración de impuestos presentada",
            name: "lastDeclarations",
            refs: lastDeclarations,
          },
          // {
          //   title: "Opinión de cumplimiento",
          //   name: "acomplishOpinion",
          //   refs: acomplishOpinion,
          // },
          {
            title: "Fotos de tu empresa o negocio u otros",
            name: "others",
            refs: others,
          },
        ];
        break;
      default:
        docFiles = [
          {
            title: "Acta constitutiva, asamblea y poderes",
            name: "constitutiveAct",
            refs: constitutiveAct,
          },
          {
            title: "RFC",
            subtitle: "(Constancia de situación fiscal)",
            name: "rfc",
            refs: rfc,
          },
          {
            title: "Estados financieros",
            subtitle: "(Últimos 3 ejercicios completos y parcial del año en curso con relaciones analíticas)",
            name: "financialStatements",
            refs: financialStatements,
          },
          {
            title: "Estados de cuenta bancarios",
            subtitle: "(Documento completo con todas las hojas que contenga, mínimo 6 meses, ideal 12 meses)",
            name: "bankStatements",
            refs: bankStatements,
          },
          {
            title: "Declaraciones anuales de los dos últimos años",
            name: "lastDeclarations",
            refs: lastDeclarations,
          },
          {
            title:
              "Identificación de representante legal y principales accionistas",
            name: "oficialID",
            refs: refOficialId,
          },
          {
            title:
              "Comprobante de domicilio del negocio y particular del representante legal y principales accionistas",
            name: "proofAddressMainFounders",
            refs: proofAddressMainFounders,
          },
          {
            title: "Fotos de tu empresa o negocio u otros",
            name: "others",
            refs: others,
          },
        ];
        break;
    }
  
    const filterDocs = [//RIF, PFAE
      "oficialID", 
      "proofAddress", 
      "bankStatements",
      "others"
    ];
  
    const filterDocsPM = [
      "constitutiveAct",
      "financialStatements",
      "bankStatements",
      "oficialID",
      "proofAddressMainFounders",
      "others",
    ];
  
    if ((typePerson === "RIF" || typePerson === "PFAE") && ciec) {
      docFiles = docFiles.filter((doc) => filterDocs.includes(doc.name));
    }
  
    if (typePerson === "PM" && ciec) {
      docFiles = docFiles.filter((doc) => filterDocsPM.includes(doc.name));
    }
  
    if (tpv) {
      docFiles.push({
        title: "Reporte de cobranza de las terminales punto de venta (12 meses)",
        subtitle: "",
        name: "collectionReportSaleTerminals",
        refs: collectionReportSaleTerminals,
      },
      {
        title: "Contrato de arrendamiento vigente de tu local",
        subtitle: "",
        name: "localContractLease",
        refs: localContractLease,
      })
    }

    const fileHandler = async (component, key, e) => {
        let value;
        let limitSize = 10000000; //10MB

        let filesNotUploaded = [];
        value = (component === "drag" ? e : e.target.files);
        value = Array.from(value);
        for (let i = 0; i < value.length; i++) {
            if (value[i].size > limitSize) {
                filesNotUploaded.push(value[i].name);
            }
            else{
                props.values[key].push(value[i]);
                props.setValues(props.values);
            }
        }

        if(filesNotUploaded.length > 0){
            setErrorDocs({
                files: filesNotUploaded,
                show: true
            })
            setTimeout(() => {
                setErrorDocs({
                    files: [],
                    show: false
                })
            }, 25000);
        }

        for (let nd = 0; nd < (docFiles.length); nd++) {
            let complete = false;
            if(props.values[docFiles[nd].name].length > 0){
                complete = true;
            }
            props.values.status = complete;
        }
    };

    const deleteChip = async(index, key) => {
        if(props.values[key][index].name == undefined){
            dispatch(updateLoader(true));
            const res = await axiosLocal.delete(`api/documents/${appliance.idDocuments._id}`, {
                    data: {
                        url: props.values[key][index],
                        name: key,
                    },
                });
            const data = res.data;
    
            if(!data.hasOwnProperty("error") && data.msg !== "Sin archivos"){
                sessionStorage.setItem("user", JSON.stringify(data.user));
                let user = JSON.parse(sessionStorage.getItem("user"));
                props.setUser(user);
                let docs = props.values[key];
                docs.splice(index, 1);
                props.values[key] = docs;
                props.setValues({...props.initialValues, [key] : docs, status : user.idClient.appliance[0].idDocuments.status});
            }
            dispatch(updateLoader(false));
        }
        else{
            props.values[key].splice(index, 1);
            props.setValues(props.values);

            for (let nd = 0; nd < (docFiles.length); nd++) {
                let complete = false;
                if(props.values[docFiles[nd].name].length > 0){
                    complete = true;
                }
                props.values.status = complete;
            }
        }
    };

    return(
        <>
        {
            errorDocs.show && 
            <Alert variant="danger">
                Los siguiente archivos pesan más de 10MB y fueron descartados:
                <ul> 
                {
                    errorDocs.files.map((d, i) => {
                        return <li key={i}><strong>{d}</strong></li>
                    })
                }
                </ul>
            </Alert>
        }
        {
            idClient.type !== "PF" && (ciec == "" || ciec == null) && (
                <PopUp
                show={show}
                setShow={(value) => setShow(value)}
                isDocuments={true}
                />
            )
        }
        <Form className="ml-auto mr-auto docs" style={{ maxWidth: "690px" }}>
            {docFiles.map((d, i) => {
                return (
                    <div key={`div-file-input-${i}`}>
                    <FieldDoc
                        title={d.title}
                        subtitle={d.subtitle}
                        name={d.name}
                        fileMethod={fileHandler}
                        refs={d.refs}
                        image={clip}
                        files={props.initialValues[d.name]}
                        deleteFile={deleteChip}
                        key={`file-input-${i}`}
                    />
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
                {!props.values.status && (
                <Button
                    type="submit"
                    className="reduce-font mt-50 btn-blue-general"
                    style={{ width: '250px' }}
                >
                    Guardar
                </Button>
                )}
                {props.values.status && (
                <Button
                    type="submit"
                    className="reduce-font mt-50 btn-blue-general btn-blue-send-documents ml-2"
                    style={{ width: '265px' }}
                >
                    Guardar y Enviar Solicitud
                </Button>
                )}
            </div>
        </Form>
        </>
    );
};

export default withFormik({
    mapPropsToValues({initialValues}){
        return initialValues;
    },
    //validate: validationsDocsForm2, 
    handleSubmit(values, formikBag){
        formikBag.props.handleSubmit(values);
    },
    enableReinitialize: true,
    displayName: 'DocumentsForm'
})(DocumentsForm);