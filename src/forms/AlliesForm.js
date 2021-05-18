import React, { useEffect } from 'react';
import { withFormik, Form } from 'formik';
import { FieldText, FieldRadio, FieldCheck, FieldTextArea } from '../components/Generic/Fields';
import { Row, Col, Button } from 'react-bootstrap';
import Title from "../components/Generic/Title";
import SubtitleFrom from "../components/Generic/SubtitleForm";
// import { Link } from 'react-router-dom';
// import loginValidations from '../components/Validate/loginValidations';

const AlliesForm = (props) => {
    useEffect(() => {
        console.log(props.values);
    }, [props.values])
	return (
		<Form className="pt-3 pl-5 pr-5 pb-3">
            <Title title="Información General" className="subtitle-dp fz25 fw300 mb-1 text-center"/>

            <Row>
                <Col lg={4}>
                    <FieldText name="nameMainContact" placeholder="Nombre de contacto principal"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="allieName" placeholder="Nombre Alianza"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="businessName" placeholder="Razón Social"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="Correos electrónicos donde llegarán los leads" className="fz20 mb-1"/>

            <Row>
                <Col lg={4}>
                    <FieldText name="leadsEmail1" placeholder="Correo electrónico"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="leadsEmail2" placeholder="Correo electrónico"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="leadsEmail3" placeholder="Correo electrónico"/>
                </Col>
            </Row>

            <Title title="Variables de Crédito" className="subtitle-dp fz25 fw300 mb-1 text-center"/>

            <SubtitleFrom subtitle="Tipo de crédito que ofreces (elige uno o más)" className="fz20 mb-1"/>

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
                <Col lg={2}>
                    <FieldCheck name="typeCredit.puente" label="Puente"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="Régimen fiscal aceptado (elige uno o más)" className="fz20 mb-1"/>

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
            </Row>

            <Row>
                <Col lg={4}>
                    <FieldText name="annualSales" placeholder="Ventas anuales mínimas aceptadas"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="requestedAmountRange" placeholder="Rango de monto solicitado" labelFooter="(de $ hasta $)"/>
                </Col>
                <Col lg={4}>
                    <FieldText name="sales" placeholder="Monto/Ventas" labelFooter="(Porcentaje de ventas al que se podría acceder en crédito)"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="Antigüedad del negocio" className="fz20 mb-1"/>

            <Row>
                <Col lg={3}>
                    <FieldRadio id="antiquity1" name="antiquity" label="Menos de 6 meses" value="LESS6"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="antiquity2" name="antiquity" label="1 año" value="ONE"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="antiquity3" name="antiquity" label="2 años" value="TWO"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="antiquity4" name="antiquity" label="3 años" value="THREE"/>
                </Col>
                <Col lg={3}>
                    <FieldRadio id="antiquity5" name="antiquity" label="4 años o más" value="PFOUR"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="Flexibilidad en Buró de Crédito" className="fz20 mb-1"/>

            <Row>
                <Col lg={2}>
                    <FieldRadio id="flexibilityCreditBureau1" name="flexibilityCreditBureau" label="Poca" value="LITTLE"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="flexibilityCreditBureau2" name="flexibilityCreditBureau" label="Media" value="MEDIUM"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="flexibilityCreditBureau3" name="flexibilityCreditBureau" label="Alta" value="HIGH"/>
                </Col>
                <Col lg={6}>
                    <FieldText name="score" placeholder="BC Score" labelFooter="(mínimo aceptado)"/>
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <FieldTextArea name="geographicLocationsRejected" placeholder="Coloca todas las ubicaciones geográficas rechazadas" className="forceFullWidth"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="CIEC obligatoria para iniciar proceso de crédito" className="fz20 mb-1"/>

            <Row>
                <Col lg={2}>
                    <FieldRadio id="ciec1" name="ciec" label="Sí" checked={props.values.ciec === "YES" ? true : false} value="Sí"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="ciec2" name="ciec" label="No" checked={props.values.ciec === "NO" ? true : false} value="No"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="Garantías" className="fz20 mb-1"/>

            <Row>
                <Col lg={2}>
                    <FieldRadio id="warranty1" name="warranty" label="No" checked={props.values.warranty === "No" ? true : false} value="No"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="warranty2" name="warranty" label="Inmobiliaria" checked={props.values.warranty === "Inmobiliaria" ? true : false} value="Inmobiliaria"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="warranty3" name="warranty" label="Activo fijo"checked={props.values.warranty === "Activo fijo" ? true : false} value="Activo fijo"/>
                </Col>
                <Col lg={2}>
                    <FieldRadio id="warranty4" name="warranty" label="Ambas" checked={props.values.warranty === "Ambas" ? true : false} value="Ambas"/>
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <FieldText name="acceptedLeverage" placeholder="Apalancamiento aceptado" labelFooter="(% sobre las ventas)" className="forceFullWidth"/>
                </Col>
            </Row>

            <SubtitleFrom subtitle="Uso del crédito otorgado(elige todas la necesarias)" className="fz20 mb-1"/>

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
            </Row>

			<div className="text-center">
				<Button type="submit" className="btn-blue-documents mt-30" disabled={props.submitting} style={{ width: '300px' }}>Enviar Alta de Alianza</Button>
			</div>
		</Form>
	);
}

export default withFormik({
	mapPropsToValues({initialValues}){
        return initialValues;
    },
    // validate: loginValidations, 
    handleSubmit(values, formikBag){
        formikBag.setSubmitting(false);
        formikBag.props.handleSubmit(values);
    },
    enableReinitialize: true,
    displayName: 'AlliesForm'
})(AlliesForm);
