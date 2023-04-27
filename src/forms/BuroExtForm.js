import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import SubtitleForm from "../components/Generic/SubtitleForm";
import { Row, Col, Button } from "react-bootstrap";
import generalInfoOptions from "../models/GeneralInfoModels";
import InputLabel from "../components/Generic/InputLabel";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { validateBuroExtForm } from "../components/Validate/validateBuroExtForm";
import {
  renderFieldFull,
  renderSelectFieldFull,
  renderField,
  renderSelectField,
} from "../components/Generic/Fields";
import { updateLoader } from "../redux/actions/loaderActions";
import { useEffect } from "react";

let BuroExtForm = ({
  handleSubmit,
  valid,
  changeAddress,
  initialValues,
  setInitialValues,
  positionRef,
}) => {
  const dispatch = useDispatch();
  const [currentAddress, setCurrentAddress] = useState({
    extNumber: "",
    intNumber: "",
    registerDate: "",
    street: "",
    town: "",
    zipCode: "",
    sameAddress: "",
  });
  const [sameAddress, setSameAddress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [creditCard, setCreditCard] = useState("");
  const [cpError, setCpError] = useState(false);
  const [colonias, setColonias] = useState([]);
  const [captcha, setCaptcha] = useState(true);
  const [show, setShow] = useState(false);
  const [state, setState] = useState("");
  const [municipality, setMunicipality] = useState("");

  const getAddress = async (zipCode) => {
    if (zipCode.length === 5) {
      try {
        const res = await (
          await fetch(
            `https://api.copomex.com/query/info_cp/${zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`,
            { method: "GET" }
          )
        ).json();
        if (Array.isArray(res)) {
          const { estado, municipio } = res[0].response;
          const colonias = res.map((datos) => datos.response.asentamiento);
          colonias.sort();
          setColonias(colonias);
          setState(estado);
          setMunicipality(municipio);
          setInitialValues({
            ...initialValues,
            zipCode,
            municipality: municipio,
            state: estado,
            colonias,
          });
          setCpError(false);
        } else if (res.error) {
          setCpError(true);
        }
      } catch (error) {
        setCpError(true);
        console.log("No hay CP");
      }
    } else {
      setInitialValues({
        ...initialValues,
        zipCode,
        state: "",
        municipality: "",
        colonias: [],
      });
    }
    dispatch(updateLoader(false));
  };

  function scroll(element) {
    const parentElement = element.parentElement;
    const containerElement = parentElement.parentElement;
    
    if (containerElement !== null) {
      
      containerElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }

  function getErros() {
    const elements = document.getElementsByClassName("error");
    const errors = [];
    for (let elemnet of elements) {
      if (elemnet.innerText !== "") {
        errors.push(elemnet);
      }
    }
    return errors;
  }

  function onChangeCaptcha(value) {
    setCaptcha(!value);
  }

  React.useEffect(() => {
    if(captcha === false && disabled === false) {
      setShow(true);
    }
  }, [captcha, disabled]);

  const goToError = () => {
    const errors = getErros();

    for(let error of errors) {
      if(error !== null) {
        scroll(error);
        break;
      }
    }
  };

  if (!cpError && disabled && valid) {
    setDisabled(false);
  }
  if ((!disabled && !valid) || (!disabled && cpError)) {
    setDisabled(true);
  }

  const onlyLirycs = (nextValue, previousValue) =>
    /^([a-zñáéíóúü\s]{0,60})$/i.test(nextValue) ? nextValue : previousValue;
  const onlyNumbers = (nextValue, previousValue) =>
    /^\d+$/.test(nextValue) || nextValue.length === 0
      ? nextValue
      : previousValue;
  const LirycsNumbersDotComa = (nextValue, previousValue) =>
    /^([a-z ñáéíóú0-9,.]{0,45})$/i.test(nextValue) ? nextValue : previousValue;
  const upper = (value) => value && value.toUpperCase();

  return (
    <div>
      <form
        className="ml-auto mr-auto"
        style={{ maxWidth: "690px" }}
        onSubmit={handleSubmit}
      >
        <SubtitleForm
          subtitle="Información personal"
          // className=" text-form-dp"
        />
        <Row className="d-flex justify-content-center">
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="name"
              label="Nombre(s)"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, name: newValue })
              }
              type="text"
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="lastname"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, lastname: newValue })
              }
              label="Apellido paterno"
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              name="secondLastname"
              label="Apellido materno"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, secondLastname: newValue })
              }
              normalize={onlyLirycs}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12}>
            <Field
              component={renderFieldFull}
              name="rfcPerson"
              label="RFC de la persona"
              normalize={upper}
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, rfcPerson: newValue })
              }
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
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, phone: newValue })
              }
              maxLength={10}
              minLength={10}
              normalize={onlyNumbers}
            />
          </Col>
          <Col lg={12} md={12} sm={12}>
            <Field
              component={renderFieldFull}
              name="email"
              label="Correo electrónico"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, email: newValue })
              }
              type="email"
            />
          </Col>
        </Row>

        <Field
          component={renderSelectFieldFull}
          name="civilStatus"
          onChange={(event, newValue, previousValue) =>
            setInitialValues({ ...initialValues, civilStatus: newValue })
          }
          clases="mt-24"
        >
          <option value="">Estado civil...</option>
          {Object.keys(generalInfoOptions.civilStatusOptions).map(
            (key, index) => (
              <option value={key} key={key}>
                {generalInfoOptions.civilStatusOptions[key].value}
              </option>
            )
          )}
        </Field>

        <Row className="d-flex justify-content-center">
          <Col lg={6} md={6} sm={12}>
            
            <Field
              component={renderFieldFull}
              name="ocuppation"
              label="Ocupación"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, ocuppation: newValue })
              }
              normalize={onlyLirycs}
            />
            <label className="label-style mt-2">
              empleado, dueño de negocio, independiente, etc...
            </label>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              name="ingresosMensuales"
              label="Ingresos mensuales"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({
                  ...initialValues,
                  ingresosMensuales: newValue,
                })
              }
              normalize={onlyNumbers}
            />
          </Col>
        </Row>

        <SubtitleForm subtitle="Domicilio particular" className="mb-10 mt-24" />
        <Row className="d-flex justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <Field
              component={renderFieldFull}
              label="Calle"
              name="street"
              val={!sameAddress ? "" : currentAddress.street}
              disabled={!sameAddress ? false : true}
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, street: newValue })
              }
              normalize={LirycsNumbersDotComa}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Ext"
              name="extNumber"
              val={!sameAddress ? "" : currentAddress.extNumber}
              disabled={!sameAddress ? false : true}
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, extNumber: newValue })
              }
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="Int"
              name="intNumber"
              val={!sameAddress ? "" : currentAddress.intNumber}
              disabled={!sameAddress ? false : true}
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, intNumber: newValue })
              }
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderFieldFull}
              label="CP"
              name="zipCode"
              val={!sameAddress ? null : currentAddress.zipCode}
              disabled={!sameAddress ? false : true}
              onChange={(e, newValue, prevValue) => {
                if (newValue.hasOwnProperty("length")) {
                  if (newValue.length === 5) {
                    dispatch(updateLoader(true));
                  } else {
                    setCpError(false);
                    setColonias([]);
                  }
                }
                getAddress(newValue);
              }}
            />
            {cpError && (
              <span id="zipCode-error">
                <small className="error">Código postal no encontrado.</small>
              </span>
            )}
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input brandonReg mt-24 mb-0"
              component={renderSelectField}
              name="town"
              val={!sameAddress ? "" : currentAddress.town}
              disabled={!sameAddress ? false : true}
              cls="mb-3 mt-24"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, town: newValue })
              }
            >
              <option value="" selected disabled>
                Selecciona una colonia
              </option>
              {colonias.map((colonia, index) => {
                return (
                  <option
                    value={colonia}
                    selected={colonia === currentAddress.town ? true : false}
                    key={colonia + index}
                  >
                    {colonia}
                  </option>
                );
              })}
            </Field>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input mt-24 mb-0"
              component={renderFieldFull}
              cls="mb-3 mt-24"
              label="Estado"
              name="state"
              readOnly={true}
              val={!sameAddress ? "" : currentAddress.state}
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input mt-24 mb-0"
              component={renderFieldFull}
              name="municipality"
              cls="mb-3 mt-24"
              label="Municipio"
              readOnly={true}
              val={!sameAddress ? "" : currentAddress.municipality}
            />
          </Col>
        </Row>

        <SubtitleForm subtitle="¿Cuentas con alguno?" className="mt-30 mb-18" />
        <Row>
          <Col>
            <InputLabel label="crédito hipotecario" class="mt-18 text-msg-dp" />
            <Field
              component={renderSelectFieldFull}
              name="mortgageCredit"
              clases="mt-10"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, mortgageCredit: newValue })
              }
            >
              <option value="">Selecciona...</option>
              <option value="1">Sí</option>
              <option value="0">No</option>
            </Field>
          </Col>

          <Col>
            <InputLabel label="crédito automotriz" class="mt-18 text-msg-dp" />
            <Field
              component={renderSelectFieldFull}
              name="carCredit"
              clases="mt-10"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, carCredit: newValue })
              }
            >
              <option value="">Selecciona...</option>
              <option value="YES">Sí</option>
              <option value="NO">No</option>
              <option value="YES2">Cerrado en los ultimos 2 años</option>
            </Field>
          </Col>

          <Col>
            <InputLabel label="tarjeta de crédito" class="mt-18 text-msg-dp" />
            <Field
              component={renderSelectFieldFull}
              name="creditCard"
              clases="mt-10"
              onChange={(event, newValue, previousValue) => {
                setInitialValues({ ...initialValues, creditCard: newValue });
                setCreditCard(newValue);
              }}
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
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, last4: newValue })
              }
              label="Últimos 4 dígitos de tu tarjeta de crédito"
            />
          </div>
        )}

        <div className="mt-3">
          <Field
            component={renderFieldFull}
            type="checkbox"
            label="Autorizo a Distrito Pyme S.A de C.V. a consultar mis antecedentes crediticios por única ocasión ante las Sociedades de Información Crediticia que estime conveniente, declarando que conozco la naturaleza, alcance y uso que Distrito Pyme S.A de C.V. hará de tal información."
            name="tyc"
            onChange={(event, newValue, previousValue) =>
              setInitialValues({ ...initialValues, tyc: newValue })
            }
            big={true}
          />
        </div>

        <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6Ld2huQZAAAAANpPc8zQKPnS948P7vzt2T7t-GCF"
              onChange={onChangeCaptcha}
            />
          </div>

        <div className="text-center" style={{ marginBottom: "50px" }}>
          {!show ? (
            <Button
              type="button"
              className="mt-50 btn-blue-general btn-gray-general"
              onClick={() => goToError()}
              style={{ width: "250px" }}
            >
              continuar
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-50 btn-blue-general"
              style={{ width: "250px" }}
            >
              continuar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

BuroExtForm = reduxForm({
  form: "buroextform", // a unique identifier for this form
  validate: validateBuroExtForm, // <--- validation function given to redux-form
  enableReinitialize: true,
})(BuroExtForm);

export default BuroExtForm;
