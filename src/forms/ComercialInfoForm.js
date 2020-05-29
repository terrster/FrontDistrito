import { connect } from "react-redux";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Row, Col, Button } from "react-bootstrap";
import comercialOptions from "../models/ComercialInfoModels";
import SubtitleForm from "../components/Generic/SubtitleForm";
import { renderField, renderSelectField, renderFieldFull, } from "../components/Generic/Fields";
import { validateComercialInfo } from "../components/Validate/ValidateComercialInfo";
import Info from "../assets/img/Info.png";
import PopUp from "./PopUp";

class ComercialInfoConstructForm extends Component {
  state = {
	cp: '',
	colonias: [],
	error: null,
	firstLoad: true,
    changeCP: false,
    touched: false,
    show: true
  };
  
  getColonias = async codigopostal => {
      try {
        if (codigopostal.length === 5) {
          const res = await (
            await fetch(
              `https://api-sepomex.hckdrk.mx/query/info_cp/${codigopostal}`,
              {
                method: "GET"
              }
            )
          ).json();
			const copycolonias = [];
			if(Array.isArray(res)){
				res.map(datos => {
				copycolonias.push(datos.response.asentamiento);
				});
				this.setState({
					colonias: copycolonias,
					error: false,
					firstLoad: false
				});	
			} else if(res.error) {
					this.setState({
						error: res.error_message,
						firstLoad: false
					});
			}
		} else {
			this.setState({ colonias: [] });
		}
      } 
      catch (error) {
        console.log("No hay CP");
      }
  }

  handleShow = () => this.setState({show: true});  

  handleChangeCodigoPostal = async e => {
  	const codigopostal = e.target.value;
    this.getColonias(codigopostal);
    this.setState({ changeCP: true });
  };

  /* FIN CODIGO POSTAL */
  render() {
	  
	  const user = JSON.parse(sessionStorage.getItem("user"));
	  const idClient = user.idClient[user.idClient.length - 1];
	  const appliance = idClient.appliance[idClient.appliance.length - 1];
	  const comercialInfo = appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
	  const ciec = comercialInfo.ciec;
	  
    return (
      <>
        {
			idClient.type !== "PF" && 
			(ciec == "" || ciec == null) &&
			<PopUp show={this.state.show} setShow={(value) => this.setState({show: value})} />
		}
        <SubtitleForm subtitle="Sobre tu negocio" className="mb-3" />
        <Field
          component={renderField}
          type="text"
          cls="mb-3"
          name="comercialName"
          label="Nombre comercial"
        />
        <Field component={renderSelectField} name="gyre" cls="mb-3">
          <option value="">Giro...</option>
          {Object.keys(comercialOptions).map((value, key) => (
            <option value={`${value}`} key={key}>
              {comercialOptions[value].name}
            </option>
          ))}
        </Field>
        {sessionStorage.type === "PM" ? (
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
          maxLength={12}
          minLength={12}
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
          {/*codigo postal */}
          <Col lg={6} md={6} sm={12}>
            <Field
              component={renderField}
              onChange={this.handleChangeCodigoPostal}
              label="CP"
              name="zipCode"
			/>
			{this.state.error && <span className="mb-3"><small className="error">{this.state.error}</small></span>}
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Field
			        className="form-control custom-form-input brandonReg mt-1 mb-0"
              component="select"
              onChange={() => this.setState({touched: true})}
              value={!this.state.touched && this.props.initialValues.colonias != null && !this.state.changeCP ? this.props.initialValues.colonias[0] : this.state.colonias[0]}
              name="town"
              cls="mb-3"
            >
              {this.props.initialValues.colonias != null && !this.state.changeCP? 
				  this.props.initialValues.colonias.map((colonia, index) => {
					  return (
						<option value={colonia} key={colonia + index}>
							{colonia}
						</option>
				  )})
				  : this.state.colonias.map((colonia, index) => {
					return (
						<option value={colonia} key={colonia + index}>
							{colonia}
						</option>
					);
				  })}
            </Field>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <label className="label-style">
              El número telefónico debe tener 10 dígitos
            </label>
            <Field
              component={renderField}
              label="Teléfono"
              name="phone"
              cls="mb-3"
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
              <div onClick={() => this.handleShow()} style={{ cursor: "pointer", width: '0', height: '0' }}>
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
        
        
        <SubtitleForm subtitle="¿Cuentas con alguno?" className="mt-11 mb-3" />
        <Field
          component={renderField}
          label="Copia y pega el link de tu Sitio Web (opcional)"
          name="webSite"
          cls="mb-3"
        />
        <Field
          component={renderField}
          label="Copia y pega el link de tu Facebook (opcional)"
          name="facebook"
          cls="mb-3"
        />
        <Field component={renderSelectField} name="terminal" cls="mb-3">
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
       <Field component={renderSelectField} name="warranty" cls="mb-3">
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
let ComercialInfoForm = props => {
  const { handleSubmit } = props;  
  return (
    <div>
		<form className="ml-auto mr-auto" style={{ maxWidth: "690px" }} onSubmit={handleSubmit}>
        <ComercialInfoConstructForm initialValues={props.initialValues}></ComercialInfoConstructForm>
        </form>
    </div>
  );
};

ComercialInfoForm = reduxForm({
  form: "comercialInfoForm", // a unique identifier for this form
  validate: validateComercialInfo, // <--- validation function given to redux-form
  enableReinitialize: true
})(ComercialInfoForm);

ComercialInfoForm = connect((state, props) => ({
}))(ComercialInfoForm);

export default ComercialInfoForm;
