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
import axiosBase from 'axios';
let GeneralInfoForm = ({ handleSubmit, changeAddress, initialValues, setInitialValues }) => {
  const dispatch = useDispatch();
  const [currentAddress, setCurrentAddress] = useState(
    { extNumber: "", intNumber: "", registerDate: "", street: "", town: "", zipCode: "", sameAddress: "" }
  );
  const [sameAddress, setSameAddress] = useState(false);
  const [showModalGeneral, setShow] = useState(true);
  const [creditCard, setCreditCard] = useState("");
  const [colonias, setColonias] = useState([]);
  const [changeCP, setChangeCP] = useState(false);
  const [state,setState] = useState([]);
  const [municipality,setMunicipality] = useState([]);
  const [cp,setCp] = useState([]);
//  const [changeCP, setChangeCP] = useState(false);
  const handleShow = () => setShow(true);

  
  /**Intentar pasar la direccion por aqui y/o buscar por que no se pasa */
  //let lastAddress = props.currentAddress;
  const user = JSON.parse(sessionStorage.getItem('user'));
  const myProfile = {
    name: user.name,
    lastname: user.lastName,
  };

  const setComercialAddress = (checkboxComercialAddress) => {
    dispatch(updateLoader(true));
    if (checkboxComercialAddress) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const id = user._id;
      const idClient = user.idClient[user.idClient.length - 1];
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance[idClient.appliance.length - 1];
        if (appliance.idComercialInfo.length > 0) {
          const comercial = appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
          const { extNumber, intNumber, registerDate, street, town, zipCode } = comercial.address[comercial.address.length - 1];
          setCurrentAddress({ extNumber, intNumber, registerDate, street, town, zipCode })
        }
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
    dispatch(updateLoader(false));
  }
  
  const setEstados = async () => {
    let estadosr = [];
    const estadosRequest = await axiosBase.get('https://api-sepomex.hckdrk.mx/query/get_estados');
    if (Array.isArray(estadosRequest.data.response.estado)) {
      estadosRequest.data.response.estado.map(datos => {
        estadosr.push(datos);
      });
    } else if (estadosRequest.error) {
      estadosr = [];
    }
    setState(estadosr);
  }

  const setMunicipios = async (estado) => {
    let municipiosr = [];
    const municipiosRequest = await axiosBase.get(`https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/${estado}`);
    if (Array.isArray(municipiosRequest.data.response.municipios)) {
      municipiosRequest.data.response.municipios.map(municipio => {
        municipiosr.push(municipio);
      });
    } else if (municipiosRequest.error) {
      municipiosr = [];
    }
    setMunicipality(municipiosr); 
  }

  const setCodigoPostal = async (municipio) => {
    let cpr = [];
    const codigoPostalRequest = await axiosBase.get(`https://api-sepomex.hckdrk.mx/query/get_cp_por_municipio/${municipio}`);
    console.log("Los codigos: ",codigoPostalRequest.data.response);
    if (Array.isArray(codigoPostalRequest.data.response.cp)) {
      codigoPostalRequest.data.response.cp.map(codigopostal => {
        cpr.push(codigopostal);
      });
    } else if (codigoPostalRequest.error) {
      cpr = [];
    }
    setCp(cpr);
  }

  const setColoniasR = async (zipCode) => {
    let coloniasr = [];
    const coloniasRequest = await axiosBase.get(`https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}`);
    if (Array.isArray(coloniasRequest.data)) {
      coloniasRequest.data.map(datos => {
        coloniasr.push(datos.response.asentamiento);
      });
    } else if (coloniasRequest.error) {
      coloniasr = [];
    }
    setColonias(coloniasr);
  }

  const handleChangeMunicipio = async e => {
    const estado = e.target.value;
    setMunicipios(estado);
  };


  const handleChangeCp = async e => {
    const municipio = e.target.value;
    const changeCP = () => {
      setCodigoPostal(municipio);
    }
    changeCP();
  }

  const handleChangeColonia = async e => {
    const codigopostal = e.target.value;
    setColoniasR(codigopostal);
  };


  useEffect(()=>{
  }) 
  const onlyLirycs = (nextValue, previousValue) => /^([a-z ñáéíóú]{0,60})$/i.test(nextValue) ? nextValue : previousValue;
  const onlyNumbers = (nextValue, previousValue) => /^\d+$/.test(nextValue) || nextValue.length === 0? nextValue : previousValue;
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, name: newValue })}
              type="text"
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="lastname"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, lastname: newValue })}
              label="Apellido paterno"
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="secondLastname"
              label="Apellido materno"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, secondLastname: newValue })}
              normalize={onlyLirycs}
            />
          </Col>
        </Row>

        <Field
          component={renderSelectFieldFull}
          name="civilStatus"
          onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, civilStatus: newValue })}
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, day: newValue })}
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, month: newValue })}
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, year: newValue })}
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
                onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, rfcPerson: newValue })}
              />
            </Col>
          </Row>
        )}

        <SubtitleForm subtitle="Domicilio particular" className="mb-10 mt-24" />
        <Field
          component={renderFieldFull}
          onChange={(event, newValue, previousValue, name) => {
            dispatch(updateLoader(true));
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
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Ext"
              name="extNumber"
              val={!sameAddress ? "" : currentAddress.extNumber}
              disabled={!sameAddress ? false : true}
              normalize={onlyNumbers}
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Int"
              name="intNumber"
              val={!sameAddress ? "" : currentAddress.intNumber}
              disabled={!sameAddress ? false : true}
              normalize={onlyNumbers}
            />
          </Col>

           <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input brandonReg mt-24 mb-0"
              component="select"
              name="state"
              cls="mb-3 mt-24"
              onChange={handleChangeMunicipio}
              value={state[0]}
            >
              <option value="" selected disabled>Selecciona un Estado</option>
              {
                state.map((state, index) => {
                  return (
                    <option value={state} key={state + index}>
                      {state}
                    </option>
                  )
                })
              }
            </Field>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input brandonReg mt-24 mb-0"
              component="select"
              name="municipality"
              cls="mb-3 mt-24"
              onChange={handleChangeCp}
              value={municipality[0]}
            >
              <option value="" selected disabled>Selecciona un Municipio</option>
              {
                municipality.map((municipality, index) => {
                  return (
                    <option value={municipality} key={municipality + index}>
                      {municipality}
                    </option>
                  )
                })
              }
            </Field>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input brandonReg mt-24 mb-0"
              component="select"
              name="zipCode"
              cls="mb-3 mt-24"
              onChange={handleChangeColonia}
              value={cp[0]}
            >
              <option value="" selected disabled>Selecciona un Código Postal</option>
              {
                cp.map((cp, index) => {
                  return (
                    <option value={cp} key={cp + index}>
                      {cp}
                    </option>
                  )
                })
              }
            </Field>
          </Col>
          {/* <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="CP"
              name="zipCode"
              onChange={(event, newValue, previousValue, name) => {
                setChangeCP(true)
                if (newValue.length === 5) {
                  setColoniasR(newValue);
                } else {
                  setColoniasR([]);
                }
              }}
              val={!sameAddress ? "" : currentAddress.zipCode}
              disabled={!sameAddress ? false : true}
              normalize={onlyNumbers}
            />
          </Col> */}

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input brandonReg mt-24 mb-0"
              component="select"
              name="town"
              cls="mb-3 mt-24"
              value={colonias[0]}
            > 
            <option value="" selected disabled>Selecciona una colonia</option>
              {
              colonias.map((colonia, index) => {
                  return (
                    <option value={colonia} key={colonia + index}>
                      {colonia}
                    </option>
                  )
                })
                }
            </Field>
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, phone: newValue })}
              maxLength={10}
              minLength={10}
              normalize={onlyNumbers}
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
            <Field component={renderFieldFull} label="CIEC" name="ciec"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, ciec: newValue })}
            />
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
            <Field component={renderFieldFull} label="Nombre" name="name1"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, name1: newValue })}
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              type="text"
              name="phone1"
              label="Teléfono"
              maxLength={10}
              minLength={10}
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, phone1: newValue })}
              normalize={onlyNumbers}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderSelectFieldFull}
              name="relative1"
              clases="mt-24"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, relative1: newValue })}
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
            <Field component={renderFieldFull} label="Nombre" name="name2"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, name2: newValue })}
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              type="text"
              name="phone2"
              label="Teléfono"
              maxLength={10}
              minLength={10}
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, phone2: newValue })}
              normalize={onlyNumbers}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderSelectFieldFull}
              name="relative2"
              clases="mt-24"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, relative2: newValue })}
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, mortgageCredit: newValue })}
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, cardCredit: newValue })}
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
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, creditCard: newValue })}
            >
              <option value="">Selecciona...</option>
              <option value="1">Sí</option>
              <option value="0">No</option>
            </Field>
          </Col>
        </Row>
        {(creditCard === "1" || initialValues.creditCard === "1") && (
          <div>
            <Field
              component={renderFieldFull}
              name="last4"
              maxLength="4"
              onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, last4: newValue })}
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
            onChange={(event, newValue, previousValue) => setInitialValues({ ...initialValues, tyc: newValue })}
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
