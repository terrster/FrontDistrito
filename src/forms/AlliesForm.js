import React, { useEffect, createRef, useState } from 'react';
import { withFormik, Form, ErrorMessage , Field} from 'formik';
import clip from "../assets/img/clip-copy-2@3x.png";
import { FieldDoc } from "../components/Generic/DocInput";
import { FieldText, FieldCheck, FieldTextArea } from '../components/Generic/Fields';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import Title from "../components/Generic/Title";
import SubtitleFrom from "../components/Generic/SubtitleForm";
import AlliesValidations from '../components/Validate/alliesValidations';
import scroll from "../utils/scroll";

const AlliesForm = (props) => {
    const [errorDocsBySize, setErrorDocsBySize] = useState({
        files: [],
        show : false
    });
    const [errorDocs, setErrorDocs] = useState(false);
    const refAttachments = createRef();

    const fileHandler = async (component, key, e) => {
        let value;
        let limitSize = 10000000; //10MB

        let filesNotUploadedBySize = [];
        let filesNotUploaded = false;
        value = (component === "drag" ? e : e.target.files);
        value = Array.from(value);
        for (let i = 0; i < value.length; i++) {
            if (value[i].size > limitSize) {
                filesNotUploadedBySize.push(value[i].name);
            }
            else{
                if(props.values[key].length === 0){
                    props.values[key].push(value[i]);
                    props.setValues(props.values);
                }
                else{
                    filesNotUploaded = true;
                }
            }
        }

        if(filesNotUploadedBySize.length > 0){
            setErrorDocsBySize({
                files: filesNotUploadedBySize,
                show: true
            })
            setTimeout(() => {
                setErrorDocsBySize({
                    files: [],
                    show: false
                })
            }, 3500);
        }

        if(filesNotUploaded){
            setErrorDocs(true)
            setTimeout(() => {
                setErrorDocs(false)
            }, 3500);
        }
    };

    const deleteChip = (index, key) => {
        props.values[key].splice(index, 1);
        props.setValues(props.values);
    };

    useEffect(() => {
        if(!props.values.typeCredit.otro){
            props.setFieldValue('typeCredit.otroTxt', '');
        }
    }, [props.values.typeCredit.otro]);

    const goToError = () => {
        const nameMainContactError = document.getElementById("nameMainContact-error");
        const allieNameError = document.getElementById("allieName-error");
        const businessNameError = document.getElementById("businessName-error");
        const leadEmailError = document.getElementById("leadEmail-error");
        const typeCreditError = document.getElementById("typeCredit-error");
        const taxRegimeError = document.getElementById("taxRegime-error");
        const annualSalesError = document.getElementById("annualSales-error");
        const sinceError = document.getElementById("since-error");
        const untilError = document.getElementById("until-error");
        const salesError = document.getElementById("sales-error");
        // const averageRateError = document.getElementById("averageRate-error");
        // const deadlineError = document.getElementById("deadline-error");
        // const openingExpensesError = document.getElementById("openingExpenses-error");
        const antiquityError = document.getElementById("antiquity-error");
        const flexibilityCreditBureauError = document.getElementById("flexibilityCreditBureau-error");
        const scoreError = document.getElementById("score-error");
        const ciecError = document.getElementById("ciec-error");
        const warrantyError = document.getElementById("warranty-error");
        const useOfCreditError = document.getElementById("useOfCredit-error");
        const logoError = document.getElementById("logo-error");
        
        const errors = [
            nameMainContactError,
            allieNameError,
            businessNameError,
            leadEmailError,
            typeCreditError,
            taxRegimeError,
            annualSalesError,
            sinceError,
            untilError,
            salesError,
            // averageRateError,
            // deadlineError,
            // openingExpensesError,
            antiquityError,
            flexibilityCreditBureauError,
            scoreError,
            ciecError,
            warrantyError,
            useOfCreditError,
            logoError
        ];
        for (let x = 0; x < errors.length; x++) {
          if (errors[x] != null) {
            scroll(errors[x].id);
            break;
          }
        }
    }

	return (
		<Form className="pt-3 pl-5 pr-5 pb-3">
            <Title title="Información General" className="title-dp fz25 fw300 mb-2 text-center"/>

            <Row>
                <Col lg={4}>
                    <FieldText name="nameMainContact" placeholder="Nombre de contacto principal" className="forceFullWidth"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="allieName" placeholder="Nombre Alianza" className="forceFullWidth"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="businessName" placeholder="Razón Social" className="forceFullWidth"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="Correos electrónicos donde llegarán los leads" className="fz20 mb-2 alternative"/>

            <Row>
                <Col lg={4}>
                    <FieldText name="leadEmail.primary" placeholder="Correo electrónico" normalize="onlyEmailWithoutSpace" className="forceFullWidth"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="leadEmail.secondary" placeholder="Correo electrónico" normalize="onlyEmailWithoutSpace" className="forceFullWidth"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="leadEmail.tertiary" placeholder="Correo electrónico" normalize="onlyEmailWithoutSpace" className="forceFullWidth"/>
                </Col>
                <Col>
                    <ErrorMessage name="leadEmail" render={msg => <div id="leadEmail-error" className="error mt-1">{msg}</div>}/>
                </Col>
            </Row>

            <Title title="Variables de Crédito" className="title-dp fz25 fw300 mb-2 text-center"/>

            <div className="subtitle form fz20 mb-2 alternative">
                Tipo de crédito que ofreces <small>(elige uno o más)</small>
            </div>

            <Row>
                <Col lg={2}>
                    <FieldCheck name="typeCredit.simple" label="Simple"/>
                </Col>
                <Col lg={2}>
                    <FieldCheck name="typeCredit.revolvente" label="Revolvente"/>
                </Col>
                <Col lg={2}>
                    <FieldCheck name="typeCredit.factoraje" label="Factoraje"/>
                </Col>
                <Col lg={2}>
                    <FieldCheck name="typeCredit.arrendamiento" label="Arrendamiento"/>
                </Col>
                <Col lg={2}>
                    <FieldCheck name="typeCredit.leaseBack" label="Lease Back"/>
                </Col>
                <Col lg={1}>
                    <FieldCheck name="typeCredit.puente" label="Puente"/>
                </Col>
                <Col lg={1}>
                    <FieldCheck name="typeCredit.otro" label="Otro"/>
                </Col>
                {
                    props.values.typeCredit.otro && 

                    <Col lg={12}>
                        <FieldText name="typeCredit.otroTxt" placeholder="Indica cuál es el tipo de crédito que ofreces" className="forceFullWidth"/>
                    </Col>
                }
                <Col>
                    <ErrorMessage name="typeCredit" render={msg => <div id="typeCredit-error"  className="error mt-1">{msg}</div>}/>
                </Col>
            </Row>

            <div className="subtitle form fz20 mb-2 alternative">
                Régimen fiscal aceptado <small>(elige uno o más)</small>
            </div>

            <Row>
                <Col lg={2}>
                    <FieldCheck name="taxRegime.sinAlta" label="Sin alta en el SAT"/>
                </Col>
                <Col lg={4}>
                    <FieldCheck name="taxRegime.RIF" label="Régimen de incorporación fiscal"/>
                </Col>
                <Col lg={4}>
                    <FieldCheck name="taxRegime.PFAE" label="Persona Física con Actividad Empresarial"/>
                </Col>
                <Col lg={2}>
                    <FieldCheck name="taxRegime.PM" label="Persona Moral"/>
                </Col>
                <Col>
                    <ErrorMessage name="taxRegime" render={msg => <div id="taxRegime-error" className="error mt-1">{msg}</div>}/>
                </Col>
            </Row>

            <Title title="Datos financieros" className="title-dp fz25 fw300 mb-2 text-center"/>

            <Row>
                <Col lg={4}>
                    <FieldText name="annualSales" placeholder="Ventas anuales mínimas aceptadas" normalize="onlyNumbers" className="forceFullWidth"/>
                </Col>
                {/* <Col lg={4}>
                    <FieldText name="requestedAmountRange" placeholder="Rango de monto solicitado" labelFooter="(de $ hasta $)" className="forceFullWidth"/>
                </Col> */}
                <Col lg={2}>
                    <FieldText name="since" placeholder="Créditos desde $" normalize="onlyNumbers" className="forceFullWidth"/>
                </Col>
                <Col lg={2}>
                    <FieldText name="until" placeholder="Créditos hasta $" normalize="onlyNumbers" className="forceFullWidth"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="sales" placeholder="Monto/Ventas" normalize="onlyNumbers" labelFooter="(Porcentaje de ventas al que se podría acceder en crédito)" className="forceFullWidth"/>
                </Col>
            </Row>

            <Row>
                <Col lg={4}>
                    <FieldText name="averageRate" placeholder="Tasa promedio" normalize="onlyNumbers" className="forceFullWidth"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="deadline" placeholder="Plazo máximo (en meses)" normalize="onlyNumbers" className="forceFullWidth"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="openingExpenses" placeholder="Gastos por apertura" normalize="onlyNumbers" className="forceFullWidth"/>
                </Col>
            </Row>

            <SubtitleFrom id="antiquity-radio-group" subtitle="Antigüedad mínima aceptada" className="fz20 mb-2 alternative"/>

            
            <div role="group" aria-labelledby="antiquity-radio-group" className="form-group">
                <Row>
                    <Col lg={3}>
                        <label>
                            <Field type="radio" name="antiquity" value="LESS6"/>
                            &nbsp;Menos de 6 meses
                        </label>
                    </Col>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="antiquity" value="ONE"/>
                            &nbsp;1 año
                        </label>
                    </Col>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="antiquity" value="TWO"/>
                            &nbsp;2 años
                        </label>
                    </Col>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="antiquity" value="THREE"/>
                            &nbsp;3 años
                        </label>
                    </Col>
                    <Col lg={3}>
                        <label>
                            <Field type="radio" name="antiquity" value="PFOUR"/>
                            &nbsp;4 años o más
                        </label>
                    </Col>
                    <Col>
                        <ErrorMessage name="antiquity" render={msg => <div id="antiquity-error" className="error mt-1">{msg}</div>}/>
                    </Col>
                </Row>
            </div>

            <SubtitleFrom id="flexibilityCreditBureau-radio-group" subtitle="Flexibilidad en Buró de Crédito" className="fz20 mb-2 alternative"/>

            <div role="group" aria-labelledby="flexibilityCreditBureau-radio-group" className="form-group">
                <Row>
                    <Col lg={6}>
                        <Row>
                            <Col lg={4}>
                                <label>
                                    <Field type="radio" name="flexibilityCreditBureau" value="LITTLE"/>
                                    &nbsp;Poca flexibilidad
                                </label>
                            </Col>
                            <Col lg={4}>
                                <label>
                                    <Field type="radio" name="flexibilityCreditBureau" value="MEDIUM"/>
                                    &nbsp;Media flexibilidad
                                </label>
                            </Col>
                            <Col lg={4}>
                                <label>
                                    <Field type="radio" name="flexibilityCreditBureau" value="HIGH"/>
                                    &nbsp;Alta flexibilidad
                                </label>
                            </Col>
                            <Col>
                                <ErrorMessage name="flexibilityCreditBureau" render={msg => <div id="flexibilityCreditBureau-error" className="error mt-1">{msg}</div>}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <FieldText name="score" placeholder="BC Score (mínimo aceptado)" normalize="onlyNumbers" className="forceFullWidth"/>
                    </Col>
                </Row>
            </div>

            <Title title="Ubicación geografíca" className="title-dp fz25 fw300 mb-2 text-center"/>

            <Row>
                <Col lg={12}>
                    <FieldTextArea name="geographicLocationsRejected" placeholder="Coloca todas las entidades federativas que NO entren en el perfil" className="forceFullWidth"/>
                </Col>
            </Row>

            <SubtitleFrom id="ciec-radio-group" subtitle="CIEC obligatoria para iniciar proceso de crédito" className="fz20 mb-2 alternative"/>

            <div role="group" aria-labelledby="ciec-radio-group" className="form-group">
                <Row>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="ciec" value="Sí"/>
                            &nbsp;Sí
                        </label>
                    </Col>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="ciec" value="No"/>
                            &nbsp;No
                        </label>
                    </Col>
                    <Col lg={12}>
                        <ErrorMessage name="ciec" render={msg => <div id="ciec-error" className="error mt-1">{msg}</div>}/>
                    </Col>
                </Row>
            </div>

            <SubtitleFrom id="warranty-radio-group" subtitle="Garantías" className="fz20 mb-2 alternative"/>

            <div role="group" aria-labelledby="warranty-radio-group" className="form-group">
                <Row>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="warranty" value="No"/>
                            &nbsp;No
                        </label>
                    </Col>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="warranty" value="Inmobiliaria"/>
                            &nbsp;Inmobiliaria
                        </label>
                    </Col>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="warranty" value="Activo fijo"/>
                            &nbsp;Activo fijo
                        </label>
                    </Col>
                    <Col lg={2}>
                        <label>
                            <Field type="radio" name="warranty" value="Ambas"/>
                            &nbsp;Ambas
                        </label>
                    </Col>
                    <Col lg={12}>
                        <ErrorMessage name="warranty" render={msg => <div id="warranty-error" className="error mt-1">{msg}</div>}/>
                    </Col>
                </Row>
            </div>

            {/* <SubtitleFrom subtitle="Apalancamiento aceptado" className="fz20 mb-2 alternative"/>

            <Row>
                <Col lg={12}>
                    <FieldText name="acceptedLeverage" placeholder="% sobre las ventas" className="forceFullWidth"/>
                </Col>
            </Row> */}

            <div className="subtitle form fz20 mb-2 alternative">
                Uso del crédito otorgado <small>(elige todas la necesarias)</small>
            </div>

            <Row>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.expansion" label="Expansión" checked={props.values.useOfCredit.expansion}/>
                </Col>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.nuevosProyectos" label="Nuevos proyectos" checked={props.values.useOfCredit.nuevosProyectos}/>
                </Col>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.comprarMercancia" label="Compra Mercancía" checked={props.values.useOfCredit.comprarMercancia}/>
                </Col>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.pagosAdministrativos" label="Pagos administrativos" checked={props.values.useOfCredit.pagosAdministrativos}/>
                </Col>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.remodelacion" label="Remodelación" checked={props.values.useOfCredit.remodelacion}/>
                </Col>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.consolidarDeudas" label="Consolidar deudas" checked={props.values.useOfCredit.consolidarDeudas}/>
                </Col>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.compraEquipo" label="Compra de equipo" checked={props.values.useOfCredit.compraEquipo}/>
                </Col>
                <Col lg={3}>
                    <FieldCheck name="useOfCredit.otros" label="Otros" checked={props.values.useOfCredit.otros}/>
                </Col>
                <Col>
                    <ErrorMessage name="useOfCredit" render={msg => <div id="useOfCredit-error" className="error mt-1">{msg}</div>}/>
                </Col>
            </Row>

            <div key={`div-file-input-allies`}>
                <FieldDoc
                    title={"Adjunta tu logo"}
                    subtitle={"(archivo editable o PDF)"}
                    className="forceFullWidth"
                    name='logo'
                    fileMethod={fileHandler}
                    refs={refAttachments}
                    image={clip}
                    files={props.initialValues['logo']}
                    deleteFile={deleteChip}
                    key={`file-input-allies`}
                    alt= 'alternative2'
                />
            </div>
            {
                errorDocsBySize.show && 
                <Alert variant="danger">
                    Los siguiente archivos pesan más de 10MB y fueron descartados:
                    <ul> 
                    {
                        errorDocsBySize.files.map((d, i) => {
                            return <li key={i}><strong>{d}</strong></li>
                        })
                    }
                    </ul>
                </Alert>
            }
            {
                errorDocs && 
                <Alert variant="danger">
                    Ya ha adjuntado un archivo de logo
                </Alert>
            }

			<div className="text-center">
				<Button type="submit" className="btn-blue-documents mt-30" onClick={() => goToError()} style={{ width: '100%', maxWidth:'350px'  }}>dar de alta alianza</Button>
			</div>
		</Form>
	);
}

export default withFormik({
	mapPropsToValues({initialValues}){
        return initialValues;
    },
    validate: AlliesValidations, 
    handleSubmit(values, formikBag){
        formikBag.setSubmitting(false);
        formikBag.props.handleSubmit(values);
    },
    // enableReinitialize: true,
    displayName: 'AlliesForm'
})(AlliesForm);
