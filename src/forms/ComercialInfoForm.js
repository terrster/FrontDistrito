import { connect } from "react-redux";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Row, Col, Button } from "react-bootstrap";
import comercialOptions from "../models/ComercialInfoModels";
import SubtitleForm from "../components/Generic/SubtitleForm";
import { renderField, renderSelectField, renderFieldFull } from "../components/Generic/Fields";
import { validateComercialInfo } from "../components/Validate/ValidateComercialInfo";

// CIEC
import PopUp from "./PopUp";
import Info from "../assets/img/Info.png";


class ComercialInfoConstructForm extends Component {
  /* CODIGO POSTAL */
  state = {
    cp: [],
    colonias: [],
    state: [],
    municipality: [],
    valueInitialState: "",
    valueInitialMunicipality: "Alvaro Obregon",
    valueInitialCp: "01000",
    valueInitialColonia: "San Angel",
    error: null,
    firstLoad: true,
    changeCP: false,
    touched: false,
    onlyNumbers: (nextValue, previousValue) => /^\d+$/.test(nextValue) || nextValue.length === 0 ? nextValue : previousValue,
    showModal: true
  };

  handleShow = () => {
	  this.setState((state, props) => ({
		  showModal: !state.showModal
	  }))
  }
  
  handleShowModal = (show) => {
	  this.setState({
		  showModal: show
	  })
  }

  getState = async () => {
    try {
      await fetch("https://api-sepomex.hckdrk.mx/query/get_estados")
        .then((response) => {
          return response.json();
        })
        .then((myState) => {
          const copyState = [];
          if (Array.isArray(myState.response.estado)) {
            myState.response.estado.map((estados) => {
              copyState.push(estados);
            });
            this.setState({
              state: copyState,
              error: false,
              firstLoad: false,
            });
          } else {
            console.log("El dato solicitado no es un array");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  getMunicipio = async (estado) => {
    try {
      await fetch(
        `https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/${estado}`
      )
        .then((response) => {
          return response.json();
        })
        .then((myMunicipio) => {
          const copyMunicipios = [];
          if (Array.isArray(myMunicipio.response.municipios)) {
            myMunicipio.response.municipios.map((municipio) => {
              copyMunicipios.push(municipio);
            });
            this.setState({
              municipality: copyMunicipios,
              error: false,
              firstLoad: false,
            });
          } else {
            console.log("El dato solicitado no es un array");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  getCodigoPostal = async (municipio) => {
    try {
      await fetch(
        `https://api-sepomex.hckdrk.mx/query/get_cp_por_municipio/${municipio}`
      )
        .then((response) => {
          return response.json();
        })
        .then((mycp) => {
          const copycp = [];
          if (Array.isArray(mycp.response.cp)) {
            mycp.response.cp.map((cp) => {
              copycp.push(cp);
            });
            this.setState({
              cp: copycp,
              error: false,
              firstLoad: false,
            });
          } else {
            console.log("El dato solicitado no es una array");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  getColonias = async (codigopostal) => {
    try {
      if (codigopostal.length === 5) {
        const res = await (
          await fetch(
            `https://api-sepomex.hckdrk.mx/query/info_cp/${codigopostal}`,
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
          this.setState({
            colonias: copycolonias,
            error: false,
            firstLoad: false,
          });
        } else if (res.error) {
          this.setState({
            error: res.error_message,
            firstLoad: false,
          });
        }
      } else {
        this.setState({ colonias: [] });
      }
    } catch (error) {
      console.log("No hay CP");
    }
  };

  handleChangeMunicipio = async (e) => {
    const estado = e.target.value;
    this.getMunicipio(estado);
    this.setState({ valueInitialState: e.target.value, changeMP: true });
    const changeMunicipality = () => {
      this.getMunicipio(this.state.state[0]);
    };
    changeMunicipality();
    const changeCodigoPostal = () => {
      this.getCodigoPostal(this.state.municipality[0]);
      this.setState({ changeCP: true });
    };
    changeCodigoPostal();
    const changeColonias = () => {
      console.log(this.state.cp);
      this.getColonias(this.state.cp[0]);
    };
    changeColonias();
  };

  handleChangeCp = async (e) => {
    const municipio = e.target.value;
    const changeCP = () => {
      this.getCodigoPostal(municipio);
    };
    changeCP();
    const changeColonias = () => {
      this.getColonias(this.state.cp[0]);
    };
    changeColonias();
    this.setState({ valueInitialCp: e.target.value, changeCP: true });
  };
  handleChangeColonia = async (e) => {
    const codigopostal = e.target.value;
    this.getColonias(codigopostal);
    this.setState({ valueInitialColonia: e.target.value, changeCP: true });
  };

  componentDidMount(){
    this.getState();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const idClient = user.idClient[user.idClient.length - 1];
    if (idClient.appliance.length > 0){
      const appliance = idClient.appliance[idClient.appliance.length - 1];
      if (appliance.idComercialInfo.length > 0){
        const idComercialInfo = appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
        if (idComercialInfo.address.length > 0){
          const address = idComercialInfo.address[idComercialInfo.address.length - 1];
          if (address.hasOwnProperty("state")){
            const stateUser = address.state;
            this.getMunicipio(stateUser);	
          }
          if (address.hasOwnProperty("municipality")){
            const municipality = address.municipality;
            this.getCodigoPostal(municipality);
          }
        }
      }
    }
  }

  render() {
    const onlyLirycs = (nextValue, previousValue) =>
      /^([a-z ñáéíóú]{0,60})$/i.test(nextValue) ? nextValue : previousValue;
    const onlyNumbers = (nextValue, previousValue) =>
      /^\d+$/.test(nextValue) || nextValue.length === 0
        ? nextValue
        : previousValue;
    const user = JSON.parse(sessionStorage.getItem("user"));
    return (
      <>
        <SubtitleForm subtitle="Sobre tu negocio" className="subtitle-dp text-form-dp  mb-3" />
        <Field
          component={renderField}
          type="text"
          cls="mb-3 text-dp"
          name="comercialName"
          label="Nombre comercial"
          normalize={onlyLirycs}
        />
        <Field component={renderSelectField} name="gyre" cls="mb-3 text-dp">
          <option value="">Giro...</option>
          {Object.keys(comercialOptions).map((value, key) => (
            <option value={`${value}`} key={key}>
              {comercialOptions[value].name}
            </option>
          ))}
        </Field>

        {this.state.typePerson === "PM" ? (
          <Field
            component={renderField}
            type="text"
            cls="mb-3 text-dp"
            name="businessName"
            label="Razón social"
            normalize={onlyLirycs}
          />
        ) : (
          <div></div>
          )}

        <Field
          component={renderField}
          label="Actividad específica"
          name="specific"
          cls="mb-3 text-dp"
          normalize={onlyLirycs}
        />
        <Field
          component={renderField}
          label="RFC"
          name="rfc"
          cls="mb-3 text-dp"
          maxLength={12}
          minLength={12}
        />
        <SubtitleForm subtitle="Domicilio del negocio" className="subtitle-dp text-form-dp  mt-11 mb-3" />

        <Row className="d-flex justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <Field
              component={renderField}
              label="Calle"
              name="street"
              cls="mb-3 text-dp"
              normalize={onlyLirycs}
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              label="Ext"
              name="extNumber"
              cls="mb-3 text-dp"
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              label="Int"
              name="intNumber"
              cls="mb-3 text-dp"
            />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input text-dp mt-1 mb-0"
              component="select"
              onChange={this.handleChangeMunicipio}
              name="state"
            >
              <option value="" disabled selected>
                Selecciona un Estado
              </option>
              {this.state.state.map((state, index) => {
                return (
                  <option value={state} key={state + index}>
                    {state}
                  </option>
                );
              })}
            </Field>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input text-dp mt-1 mb-3"
              component="select"
              onChange={this.handleChangeCp}
              name="municipality"
              value={this.state.valueInitialMunicipality}
            >
              <option value="" disabled selected>
                Selecciona un Municipio
              </option>
              {this.state.municipality.map((municipality, index) => {
                return (
                  <option value={municipality} key={municipality + index}>
                    {municipality}
                  </option>
                );
              })}
            </Field>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input text-dp mt-1 mb-0"
              component="select"
              onChange={this.handleChangeColonia}
              name="zipCode"
              value={this.state.valueInitialCp}
            >
              <option value="" disabled selected>
                Selecciona un Códio Postal
              </option>
              {this.state.cp.map((cp, index) => {
                return (
                  <option value={cp} key={cp + index}>
                    {cp}
                  </option>
                );
              })}
            </Field>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
              className="form-control custom-form-input text-dp mt-1 mb-0"
              component="select"
              onChange={() => this.setState({ touched: true })}
              name="town"
              cls="mb-3"
              value={this.state.valueInitialColonia}
            >
              <option value="" disabled selected>
                Selecciona una Colonia
              </option>
              {this.props.initialValues.colonias != null && !this.state.changeCP
                ? this.props.initialValues.colonias.map((colonia, index) => {
                    return (
                      <option value={colonia} key={colonia + index}>
                        {colonia}
                      </option>
                    );
                  })
                : this.state.colonias.map((colonia, index) => {
                    return (
                      <option value={colonia} key={colonia + index}>
                        {colonia}
                      </option>
                    );
                  })}
            </Field>
          </Col>


		  {user.idClient[user.idClient.length - 1].type !== "PF" && (
			<>
				<Col lg={12} md={12} sm={12}>
					<SubtitleForm
						subtitle="Clave CIEC (Opcional)"
						className="subtitle-dp text-form-dp  mt-30"
					/>
					<div onClick={() => this.handleShow()} style={{ cursor: "pointer", width: '0', height: '0' }}>
						<img
							src={Info}
							alt="More Info"
							title="More Info"
							className="positionInfo"
						/>
					</div>
					<Field component={renderFieldFull} label="CIEC" name="ciec" />
					<div className="fz18 gray50 text-dp mb-30 mt-2">
						No es obligatorio pero podrá agilizar tu solicitud de crédito a la
						mitad del tiempo. Se ingresará por única ocasión para descargar la
						información necesaria.
					</div>
				</Col>
				<PopUp show={this.state.showModal} setShow={(show) => this.handleShowModal(show)} /> 
			</>
        )}



          <Col lg={12} md={12} sm={12}>
            <label className="label-style mt-3">
              El número telefónico debe tener 10 dígitos
            </label>
            <Field
              component={renderField}
              label="Teléfono"
              name="phone"
              cls="mb-3 text-dp"
              normalize={this.state.onlyNumbers}
            />
          </Col>
        </Row>
        <SubtitleForm subtitle="¿Cuentas con alguno?" className="subtitle-dp text-form-dp mt-11 mb-3" />
        <Field
          component={renderField}
          label="Copia y pega el link de tu Sitio Web (opcional)"
          name="webSite"
          cls="mb-3 text-dp"
        />
        <Field
          component={renderField}
          label="Copia y pega el link de tu Facebook (opcional)"
          name="facebook"
          cls="mb-3 text-dp"
        />
        <Field component={renderSelectField} name="terminal" cls="mb-3 text-dp">
          <option className="brandonReg" value="">
            ¿Vendes tu producto o servicio a Estados Unidos?
          </option>
          <option className="brandonReg" value="1">
            Sí
          </option>
          <option className="brandonReg" value="0">
            No
          </option>
        </Field>
        <Field component={renderSelectField} name="warranty" cls="mb-3 text-dp">
          <option className="brandonReg" value="">
            ¿Puedes ofrecer una garantía?
          </option>
          <option className="brandonReg" value="1">
            Sí, garantía inmobiliaria.
          </option>
          <option className="brandonReg" value="2">
            Sí, activo fijo.
          </option>
          <option className="brandonReg" value="3">
            Sí, ambos.
          </option>
          <option className="brandonReg" value="4">
            No.
          </option>
        </Field>

        <div className="text-center" style={{ marginBottom: "50px" }}>
          <Button
            id="ymb-dp-comercial-submit"
            type="submit"
            className="mt-50 btn-blue-general"
          >
            Continuar
          </Button>
        </div>
      </>
    );
  }
}
let ComercialInfoForm = (props) => {
  const { handleSubmit } = props;
  return (
    <div>
      <form
        className="ml-auto mr-auto"
        style={{ maxWidth: "690px" }}
        onSubmit={handleSubmit}
      >
        <ComercialInfoConstructForm
          initialValues={props.initialValues}
        ></ComercialInfoConstructForm>
      </form>
    </div>
  );
};

ComercialInfoForm = reduxForm({
  form: "comercialInfoForm", // a unique identifier for this form
  validate: validateComercialInfo, // <--- validation function given to redux-form
  enableReinitialize: true,
})(ComercialInfoForm);

ComercialInfoForm = connect((state, props) => ({}))(ComercialInfoForm);

export default ComercialInfoForm;
