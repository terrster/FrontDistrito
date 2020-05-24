import React, { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import SubtitleForm from "../components/Generic/SubtitleForm";
import { Row, Col, Button } from "react-bootstrap";
import generalInfoOptions from "../models/GeneralInfoModels";
import InputLabel from "../components/Generic/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import helper from "../models/DateModels";
import { validateGeneralInfo } from "../components/Validate/ValidateGeneralInfo";
import {
  renderFieldFull,
  renderSelectFieldFull,
  renderField,
} from "../components/Generic/Fields";
import CustomLoader from "../components/Generic/CustomLoader";
import { setSameAddress } from "../redux/actions/sameAddressActions";
import PopUp from "./PopUp";
import Info from "../assets/img/Info.png";
import { updateLoader } from '../redux/actions/loaderActions';

let GeneralInfoForm = ({ handleSubmit,  changeAddress, initialValues, setInitialValues }) => {
  const dispatch = useDispatch();  
  const [currentAddress, setCurrentAddress] = useState(
	{ extNumber: "", intNumber: "", registerDate: "", street: "", town: "", zipCode: "", sameAddress: "" }
  );
  const [sameAddress, setSameAddress] = useState(false);
  const [showModalGeneral, setShow] = useState(true);
  const [creditCard, setCreditCard] = useState("");
  const handleShow = () => setShow(true);  
  /**Intentar pasar la direccion por aqui y/o buscar por que no se pasa */
  //let lastAddress = props.currentAddress;
	const user = JSON.parse(sessionStorage.getItem('user'));
  const myProfile = {
    name: user.name,
    lastname: user.lastName,
  };

	const setComercialAddress = (checkboxComercialAddress) => {
		dispatch( updateLoader(true) );
		if (checkboxComercialAddress){
			const user = JSON.parse(sessionStorage.getItem('user'));
			const id = user._id;
			const idClient = user.idClient[user.idClient.length - 1];
			if (idClient.appliance.length > 0){
				const appliance = idClient.appliance[idClient.appliance.length - 1];
				if (appliance.idComercialInfo.length > 0){
					const comercial = appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
					const { extNumber, intNumber, registerDate, street, town, zipCode } = comercial.address[comercial.address.length - 1];
					setCurrentAddress({ extNumber, intNumber, registerDate, street, town, zipCode })				}
				}
		}
		else {
			const extNumber = "";
			const intNumber = "";
			const registerDate = "";
			const street = "";
			const town = "";
			const zipCode = "";
			const sameAddress = false;
			setCurrentAddress({ extNumber, intNumber, registerDate, street, town, zipCode, sameAddress })
		}
		dispatch( updateLoader(false) );
	}	
  return (
    <div>
      <form
        className="ml-auto mr-auto"
        style={{ maxWidth: "690px" }}
        onSubmit={handleSubmit}
      >
        <SubtitleForm subtitle="Sobre ti" className="" />
        <Row className="d-flex justify-content-center">
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="name"
              label="Nombre(s)"
              onBlur={(event, newValue, previousValue) => setInitialValues({...initialValues, name: newValue})}
              type="text"
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="lastname"
              onBlur={(event, newValue, previousValue) => setInitialValues({...initialValues, lastname: newValue})}
              label="Apellido paterno"
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="secondLastname"
              label="Apellido materno"
              onBlur={(event, newValue, previousValue) => setInitialValues({...initialValues, secondLastname: newValue})}
            />
          </Col>
        </Row>

        <Field
          component={renderSelectFieldFull}
          name="civilStatus"
          onBlur={(event, newValue, previousValue) => setInitialValues({...initialValues, civilStatus: newValue})}
          clases="mt-24"
        >
          <option value="">Estado civil...</option>
          {Object.keys(generalInfoOptions.civilStatusOptions).map(
            (key, index) => (
              <option value={key} key={index}>
                {generalInfoOptions.civilStatusOptions[key].value}
              </option>
            )
          )}
        </Field>
        <InputLabel label="Fecha de nacimiento" class="mt-18" />
        <Row className="d-flex justify-content-center">
          <Col>
            
            <Field component={renderSelectFieldFull} name="day" clases=""
            onBlur={(event, newValue, previousValue) => setInitialValues({...initialValues, day: newValue})}
            >
              <option value="">Día</option>
              {Object.keys(helper.days).map((key, index) => (
                <option value={key} key={index}>
                  {helper.days[key].value}
                </option>
              ))}
            </Field>
          </Col>
          <Col>
            <Field component={renderSelectFieldFull} name="month" clases=""
            onBlur={(event, newValue, previousValue) => setInitialValues({...initialValues, month: newValue})}
            >
              <option value="">Mes</option>
              {Object.keys(helper.months).map((key, index) => (
                <option value={key} key={index}>
                  {helper.months[key].value}
                </option>
              ))}
            </Field>
          </Col>
          <Col>
            <Field component={renderSelectFieldFull} name="year" clases=""
            onBlur={(event, newValue, previousValue) => setInitialValues({...initialValues, year: newValue})}
            >
              <option value="">Año</option>
              {Object.keys(helper.years).map((key, index) => (
                <option value={key} key={index}>
                  {helper.years[key].value}
                </option>
              ))}
            </Field>
          </Col>
        </Row>
        <Row>
          <Col>
            <Field component={renderFieldFull} name="edad" label="edad" />
          </Col>
        </Row>

        {user.idClient[user.idClient.length - 1].type === "PM" && (
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Field
                component={renderFieldFull}
                name="rfcPerson"
                label="RFC de la persona"
              />
            </Col>
          </Row>
        )}

        <SubtitleForm subtitle="Domicilio particular" className="mb-10 mt-24" />
        <Field
          component={renderFieldFull}
          onChange={(event, newValue, previousValue, name) => {
			  dispatch( updateLoader(true) );
			  changeAddress(newValue);
			  setSameAddress(newValue);
			  setComercialAddress(newValue);
		  }}
          type="checkbox"
          label="Utilizar los mismos datos que el domicilio comercial"
          name="sameAddress"
        />
        <Row className="d-flex justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <Field
              component={renderFieldFull}
              label="Calle"
              name="street"
              val={!sameAddress ? "" : currentAddress.street}
              disabled={!sameAddress ? false : true}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Ext"
              name="extNumber"
              val={!sameAddress ? "" : currentAddress.extNumber}
              disabled={!sameAddress ? false : true}
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Int"
              name="intNumber"
              val={!sameAddress ? "" : currentAddress.intNumber}
              disabled={!sameAddress ? false : true}
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="CP"
              name="zipCode"
              val={!sameAddress ? "" : currentAddress.zipCode}
              disabled={!sameAddress ? false : true}
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Colonia"
              name="town"
              val={!sameAddress ? "" : currentAddress.town}
              disabled={!sameAddress ? false : true}
            />
          </Col>

          <Col lg={12} md={12} sm={12}>
            <label className="label-style mt-24">
              El número telefónico debe tener 10 dígitos
            </label>

            <Field
              component={renderField}
              label="Teléfono_Personal"
              type="text"
              name="phone"
              maxLength={10}
              minLength={10}
            />
          </Col>
        </Row>

        {user.idClient[user.idClient.length - 1].type !== "PF" && (
          <div>
            <div>
              <SubtitleForm
                subtitle="Clave CIEC (Opcional)"
                className="mt-30"
              />
              <div onClick={handleShow} style={{ cursor: "pointer", width: '0', height: '0' }}>
                <img
                  src={Info}
                  alt="More Info"
                  title="More Info"
                  className="positionInfo"
                />
              </div>
            </div>
            <Field component={renderFieldFull} label="CIEC" name="ciec" />
            <div className="fz18 gray50 brandonReg mb-30 mt-2">
              No es obligatorio pero podrá agilizar tu solicitud de crédito a la
              mitad del tiempo. Se ingresará por única ocasión para descargar la
              información necesaria.
            </div>
          </div>
        )}

        <SubtitleForm subtitle="Referencias" className="mt-30" />
        <label className="label-style">
          El número telefónico debe tener 10 dígitos
        </label>
        <Row className="d-flex justify-content-center align-items-center">
          <Col lg={4} md={4} sm={12}>
            <Field component={renderFieldFull} label="Nombre" name="name1" />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              type="text"
              name="phone1"
              label="Teléfono"
              maxLength={10}
              minLength={10}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderSelectFieldFull}
              name="relative1"
              clases="mt-24"
            >
              <option value="">Parentesco</option>
              {Object.keys(generalInfoOptions.realtiveOptions).map(
                (key, index) => (
                  <option value={key} key={index}>
                    {generalInfoOptions.realtiveOptions[key].value}
                  </option>
                )
              )}
            </Field>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field component={renderFieldFull} label="Nombre" name="name2" />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              type="text"
              name="phone2"
              label="Teléfono"
              maxLength={10}
              minLength={10}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderSelectFieldFull}
              name="relative2"
              clases="mt-24"
            >
              <option value="">Parentesco</option>
              {Object.keys(generalInfoOptions.realtiveOptions).map(
                (key, index) => (
                  <option value={key} key={index}>
                    {generalInfoOptions.realtiveOptions[key].value}
                  </option>
                )
              )}
            </Field>
          </Col>
        </Row>

        <SubtitleForm subtitle="¿Cuentas con alguno?" className="mt-30 mb-18" />
        <Row>
          <Col>
            <InputLabel label="Crédito hipotecario" class="mt-18" />
            <Field
              component={renderSelectFieldFull}
              name="mortgageCredit"
              clases="mt-10"
            >
              <option value="">Selecciona...</option>
              <option value="1">Sí</option>
              <option value="0">No</option>
            </Field>
          </Col>

          <Col>
            <InputLabel label="Crédito automotriz" class="mt-18" />
            <Field
              component={renderSelectFieldFull}
              name="carCredit"
              clases="mt-10"
            >
              <option value="">Selecciona...</option>
              <option value="YES">Sí</option>
              <option value="NO">No</option>
              <option value="MORE4">Hace más de 4 años</option>
            </Field>
          </Col>

          <Col>
            <InputLabel label="Tarjeta de crédito" class="mt-18" />
            <Field
              component={renderSelectFieldFull}
              name="creditCard"
              clases="mt-10"
              onChange={(e) => setCreditCard(e.target.value)}
            >
              <option value="">Selecciona...</option>
              <option value="1">Sí</option>
              <option value="0">No</option>
            </Field>
          </Col>
        </Row>
        {(creditCard === "1" || initialValues.creditCard === "1" ) && (
          <div>
            <Field
              component={renderFieldFull}
              name="last4"
              maxLength="4"
              label="Últimos 4 dígitos de tu tarjeta de crédito"
            />
          </div>
        )}

        <div className="mt-3">
          <Field
            component={renderFieldFull}
            type="checkbox"
            label="Autorizo a Distrito Pyme S.A de C.V. a consultar mis antecedentes crediticios por única ocasión antes las Sociedades de Información Crediticia que estime conveniente, declarando que conozco la naturaleza, alcance y uso que Distrito Pyme S.A de C.V. hará de tal información."
            name="tyc"
            big={true}
          />
        </div>

        <div className="text-center" style={{ marginBottom: "50px" }}>
          <Button type="submit" className="mt-50 btn-blue-general">
            Continuar
          </Button>
        </div>
      </form>
      {user.idClient[user.idClient.length - 1].type !== "PF" && <PopUp show={showModalGeneral} setShow={setShow} />}
    </div>
  );
};

GeneralInfoForm = reduxForm({
  form: "generalInfoForm", // a unique identifier for this form
  validate: validateGeneralInfo, // <--- validation function given to redux-form
  enableReinitialize: true,
})(GeneralInfoForm);

/* 


GeneralInfoForm = connect((state, props) => {
  const {
    user: { user },
  } = state;
})(GeneralInfoForm);

const selector = formValueSelector("generalInfoForm");

GeneralInfoForm = connect((state) => {
  const sameAddress = selector(state, "sameAddress");
  const creditCard = selector(state, "creditCard");
  return {
    sameAddress,
    creditCard,
  };
})(GeneralInfoForm);

const mapStateToProps = (state, ownProps) => {
  return {
    currentAddress: state.currentAddress.address,
    user: state.user.user,
  };
};
 */
export default GeneralInfoForm;
