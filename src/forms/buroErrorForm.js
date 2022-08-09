import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import SubtitleForm from "../components/Generic/SubtitleForm";
import { Row, Col, Button } from "react-bootstrap";
import generalInfoOptions from "../models/GeneralInfoModels";
import bankAccount from "../models/BankAccount";
import InputLabel from "../components/Generic/InputLabel";
import { useDispatch } from "react-redux";
import helper from "../models/DateModels";
import { validateGeneralInfo } from "../components/Validate/ValidateGeneralInfo";
import {
  renderFieldFull,
  renderSelectFieldFull,
  renderField,
  renderSelectField,
} from "../components/Generic/Fields";
import { updateLoader } from "../redux/actions/loaderActions";
import scroll from "../utils/scroll";

let ErrorBuro = ({
  handleSubmit,
  valid,
  changeAddress,
  initialValues,
  setInitialValues,
  positionRef
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
  const [showModalGeneral, setShow] = useState(true);
  const [creditCard, setCreditCard] = useState("");

  const [changeCP, setChangeCP] = useState(false);

  const [cp, setCp] = useState("");
  const [cpError, setCpError] = useState(false);
  const [colonias, setColonias] = useState([]);
  const [state, setState] = useState("");
  const [municipality, setMunicipality] = useState("");

  const handleShow = () => setShow(true);

  /**Intentar pasar la direccion por aqui y/o buscar por que no se pasa */
  //let lastAddress = props.currentAddress;
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if(positionRef){
      const positionElement = document.getElementById(positionRef);
      scroll(positionElement.id);
    }
  }, []);

  const goToError = () => {
    const nameError = document.getElementById("name-error");
    const lastnameError = document.getElementById("lastname-error");
    const secondLastnameError = document.getElementById("secondLastname-error");
    const civilStatusError = document.getElementById("civilStatus-error");
    const curpError = document.getElementById("curp-error");
    const dayError = document.getElementById("day-error");
    const monthError = document.getElementById("month-error");
    const yearError = document.getElementById("year-error");
    const edadError = document.getElementById("edad-error");
    const rfcPersonError = document.getElementById("rfcPerson-error");
    const bankAccountError = document.getElementById("bankAccount-error");
    const streetError = document.getElementById("street-error");
    const extNumberError = document.getElementById("extNumber-error");
    const intNumberError = document.getElementById("intNumber-error");
    const zipCodeError = document.getElementById("zipCode-error");
    const townError = document.getElementById("town-error");
    const stateError = document.getElementById("state-error");
    const municipalityError = document.getElementById("municipality-error");
    const phoneError = document.getElementById("phone-error");
    const name1Error = document.getElementById("name1-error");
    const phone1Error = document.getElementById("phone1-error");
    const relative1Error = document.getElementById("relative1-error");
    const name2Error = document.getElementById("name2-error");
    const phone2Error = document.getElementById("phone2-error");
    const relative2Error = document.getElementById("relative2-error");
    const mortgageCreditError = document.getElementById("mortgageCredit-error");
    const carCreditError = document.getElementById("carCredit-error");
    const creditCarError = document.getElementById("creditCar-error");
    const last4Error = document.getElementById("last4-error");
    const tycError = document.getElementById("tyc-error");
    const errors = [
      nameError,
      lastnameError,
      secondLastnameError,
      civilStatusError,
      curpError,
      dayError,
      monthError,
      yearError,
      edadError,
      rfcPersonError,
      bankAccountError,
      streetError,
      extNumberError,
      intNumberError,
      zipCodeError,
      townError,
      stateError,
      municipalityError,
      phoneError,
      name1Error,
      phone1Error,
      relative1Error,
      name2Error,
      phone2Error,
      relative2Error,
      mortgageCreditError,
      carCreditError,
      creditCarError,
      last4Error,
      tycError,
    ];
    for (let x = 0; x < errors.length; x++) {
      if (errors[x] != null) {
        scroll(errors[x].id);
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
        style={{ maxWidth: "90vw", width:"690px" }}
        onSubmit={handleSubmit}
      >
        <SubtitleForm
          subtitle="Sobre ti"
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

        {user.idClient.type === "PM" ? (
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
          </Row>
        ) : (
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Field
                component={renderFieldFull}
                name="rfc"
                label="RFC de la persona"
                normalize={upper}
                onChange={(event, newValue, previousValue) =>
                  setInitialValues({ ...initialValues, rfc: newValue })
                }
              />
            </Col>
          </Row>
        )}

        <SubtitleForm
          subtitle="¿Cuentas con alguno?"
          className="mt-30 mb-18"
        />
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
              <option value="MORE4">Hace más de 4 años</option>
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

        <div className="text-center" style={{ marginBottom: "50px" }}>
          {disabled ? (
            <Button
              type="button"
              className="mt-50 btn-blue-general btn-gray-general"
              onClick={() => goToError()}
              style={{ width: '250px' }}
            >
              continuar
            </Button>
          ) : (
            <Button type="submit" className="mt-50 btn-blue-general" style={{ width: '250px' }} onSubmit={(e) => handleSubmit}>
              continuar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

ErrorBuro = reduxForm({
  form: "ErrorBuro", // a unique identifier for this form
  validate: validateGeneralInfo, // <--- validation function given to redux-form
  enableReinitialize: true,
})(ErrorBuro);

export default ErrorBuro;
