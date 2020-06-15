import React, { useState, useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import comercialOptions from '../models/ComercialInfoModels'
import { Row, Col, Button } from 'react-bootstrap';
import SubtitleForm from '../components/Generic/SubtitleForm';
import { validateComercialInfo } from '../components/Validate/ValidateComercialInfo';
import { renderField, renderSelectField, renderFieldFull } from '../components/Generic/Fields';
import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import { ToastContainer } from "react-toastify";
import { updateToast } from '../redux/actions/appActions';
import { execToast } from '../utils/ToastUtils';
import { updateLoader } from '../redux/actions/loaderActions';
// CIEC
import PopUp from "./PopUp";
import Info from "../assets/img/Info.png";


let ComercialInfoForm = props => {

  const dispatch = useDispatch();
  const toast = useSelector((state) => state.app.toast);

  const [colonias,setColonias] = useState([]);
  const [currentCP, setCurrentCP] = useState('');
  const [showModal, setShowModal] = useState(true);
  
  const { handleSubmit  } = props

  const handleChange = async (event, id) => {
   
   const zipCode = event.target.value;
   
   if (zipCode.length === 5){
      try { 
        const res = await (
          await fetch(
            `https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}`,
            {
              method: "GET"
            }
        )).json();
        const copycolonias = [];
        if(Array.isArray(res)){
          res.map(datos => {
            copycolonias.push(datos.response.asentamiento);
            });
          copycolonias.sort()
          setColonias(copycolonias);
        }
        const estado = res[0].response.estado;
        const municipio = res[0].response.municipio;
        props.setState(estado);
        props.setMunicipality(municipio);
      }
      catch (error) {
        props.setState("");
        props.setMunicipality("");
        setColonias([]);
      }
   } else {
    props.setState("");
    props.setMunicipality("");
    setColonias([])
   }
  }

  useEffect(() => {
    if (!toast.second) {
      execToast('second');
      dispatch(updateToast(toast, 'second'));
    }
    window.scrollTo(0, 0);

    const getData = async () => {
      dispatch( updateLoader(true) );
      const user = JSON.parse(sessionStorage.getItem('user'));
      const id = user._id;
      const idClient = user.idClient[user.idClient.length - 1];
      // Si ya tienen una solicitud, se actualiza
      if (idClient.appliance.length > 0){
        const appliance = idClient.appliance[idClient.appliance.length - 1];
        if (appliance.idComercialInfo.length > 0){
          const comercial = appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
          const address =  comercial.address[comercial.address.length - 1];
          const zipCode = address.zipCode
          try { 
            const res = await (
            await fetch(
                `https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}`, {
                  method: "GET" 
                }
              )).json();
              const copycolonias = [];
            if(Array.isArray(res)){
              res.map(datos => {
                copycolonias.push(datos.response.asentamiento);
                });
              copycolonias.sort()
              setColonias(copycolonias);
            }
            const estado = res[0].response.estado;
            const municipio = res[0].response.municipio;
            props.setState(estado);
            props.setMunicipality(municipio);
          }
          catch (error) {
            props.setState("");
            props.setMunicipality("");
            setColonias([]);
          }
        }
      }
      dispatch( updateLoader(false) );
    }
    
    getData();    

  },[])

  const user = JSON.parse(sessionStorage.getItem("user"));
  const { type } = user.idClient[user.idClient.length - 1];  


  const onlyNumbers = (nextValue, previousValue) => /^[+]?([0-9]+(?:[\,.][0-9]*)?|\,.[0-9]+)$/.test(nextValue) || nextValue.length === 0? nextValue : previousValue;

  return (
    <div>
      <form className="ml-auto mr-auto" style={{maxWidth : '690px'}} onSubmit={handleSubmit}>
    <SubtitleForm subtitle="Sobre tu negocio" className="mb-3"/>
    <Field component={renderField} type="text" cls="mb-3" name="comercialName" label="Nombre comercial" />
    <Field component={renderSelectField} name="gyre"  cls="mb-3">
      <option value="">Giro...</option>
      { Object.keys(comercialOptions).map( (value, key) => (
          <option value={`${value}`} key={key}>{comercialOptions[value].name}</option>
      ) ) }
    </Field>
    {
      type === 'PM' 
      ? <Field component={renderField} type="text" cls="mb-3" name="businessName" label="Razón social"/>
      : <div></div>
    }


    <Field component={renderField} label="Actividad específica" name="specific" cls="mb-3"/>
    <Field component={renderField} label="RFC" name="rfc"  cls="mb-3"  maxLength={12} minLength={12}/>
    <SubtitleForm subtitle="Domicilio del negocio" className="mt-11 mb-3" />

    <Row className="d-flex justify-content-center">
        <Col lg={12} md={12} sm={12}>
          <Field component={renderField} label="Calle" name="street" cls="mb-3"/>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Field component={renderField} label="Ext" name="extNumber" cls="mb-3"/>
        </Col>

        <Col lg={6} md={6} sm={12}>
          <Field component={renderField} label="Int" name="intNumber" cls="mb-3"/>
        </Col>

        <Col lg={6} md={6} sm={12}>
          <Field component={renderField} label="CP" normalize={onlyNumbers} name="zipCode"  cls="mb-3" onChange={handleChange}/>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Field component={renderSelectField} name="town" cls="mb-3">
            <option className="brandonReg" value="">Selecciona tu colonia</option>
            {
              colonias.map((colonia, index) => {
                return (
                  <option value={colonia} key={colonia + index}>
                    {colonia}
                  </option>
                );
              })
            }
          </Field>
        </Col>

        <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Estado"
              name="state"
              val={props.state}
              disabled={true}
              readOnly={true}
              cls="mb-3 mt-1 form-control custom-form-input mt-24 mb-0 input-readonly"
            />
        </Col>

        <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Municipio"
              name="municipality"
              val={props.municipality}
              disabled={true}
              readOnly={true}
              cls="mb-3 mt-1 form-control custom-form-input mt-24 mb-0 input-readonly"
            />
        </Col>

        {type !== "PF" && (
            <>
              <Col lg={12} md={12} sm={12}>
                <SubtitleForm
                  subtitle="Clave CIEC (Opcional)"
                  className="text-form-dp  mt-30"
                />
                <div
                  onClick={() => setShowModal(true)}
                  style={{ cursor: "pointer", width: "0", height: "0" }}
                >
                  <img
                    src={Info}
                    alt="More Info"
                    title="More Info"
                    className="positionInfo"
                  />
                </div>
                <Field component={renderFieldFull} label="CIEC" name="ciec" />
                <div className="fz18 gray50 text-dp mb-30 mt-2">
                  No es obligatorio pero podrá agilizar tu solicitud de crédito
                  a la mitad del tiempo. Se ingresará por única ocasión para
                  descargar la información necesaria.
                </div>
              </Col>
              <PopUp
                show={showModal}
                setShow={(show) => setShowModal(show)}
              />
            </>
          )}



         <Col lg={12} md={12} sm={12}>
          <label className="label-style">El número telefónico debe tener 10 dígitos</label>
          <Field component={renderField} label="Teléfono" normalize={onlyNumbers} name="phone" cls="mb-3"/>
        </Col>

    </Row>
    <SubtitleForm subtitle="¿Cuentas con alguno?" className="mt-11 mb-3" />
    <Field component={renderField} label="Sitio web (opcional)" name="webSite" cls="mb-3"/>
    <Field component={renderField} label="Facebook (opcional)" name="facebook" cls="mb-3"/>
    <Field component={renderSelectField} name="terminal" cls="mb-3">
      <option className="brandonReg" value="">Terminal para cobrar con tarjeta (TPV)</option>
      <option className="brandonReg" value="1">Sí</option>
      <option className="brandonReg" value="0">No</option>
    </Field>
    <Field component={renderSelectField} name="warranty" cls="mb-3">
      <option className="brandonReg" value="">¿Puedes ofrecer una garantía?</option>
      <option className="brandonReg" value="1">Sí, garantía inmobiliaria.</option>
      <option className="brandonReg" value="2">Sí, activo fijo.</option>
      <option className="brandonReg" value="3">Sí, ambos.</option>
      <option className="brandonReg" value="4">No.</option>
    </Field>

    <div className="text-center" style={{marginBottom : '50px'}}>
      <Button id="ymb-dp-comercial-submit" type="submit" className="mt-50 btn-blue-general">
        Continuar
      </Button>
    </div>  
      </form>
    </div>
  )
}

ComercialInfoForm = reduxForm({
  form: 'comercialInfoForm', // a unique identifier for this form
  validate: validateComercialInfo, // <--- validation function given to redux-form
  enableReinitialize : true
  })(ComercialInfoForm)
 
export default ComercialInfoForm;
