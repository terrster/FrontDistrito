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

let GeneralInfoForm = ({
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

  const setComercialAddress = async (checkboxComercialAddress) => {
    dispatch(updateLoader(true));
    if (checkboxComercialAddress) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const idClient = user.idClient;
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance[idClient.appliance.length - 1];
        if (appliance.hasOwnProperty("idComercialInfo")) {
          const comercial = appliance.idComercialInfo;
          const {
            extNumber,
            intNumber,
            registerDate,
            street,
            town,
            zipCode,
            municipality,
            state,
          } = comercial.address;

          try {
            const res = await (
              await fetch(
                `https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`,
                { method: "GET" }
              )
            ).json();
            if (Array.isArray(res)) {
              const colonias = res.map((datos) => datos.response.asentamiento);
              colonias.sort();
              setColonias(colonias);
              setCpError(false);
            } else if (res.error) {
              setCpError(true);
            }
          } catch (error) {
            setCpError(true);
            console.log("No hay CP");
          }
          setState(state);
          setMunicipality(state);
          setCurrentAddress({
            extNumber,
            intNumber,
            registerDate,
            street,
            town,
            zipCode,
            municipality,
            state,
          });
        }
      }
    } else {
      setColonias([]);
      const sameAddress = false;
      let extNumber = "";
      let intNumber = "";
      let street = "";
      let town = "";
      let zipCode = "";
      let state = "";
      let municipality = "";
      let user = JSON.parse(sessionStorage.getItem("user"));
      let idClient = user.idClient;
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance[idClient.appliance.length - 1];
        if (appliance.hasOwnProperty("idGeneralInfo")) {
          const idGeneralInfo = appliance.idGeneralInfo;
          if (idGeneralInfo.address.length > 0) {
            const address = idGeneralInfo.address;
            extNumber = address.extNumber;
            intNumber = address.intNumber;
            street = address.street;
            town = address.town;
            zipCode = address.zipCode;
            state = address.state;
            municipality = address.municipality;
          }
        }
      }
      setState(state);
      setCurrentAddress({
        extNumber,
        intNumber,
        street,
        town,
        zipCode,
        sameAddress,
        state,
        municipality,
      });
    }
    setTimeout(() => {
      dispatch(updateLoader(false));
    }, 1000);
  };

  const getAddress = async (zipCode) => {
    if (zipCode.length === 5) {
      try {
        const res = await (
          await fetch(
            `https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`,
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

  const getColonias = async (zipCode) => {
    dispatch(updateLoader(true));
    if (zipCode.length === 5) {
      try {
        const res = await (
          await fetch(
            `https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`,
            { method: "GET" }
          )
        ).json();
        if (Array.isArray(res)) {
          const colonias = res.map((datos) => datos.response.asentamiento);
          colonias.sort();
          setColonias(colonias);
          //setInitialValues({ ...initialValues, colonias });
          setCpError(false);
        } else if (res.error) {
          setCpError(true);
        }
      } catch (error) {
        setCpError(true);
        console.log("No hay CP");
      }
    }
    dispatch(updateLoader(false));
  };

  const getInitialValues = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const idClient = user.idClient;
    if (idClient.appliance.length > 0) {
      const appliance = idClient.appliance[idClient.appliance.length - 1];
      if (appliance.hasOwnProperty("idGeneralInfo")) {
        const idGeneralInfo = appliance.idGeneralInfo;
        if (idGeneralInfo.hasOwnProperty("address")) {
          const address = idGeneralInfo.address;
          if (address.hasOwnProperty("state")) {
            if (address.state != null) {
              const { state } = address;
              setState(state);
            }
          }
          if (address.hasOwnProperty("municipality")) {
            if (address.municipality != null) {
              const { municipality } = address;
              setMunicipality(municipality);
            }
          }
          if (address.hasOwnProperty("zipCode")) {
            if (address.zipCode != null) {
              setCp(address.zipCode);
              getColonias(address.zipCode);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    getInitialValues();
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
    /^([a-z ñáéíóú]{0,60})$/i.test(nextValue) ? nextValue : previousValue;
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
          subtitle="Sobre ti"
          className="subtitle-dp text-form-dp"
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
              <option value={key} key={index}>
                {generalInfoOptions.civilStatusOptions[key].value}
              </option>
            )
          )}
        </Field>
        <InputLabel label="Fecha de nacimiento" class="mt-18" />
        <Row className="d-flex justify-content-center">
          <Col>
            <Field
              component={renderSelectFieldFull}
              name="day"
              clases=""
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, day: newValue })
              }
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
            <Field
              component={renderSelectFieldFull}
              name="month"
              clases=""
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, month: newValue })
              }
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
            <Field
              component={renderSelectFieldFull}
              name="year"
              clases=""
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, year: newValue })
              }
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

        {user.idClient.type === "PM" && (
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
        )}

        {
          user.idClient.type !== "PM" &&
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Field component={renderSelectField} name="bankAccount" cls="mt-3 mb-3">
                <option className="metropolisReg" value="">
                  ¿Tienes cuenta bancaria?
                </option>
                {bankAccount.map((option, index) => {
                  return (
                    <option value={option.value} key={index}>
                      {option.text}
                    </option>
                  );
                })}
              </Field>
            </Col>
          </Row>
        }

        <SubtitleForm
          subtitle="Domicilio particular"
          className="subtitle-dp text-form-dp mb-10 mt-24"
        />
        <Field
          component={renderFieldFull}
          onChange={(event, newValue, previousValue, name) => {
            dispatch(updateLoader(true));
            setInitialValues({ ...initialValues, sameAddress: newValue });
            changeAddress(newValue);
            setSameAddress(newValue);
            setComercialAddress(newValue);
          }}
          type="checkbox"
          label="Utilizar los mismos datos que el domicilio del negocio"
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
        </Row>
        <SubtitleForm subtitle="Referencias" className="text-form-dp mt-30" />
        <label className="label-style">
          El número telefónico debe tener 10 dígitos
        </label>
        <Row className="d-flex justify-content-center align-items-center">
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderFieldFull}
              label="Nombre"
              name="name1"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, name1: newValue })
              }
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
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, phone1: newValue })
              }
              normalize={onlyNumbers}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderSelectFieldFull}
              name="relative1"
              clases="mt-24"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, relative1: newValue })
              }
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
            <Field
              component={renderFieldFull}
              label="Nombre"
              name="name2"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, name2: newValue })
              }
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
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, phone2: newValue })
              }
              normalize={onlyNumbers}
            />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Field
              component={renderSelectFieldFull}
              name="relative2"
              clases="mt-24"
              onChange={(event, newValue, previousValue) =>
                setInitialValues({ ...initialValues, relative2: newValue })
              }
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

        <SubtitleForm
          subtitle="¿Cuentas con alguno?"
          className="text-form-dp mt-30 mb-18"
        />
        <Row>
          <Col>
            <InputLabel label="Crédito hipotecario" class="mt-18" />
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
            <InputLabel label="Crédito automotriz" class="mt-18" />
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
            <InputLabel label="Tarjeta de crédito" class="mt-18" />
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
              Continuar
            </Button>
          ) : (
            <Button type="submit" className="mt-50 btn-blue-general" style={{ width: '250px' }}>
              Continuar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

GeneralInfoForm = reduxForm({
  form: "generalInfoForm", // a unique identifier for this form
  validate: validateGeneralInfo, // <--- validation function given to redux-form
  enableReinitialize: true,
})(GeneralInfoForm);

export default GeneralInfoForm;
