import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import comercialOptions from "../models/ComercialInfoModels";
import employeesNumber from "../models/EmployeesNumber";
import bankAccount from "../models/BankAccount";
import empresarialCreditCard from "../models/EmpresarialCreditCard";
import { Row, Col, Button } from "react-bootstrap";
import InputLabel from "../components/Generic/InputLabel";
import SubtitleForm from "../components/Generic/SubtitleForm";
import { validateComercialInfo } from "../components/Validate/ValidateComercialInfo";
import {
  renderField,
  renderSelectField,
  renderFieldFull,
} from "../components/Generic/Fields";
import { updateToast } from "../redux/actions/appActions";
import { updateModalCiec } from "../redux/actions/modalCiecActions";
// import { updateModalBanks } from "../redux/actions/modalBanksActions";
import { execToast } from "../utils/ToastUtils";
import { updateLoader } from "../redux/actions/loaderActions";
// CIEC
import PopUp from "./PopUp";
// import PopUpBanks from "./PopUpBanks";
import Info from "../assets/img/info-01.png";
// import Delete from "../assets/img/basura-01.png";
import scroll from "../utils/scroll";
import axios from "../utils/axios";
// import DeleteIcon from "@material-ui/icons/Delete";

let ComercialInfoForm = (props) => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.app.toast);
  const { showModal, refDocuments } = useSelector((state) => state.modalCiec);

  const [colonias, setColonias] = useState([]);
  const [zipCodeError, setZipCodeError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [forceRender, setForceRender] = useState(true);
  const [rfc, setRfc] = useState("");
  const [ciec, setCiec] = useState("");
  const [ciecStatus, setCiecStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [person, setPerson] = useState("");

  const { handleSubmit, valid, cieicValidation, initialValues, setInitialValues } = props;
  const ciecRef = useRef(null);

  const handleInputChange = (event, newValue, previousValue) => {
    if(event.target.name === "rfc"){
      setRfc(newValue);
    }
    if(event.target.name === "ciec"){
      setCiec(newValue);
      setMessage("");
    }
    setInitialValues({ ...initialValues, [event.target.name]: newValue });
  }

  const handleChange = async (event, id) => {
    const zipCode = event.target.value;
    handleInputChange(event, zipCode);

    if (zipCode.length === 5) {
      try {
        const res = await (
          await fetch(
            `https://api.copomex.com/query/info_cp/${zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`,
            {
              method: "GET",
            }
          )
        ).json();
        const copycolonias = [];
        if (Array.isArray(res)) {
          res.map((datos) => {
            copycolonias.push(datos.response.asentamiento);
          });
          copycolonias.sort();
          setColonias(copycolonias);
        }
        const estado = res[0].response.estado;
        const municipio = res[0].response.municipio;
        props.setState(estado);
        props.setMunicipality(municipio);
        setZipCodeError(false);
      } catch (error) {
        setZipCodeError(true);
        props.setState("");
        props.setMunicipality("");
        setColonias([]);
      }
    } else {
      setZipCodeError(false);
      props.setState("");
      props.setMunicipality("");
      setColonias([]);
    }
    dispatch(updateLoader(false));
  };

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let idClient = user.idClient;
    setPerson(idClient.type);
  }, []);

  useEffect(() => {
    if (person === "PF") {
      setCiecStatus(true);
    }
  }, [person]);

  useEffect(() => {
    if (!toast.second) {
      execToast("second");
      dispatch(updateToast(toast, "second"));
    }

    const getData = async () => {
      dispatch(updateLoader(true));
      const user = JSON.parse(sessionStorage.getItem("user"));
      const idClient = user.idClient;
      // Si ya tienen una solicitud, se actualiza
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance[idClient.appliance.length - 1];

        if (appliance.hasOwnProperty("idComercialInfo")) {
          const comercial = appliance.idComercialInfo;
          const address = comercial.address;
          const zipCode = address.zipCode;
          try {
            const res = await (
              await fetch(
                `https://api.copomex.com/query/info_cp/${zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`,
                {
                  method: "GET",
                }
              )
            ).json();
            const copycolonias = [];
            if (Array.isArray(res)) {
              res.map((datos) => {
                copycolonias.push(datos.response.asentamiento);
              });
              copycolonias.sort();
              setColonias(copycolonias);
            }
            const estado = res[0].response.estado;
            const municipio = res[0].response.municipio;
            props.setState(estado);
            props.setMunicipality(municipio);
            setZipCodeError(false);
          } catch (error) {
            props.setState("");
            props.setMunicipality("");
            setColonias([]);
            setZipCodeError(true);
          }
        }
      }
      dispatch(updateLoader(false));
    };

    getData();

    if (!refDocuments) {
      window.scrollTo(0, 0);
    } else {
      const inputCiec = document.getElementById("CIEC");
      inputCiec.focus();
      scroll("CIEC");
    }
  }, []);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const { type } = user.idClient;

  useEffect(() => {
    const idClient = user.idClient;
    const appliance = idClient.appliance[idClient.appliance.length - 1];
    if (appliance.hasOwnProperty("idComercialInfo")) {
      const comercial = appliance.idComercialInfo;
      for (let key in comercial) {
        if (key === "ciecstatus") {
          setCiecStatus(comercial[key]);
          comercial[key] === true
            ? setMessage("CIEC válida ")
            : setMessage("la CIEC no es válida");
        }
      }
    } else {
      setCiecStatus(false);
    }
  }, []);

  useEffect(() => {
    if (ciecStatus) {
      return;
    }

    if (ciec.length !== 8) {
      return;
    }
    if (type === "PM" && rfc.length !== 12) {
      return;
    }

    if (type === "PFAE" && rfc.length !== 13) {
      return;
    }
    cieicValidation(ciec, rfc).then((res) => {
      if (res) {
        const cstatus = res.code;
        if (cstatus === 200) {
          setCiecStatus(true);
          setMessage("CIEC válida");
        } else {
          const ctype = res.code;
          if (ctype === 404) {
            setMessage("la CIEC no es válida");
          } else {
            setMessage("error al validar la CIEC");
          }
          setCiecStatus(false);
        }
      }
    });
  }, [ciec, rfc]);

  const goToError = () => {
    const comercialNameError = document.getElementById("comercialName-error");
    const gyreError = document.getElementById("gyre-error");
    const businessNameError = document.getElementById("businessName-error");
    const specificError = document.getElementById("specific-error");
    const rfcError = document.getElementById("rfc-error");
    const employeesNumberError = document.getElementById(
      "employeesNumber-error"
    );
    const bankAccountError = document.getElementById("bankAccount-error");
    const paymentsMoreThan30Error = document.getElementById(
      "paymentsMoreThan30-error"
    );
    const empresarialCreditCardError = document.getElementById(
      "empresarialCreditCard-error"
    );
    const streetError = document.getElementById("street-error");
    const extNumberError = document.getElementById("extNumber-error");
    const intNumberError = document.getElementById("intNumber-error");
    const CPError = document.getElementById("CP-error");
    const townError = document.getElementById("town-error");
    const stateError = document.getElementById("state-error");
    const municipalityError = document.getElementById("municipality-error");
    const ciecError = document.getElementById("ciec-error");
    const ciecStatusError = document.getElementById("ciec-error");
    const phoneError = document.getElementById("phone-error");
    const webSiteError = document.getElementById("webSite-error");
    const facebookError = document.getElementById("facebook-error");
    const terminalError = document.getElementById("terminal-error");
    const exportationError = document.getElementById("exportation-error");
    const warrantyError = document.getElementById("warranty-error");

    const errors = [
      comercialNameError,
      gyreError,
      businessNameError,
      specificError,
      rfcError,
      employeesNumberError,
      bankAccountError,
      paymentsMoreThan30Error,
      empresarialCreditCardError,
      streetError,
      extNumberError,
      intNumberError,
      CPError,
      townError,
      stateError,
      municipalityError,
      ciecError,
      phoneError,
      webSiteError,
      facebookError,
      terminalError,
      exportationError,
      warrantyError,
      ciecStatusError,
    ];
    for (let x = 0; x < errors.length; x++) {
      if (errors[x] != null) {
        scroll(errors[x].id);
        break;
      }
    }
  };

  if (!zipCodeError && disabled && valid) {
    setDisabled(false);
  }

  if ((!disabled && !valid) || (!disabled && zipCodeError)) {
    setDisabled(true);
  }
  

  useEffect(() => {
    if (ciecStatus !== null || ciecStatus !== undefined) {
      if (ciecStatus === true) {
        setMessage("CIEC válida");
        props.setConfirm(true);
        setInitialValues({
          ...initialValues,
          ciecStatus: ciecStatus,
        });
        setDisabled(false);
      } else {
        setMessage("la CIEC no es válida");
        setInitialValues({
          ...initialValues,
          ciecStatus: ciecStatus,
        });
        setDisabled(true);
      }
    }
  }, [ciecStatus]);

  const LirycsNumbersDotComa = (nextValue, previousValue) =>
    /^([a-z ñáéíóú0-9,.]{0,45})$/i.test(nextValue) ? nextValue : previousValue;
  const onlyNumbers = (nextValue, previousValue) =>
    /^[+]?([0-9]+(?:[,.][0-9]*)?|,.[0-9]+)$/.test(nextValue) ||
    nextValue.length === 0
      ? nextValue
      : previousValue;
  const upper = (value) => value && value.toUpperCase();
  const onlyLirycs = (nextValue, previousValue) =>
    /^([a-zñáéíóúü\s]{0,60})$/i.test(nextValue) ? nextValue : previousValue;

  const CheckConsulta = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const id = user._id;
    const data = {
      name: "hola",
    };
    await axios
      .post(`api/info-comercial/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form
        className="ml-auto mr-auto"
        style={{ maxWidth: "690px" }}
        onSubmit={handleSubmit}
      >
        <SubtitleForm subtitle="Sobre tu negocio" className="mb-3" />
        <Field
          component={renderField}
          type="text"
          cls="mb-3"
          name="comercialName"
          label="Nombre comercial"
          onChange={handleInputChange}
        />
        <Field component={renderSelectField} name="gyre" cls="mb-3" onChange={handleInputChange}>
          <option value="">Selecciona el giro de tu negocio</option>
          {Object.keys(comercialOptions).map((value, key) => (
            <option value={`${value}`} key={key}>
              {comercialOptions[value].name}
            </option>
          ))}
        </Field>
        {type === "PM" ? (
          <Field
            component={renderField}
            type="text"
            cls="mb-3"
            name="businessName"
            label="Razón social"
            onChange={handleInputChange}
          />
        ) : (
          <div></div>
        )}
        <Field
          component={renderField}
          label="Actividad específica"
          name="specific"
          cls="mb-3"
          onChange={handleInputChange}
        />
        <Field
          component={renderField}
          label="RFC"
          name="rfc"
          cls="mb-3"
          normalize={upper}
          maxLength={12}
          minLength={12}
          onChange={handleInputChange}
        />

        <Field component={renderSelectField} name="employeesNumber" cls="mb-3" onChange={handleInputChange}>
          <option className="metropolisReg" value="">
            Número de empleados
          </option>
          {employeesNumber.map((option, index) => {
            return (
              <option value={option.value} key={index}>
                {option.text}
              </option>
            );
          })}
        </Field>

        {type !== "PF" && (
          <Field
            component={renderSelectField}
            name="paymentsMoreThan30"
            cls="mb-3"
            onChange={handleInputChange}
          >
            <option className="metropolisReg" value="">
              ¿Alguno de tus clientes te pagan a más de 30 días?
            </option>
            <option className="metropolisReg" value="1">
              Sí
            </option>
            <option className="metropolisReg" value="0">
              No
            </option>
          </Field>
        )}

        <label className="label-style">
          El número telefónico debe tener 10 dígitos
        </label>
        <Field
          component={renderField}
          label="Teléfono"
          normalize={onlyNumbers}
          name="phone"
          cls="mb-3"
          maxLength={10}
          minLength={10}
          onChange={handleInputChange}
        />
        <SubtitleForm subtitle="Domicilio del negocio" className="mt-11 mb-3" />
        <Row className="d-flex justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <Field
              component={renderField}
              label="Calle"
              name="street"
              cls="mb-3"
              normalize={LirycsNumbersDotComa}
              onChange={handleInputChange}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              label="Ext"
              name="extNumber"
              cls="mb-3"
              onChange={handleInputChange}
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              label="Int"
              name="intNumber"
              cls="mb-3"
              onChange={handleInputChange}
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              label="CP"
              normalize={onlyNumbers}
              name="zipCode"
              cls="mb-3"
              onChange={handleChange}
            />
            {zipCodeError && (
              <span id="CP-error">
                <small className="error">Código postal no encontrado</small>
              </span>
            )}
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field component={renderSelectField} name="town" cls="mb-3" onChange={handleInputChange}>
              <option className="metropolisReg" value="">
                Selecciona tu colonia
              </option>
              {colonias.map((colonia, index) => {
                return (
                  <option value={colonia} key={colonia + index}>
                    {colonia}
                  </option>
                );
              })}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </Col>

          {type !== "PF" && (
            <>
              <Col lg={12} md={12} sm={12}>
                <SubtitleForm subtitle="Clave CIEC" className="mt-30" />
                <div
                  onClick={() => {
                    dispatch(updateModalCiec(true));
                  }}
                  id="btnCiec"
                  ref={ciecRef}
                  style={{ cursor: "pointer", width: "0", height: "0" }}
                >
                  <img
                    src={Info}
                    alt="Datos CIEC info"
                    title="Información de CIEC"
                    className="positionInfo"
                  />
                </div>
                <Field
                  component={renderFieldFull}
                  label="CIEC"
                  name="ciec"
                  onChange={handleInputChange}
                />
                {message && (
                  <span id={ciecStatus ? "CIEC-valid" : "CIEC-error"}>
                    <small className={ciecStatus ? "valid" : "error"}>
                      {message}
                    </small>
                  </span>
                )}
                <div className="fz18 gray50 text-dp mb-30 mt-2">
                  nos ayuda a agilizar tu solicitud y ofrecerte mejores
                  condiciones de crédito. Se ingresa por única ocasión para
                  descargar la información necesaria mediante procesos
                  automatizados.
                </div>
              </Col>
              <PopUp />
            </>
          )}
        </Row>

        <SubtitleForm subtitle="¿Cuentas con alguno?" className="mt-11 mb-2" />
        <Field
          component={renderField}
          label="Copia y pega el link de tu sitio web (opcional)"
          name="webSite"
          cls="mb-3"
          onChange={handleInputChange}
        />
        <Field
          component={renderField}
          label="Copia y pega el link de tu Facebook (opcional)"
          name="facebook"
          cls="mb-3"
          onChange={handleInputChange}
        />
        <InputLabel
          label="¿Cuentas con terminal punto de venta?"
          class="mt-b2 text-msg-dp"
        />
        <Field component={renderSelectField} name="terminal" cls="mb-3" onChange={handleInputChange}>
          <option value="">Seleccionar</option>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </Field>
        <InputLabel
          label="¿Puedes ofrecer una garantía?"
          class="mt-b2 text-msg-dp"
        />
        <Field component={renderSelectField} name="warranty" cls="mb-3" onChange={handleInputChange}>
          <option value="">Seleccionar</option>
          <option value="1">Sí, garantía inmobiliaria</option>
          <option value="2">Sí, activo fijo</option>
          <option value="3">Sí, ambos</option>
          <option value="4">No</option>
        </Field>
        <div className="text-center" style={{ marginBottom: "50px" }}>
          {refDocuments && !disabled && (
            <Button
              id="ymb-dp-comercial-submit"
              type="submit"
              className="mt-50 btn-blue-general btn-blue-send-documents"
            >
              guardar e ir a documentos
            </Button>
          )}
          {!refDocuments && !disabled && (
            <Button
              type="submit"
              className={"mt-50 btn-blue-general"}
              style={{ width: "250px" }}
            >
              continuar
            </Button>
          )}
          {disabled && (
            <Button
              type="button"
              className="mt-50 btn-blue-general btn-gray-general"
              onClick={() => goToError()}
              style={{ width: "250px" }}
            >
              continuar
            </Button>
          )}
          {/* <Button type="button" className={"mt-50 btn-blue-general"} style={{ width: '250px' }} onClick={CheckConsulta}>
              continuar
            </Button> */}
        </div>
      </form>
    </div>
  );
};

ComercialInfoForm = reduxForm({
  form: "comercialInfoForm", // a unique identifier for this form
  validate: validateComercialInfo, // <--- validation function given to redux-form
  enableReinitialize: true,
})(ComercialInfoForm);

export default ComercialInfoForm;
