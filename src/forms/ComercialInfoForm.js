import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import comercialOptions from "../models/ComercialInfoModels";
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
import { execToast } from "../utils/ToastUtils";
import { updateLoader } from "../redux/actions/loaderActions";
// CIEC
import PopUp from "./PopUp";
import Info from "../assets/img/Info.png";
import scroll from "../utils/scroll";
import axios from "../utils/axios";
import DeleteIcon from "@material-ui/icons/Delete";

let ComercialInfoForm = (props) => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.app.toast);
  const { showModal, refDocuments } = useSelector((state) => state.modalCiec);

  const [colonias, setColonias] = useState([]);
  const [banksOptions, setBanksOptions] = useState([]); // Bancos que se obtienen de la api
  const [bankFields, setBankFields] = useState([]); // Campos de los bancos que el usuario ya ha seleccionado
  const [zipCodeError, setZipCodeError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [forceRender, setForceRender] = useState(true);
  const [idFinerio, setIdFinerio] = useState('');

  const {
    handleSubmit,
    valid,
    banks,
    setBanks,
    isRegistredInFinerio,
    getCustomer,
  } = props;
  const ciecRef = useRef(null);

  const handleChangeBank = async (idBank, i) => {
    const { data } = await axios.get(`api/finerio/bank/${idBank}/fields`);
    let newFieldsBank = bankFields;
    if (idBank === 1) {
      const tokenField = {
        friendlyName: "Token",
        name: "securityCode",
        type: "TEXT",
        position: data.length + 1,
      };
      const newFields = [...data, tokenField];
      newFieldsBank[i] = newFields;
    } else {
      newFieldsBank[i] = data;
    }
    setForceRender(!forceRender);
    setBankFields(newFieldsBank);
    dispatch(updateLoader(false));
  };

  const deleteBank = async (indexBank) => {
    dispatch(updateLoader(true));

    if(Array.isArray(banks) && banks.length >= 0 && banks[indexBank] != null  && banks[indexBank].hasOwnProperty("idCredential")){
      const { data } = await axios.delete(`api/finerio/credentials/${banks[indexBank].idCredential}`);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    const copyBanks = banks;
    const newBanks = copyBanks.splice(indexBank, indexBank);
    setBanks(newBanks);
    props.change('banks'+indexBank, '');
    props.change('username'+indexBank, '');

    let AuxBankFields = bankFields.filter(b => b === indexBank );
    setBankFields(AuxBankFields);

    dispatch(updateLoader(false));
  };

  const handleChange = async (event, id) => {
    const zipCode = event.target.value;

    if (zipCode.length === 5) {
      try {
        const res = await (
          await fetch(
            `https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}`,
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

        if(appliance.hasOwnProperty("idFinerio")){
          setIdFinerio(appliance.idFinerio.idFinerio);//Obtener id de Finerio
        }

        if (appliance.hasOwnProperty("idComercialInfo")) {
          const comercial = appliance.idComercialInfo;
          const address = comercial.address;
          const zipCode = address.zipCode;
          try {
            const res = await (
              await fetch(
                `https://api-sepomex.hckdrk.mx/query/info_cp/${zipCode}`,
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

    const getBanks = async () => {
      const { data } = await axios.get("api/finerio/banks");
      setBanksOptions(data);
    };

    getBanks();

    if (!refDocuments) {
      window.scrollTo(0, 0);
    } else {
      const inputCiec = document.getElementById("CIEC");
      inputCiec.focus();
      scroll("CIEC");
    }
  }, []);

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("user")).idClient.appliance[0].idFinerio){
      const appliance = JSON.parse(sessionStorage.getItem("user")).idClient.appliance[0];

      appliance.idFinerio.credentials.map((credential, indexBank) => {
        let idBank = credential.idBank;
        const currBank = banksOptions.filter(
          (bank) => bank.id == idBank
        );
        
        const copyBanks = banks;
        copyBanks[indexBank] = {
          ...currBank[0],
          idArray: indexBank,
          idBank: credential.idBank,
          idCredential: credential.id,
          username: credential.username
        };

        setBanks(copyBanks);
        handleChangeBank(idBank, indexBank);
      });
    }
  }, [banksOptions])

  const user = JSON.parse(sessionStorage.getItem("user"));
  const { type } = user.idClient;

  const goToError = () => {
    const comercialNameError = document.getElementById("comercialName-error");
    const gyreError = document.getElementById("gyre-error");
    const businessNameError = document.getElementById("businessName-error");
    const specificError = document.getElementById("specific-error");
    const rfcError = document.getElementById("rfc-error");
    const streetError = document.getElementById("street-error");
    const extNumberError = document.getElementById("extNumber-error");
    const intNumberError = document.getElementById("intNumber-error");
    const CPError = document.getElementById("CP-error");
    const townError = document.getElementById("town-error");
    const stateError = document.getElementById("state-error");
    const municipalityError = document.getElementById("municipality-error");
    const ciecError = document.getElementById("ciec-error");
    const phoneError = document.getElementById("phone-error");
    const webSiteError = document.getElementById("webSite-error");
    const facebookError = document.getElementById("facebook-error");
    const terminalError = document.getElementById("terminal-error");
    const warrantyError = document.getElementById("warranty-error");
    const errors = [
      comercialNameError,
      gyreError,
      businessNameError,
      specificError,
      rfcError,
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
      warrantyError,
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

  const onlyNumbers = (nextValue, previousValue) =>
    /^[+]?([0-9]+(?:[,.][0-9]*)?|,.[0-9]+)$/.test(nextValue) ||
    nextValue.length === 0
      ? nextValue
      : previousValue;
  const upper = (value) => value && value.toUpperCase();
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
        />
        <InputLabel label="Giro" class="mt-18" />
        <Field component={renderSelectField} name="gyre" cls="mb-3">
          <option value="">Seleccionar</option>
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
          />
        ) : (
          <div></div>
        )}
        <Field
          component={renderField}
          label="Actividad específica"
          name="specific"
          cls="mb-3"
        />
        <Field
          component={renderField}
          label="RFC"
          name="rfc"
          cls="mb-3"
          normalize={upper}
          maxLength={12}
          minLength={12}
        />
        <label className="label-style">
          El número telefónico debe tener 10 dígitos
        </label>
        <Field
          component={renderField}
          label="Teléfono"
          normalize={onlyNumbers}
          name="phone"
          cls="mb-3"
        />
        <SubtitleForm subtitle="Domicilio del negocio" className="mt-11 mb-3" />
        <Row className="d-flex justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <Field
              component={renderField}
              label="Calle"
              name="street"
              cls="mb-3"
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              label="Ext"
              name="extNumber"
              cls="mb-3"
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              label="Int"
              name="intNumber"
              cls="mb-3"
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
            <Field component={renderSelectField} name="town" cls="mb-3">
              <option className="brandonReg" value="">
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
                  onClick={() => {
                    dispatch(updateModalCiec(true));
                  }}
                  id="btnCiec"
                  ref={ciecRef}
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
              <PopUp />
            </>
          )}
        </Row>
        {type !== "PM" && (
          <>
          <SubtitleForm subtitle="Datos Bancarios" className="mt-11 mb-3" />
          <Row>
            <Col lg={10} md={10} sm={10}>
              <Field
                key={0}
                component={renderSelectField}
                name={"banks" + 0}
                required={true}
                cls="mb-3"
                onChange={(e, newValue) => {
                  dispatch(updateLoader(true));
                  const currBank = banksOptions.filter(
                    (bank) => bank.id == newValue
                  );
                  const copyBanks = banks;
                  copyBanks[0] = {
                    ...currBank[0],
                    idArray: 0,
                  };
                  setBanks(copyBanks);
                  if (currBank.length > 0) {
                    const idBank = currBank[0].id;
                    handleChangeBank(idBank, 0);
                  }
                }}
              >
                <option value="" disabled>
                  Bancos
                </option>
                {banksOptions.map((bank, index) => {
                  return (
                    <option value={bank.id} key={bank.name + index}>
                      {bank.name}
                    </option>
                  );
                })}
              </Field>
            </Col>
            <Col lg={2} md={2} sm={2}>
              <Button
                className="btn-blue-general"
                onClick={() => deleteBank(0)}
              >
                <DeleteIcon />
              </Button>
            </Col>
          </Row>
          {bankFields
            .filter((fields, indexField) => indexField === 0)
            .map((fields, indexField) =>
              fields.map((field) => {              
                return (
                  <Field
                    key={field.name + 0}
                    component={renderField}
                    label={field.friendlyName}
                    type={field.type}
                    name={field.name + 0}
                    value={"123"}
                    required={true}
                    onChange={(e, newValue) => {
                      const copyBanks = banks;
                      const currentBank = banks[0];
                      const { name } = field;
                      const addCurrentBank = {
                        ...currentBank,
                      };
                      addCurrentBank[name] = newValue;
                      copyBanks[0] = addCurrentBank;
                      setBanks(copyBanks);
                    }}
                    cls="mb-3"
                  />
                );
              })
            )}
          {banks.map((bank, indexBank) => {
            if (indexBank === 0){
              return null
            }
            return (
              <div key={indexBank}>
                <Row>
                  <Col lg={10} md={10} sm={10}>
                    <Field
                      key={indexBank}
                      component={renderSelectField}
                      name={"banks" + indexBank}
                      required={true}
                      cls="mb-3"
                      onChange={(e, newValue) => {
                        dispatch(updateLoader(true));
                        const currBank = banksOptions.filter(
                          (bank) => bank.id == newValue
                        );
                        const copyBanks = banks;
                        copyBanks[indexBank] = {
                          ...currBank[0],
                          idArray: indexBank,
                        };
                        setBanks(copyBanks);
                        if (currBank.length > 0) {
                          const idBank = currBank[0].id;
                          handleChangeBank(idBank, indexBank);
                        }
                      }}
                    >
                      <option value="" disabled>
                        Bancos
                      </option>
                      {banksOptions.map((bank, index) => {
                        return (
                          <option value={bank.id} key={bank.name + index}>
                            {bank.name}
                          </option>
                        );
                      })}
                    </Field>
                  </Col>
                  <Col lg={2} md={2} sm={2}>
                    <Button
                      className="btn-blue-general"
                      onClick={() => deleteBank(indexBank)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Col>
                </Row>
                {bankFields
                  .filter((fields, indexField) => {
                    return indexField === indexBank
                  })
                  .map((fields, indexField) =>
                    fields.map((field) => {
                      return (
                        <Field
                          key={field.name + indexBank}
                          component={renderField}
                          label={field.friendlyName}
                          type={field.type}
                          name={field.name + indexBank}
                          required={true}
                          onChange={(e, newValue) => {
                            const copyBanks = banks;
                            const currentBank = banks[indexBank];
                            const { name } = field;
                            const addCurrentBank = {
                              ...currentBank,
                            };
                            addCurrentBank[name] = newValue;
                            copyBanks[indexBank] = addCurrentBank;
                            setBanks(copyBanks);
                          }}
                          cls="mb-3"
                        />
                      );
                    })
                  )}
              </div>
            );
          })}
          <Button
            type="button"
            className={"mt-11 btn-blue-general"}
            onClick={() => {
              const newBank = {
                code: null,
                id: null,
                idArray: banks.length ? banks[banks.length - 1].idArray + 1 : 1,
                name: null,
                status: null,
              };
              setBanks([...banks, newBank]);
            }}
          >
            Agregar Banco
          </Button>
          </>
        )}

        <SubtitleForm subtitle="¿Cuentas con alguno?" className="mt-11 mb-3" />
        <Field
          component={renderField}
          label="Copia y pega el link de tu sitio web (opcional)"
          name="webSite"
          cls="mb-3"
        />
        <Field
          component={renderField}
          label="Copia y pega el link de tu Facebook (opcional)"
          name="facebook"
          cls="mb-3"
        />
        <InputLabel
          label="¿Vendes tu producto o servicio a Estados Unidos?"
          class="mt-18"
        />
        <Field component={renderSelectField} name="terminal" cls="mb-3">
          <option value="">Seleccionar</option>
          <option value="1">Sí</option>
          <option value="0">No</option>
        </Field>
        <InputLabel label="¿Puedes ofrecer una garantía?" class="mt-18" />
        <Field component={renderSelectField} name="warranty" cls="mb-3">
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
              Guardar e ir a documentos
            </Button>
          )}
          {!refDocuments && !disabled && (
            <Button type="submit" className={"mt-50 btn-blue-general"}>
              Continuar
            </Button>
          )}
          {disabled && (
            <Button
              type="button"
              className="mt-50 btn-blue-general btn-gray-general"
              onClick={() => goToError()}
            >
              Continuar
            </Button>
          )}
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
