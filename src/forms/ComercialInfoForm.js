import { connect } from "react-redux";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Row, Col, Button } from "react-bootstrap";
import comercialOptions from "../models/ComercialInfoModels";
import SubtitleForm from "../components/Generic/SubtitleForm";
import { renderField, renderSelectField } from "../components/Generic/Fields";
import { validateComercialInfo } from "../components/Validate/ValidateComercialInfo";

class ComercialInfoConstructForm extends Component {
  /* CODIGO POSTAL */
  state = {
	colonias: [],
	error: null
  };

  getColonias = async codigopostal => {
    if(!codigopostal){
      this.setState({error: "Ingresa el código postal de tu negocio."}) 
    } else if (!/^[0-9]\d{4,5}/.test(codigopostal)|| (codigopostal.length > 5 || codigopostal.length < 5)){
      this.setState({error: "Ingresa un código postal válido"})
    }
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
          error: false
            });
      }else if(res.error){
        this.setState({
          error: res.error_message
        });
      }
      }
      } catch (error) {
        console.log(error.code_error);
      }
  }

  handleChangeCodigoPostal = async e => {
  	const codigopostal = e.target.value;
    this.getColonias(codigopostal)
  };

  componentDidMount(){
    const { initialValues : {zipCode} } = this.props;
    this.getColonias(zipCode)
  }


  /* FIN CODIGO POSTAL */
  render() {
    return (
      <>
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
              name="COLONIA"
              cls="mb-3"
            >
              {this.state.colonias.map((colonia, index) => {
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
            Terminal para cobrar con tarjeta (TPV)
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
      <form
        className="ml-auto mr-auto"
        style={{ maxWidth: "690px" }}
        onSubmit={handleSubmit}
      >
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
  initialValues: props.data // pull initial values from account reducer
}))(ComercialInfoForm);

export default ComercialInfoForm;
