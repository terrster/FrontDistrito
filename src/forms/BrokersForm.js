import React, { useState } from 'react';
import { withFormik, Form, ErrorMessage } from 'formik';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { FieldText, FieldTextArea, FieldCheck } from '../components/Generic/Fields';
import BrokerValidations from '../components/Validate/brokersValidations';
import scroll from "../utils/scroll";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'

const BrokersForms = (props) => {

  const goToError = () => {
    const nameError = document.getElementById("name-error");
    // const lastnameError = document.getElementById("lastname-error");
    // const secondlastnameError = document.getElementById("secondlastname-error");
    const emailError = document.getElementById("email-error");
    const mobilephoneError = document.getElementById("mobilephone-error");
    const zipError = document.getElementById("zip-error");
    const messageError = document.getElementById("message-error");
    const trmError = document.getElementById("trm-error");

    const errors = [
      nameError,
      // lastnameError,
      // secondlastnameError,
      emailError,
      mobilephoneError,
      zipError,
      messageError,
      trmError
    ];
    for (let x = 0; x < errors.length; x++) {
      if (errors[x] != null) {
        scroll(errors[x].id);
        break;
      }
    }
  }

  const onChange = value => { setButton(!value) };

  const [button, setButton] = useState(true);
  const [disabled, setDisabled] = useState(true);
  
  if (disabled && props.isValid) {
    setDisabled(false);
  }
  if (!disabled && !props.isValid) {
    setDisabled(true);
  }

  return(
      <>
      <Container>
        <Form>

          {/* <Row>
            <Col lg={4}>
            <FieldText name="name" placeholder="Nombre" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
            <FieldText name="lastname" placeholder="Apellido paterno" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
            <FieldText name="secondlastname" placeholder="Apellido materno" className="forceFullWidth" />
            </Col>
          </Row> */}

          <Row>
            <Col lg={12}>
            <FieldText name="name" placeholder="nombre completo" normalize="onlyLirycs" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
            <FieldText name="email" placeholder="correo" normalize="onlyEmailWithoutSpace" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
              <FieldText name="mobilephone" placeholder="whatsApp" normalize="onlyNumbers" maxLength={10} minLength={10} className="forceFullWidth" />
            </Col>

            <Col lg={4}>
              <FieldText name="zip" placeholder="código postal" normalize="onlyNumbers" maxLength={5} className="forceFullWidth" />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
            <FieldTextArea name="message" placeholder="cuéntanos un poco sobre tu experiencia como broker" className="forceFullWidth" />
            </Col>
          </Row>

          <Row>
            <div style={{paddingLeft:'1rem', paddingRight:'1.5rem'}}>
              <div className="metropolisReg fz12 blackBlue  text-justify">
                <b>distrito pyme</b> se compromete a proteger y respetar tu privacidad, y solo usaremos tu información
                personal para administrar tu cuenta y proporcionar los servicios que nos solicitaste.
                consulta nuestro <Link to="/privacidad" target="_blank">aviso de privacidad</Link>
              </div>

            <Col lg={5} className="mt-2">
              <FieldCheck name="trm" label="entiendo*" className="metropolisReg fz12 blackBlue"/>
            </Col>

              <div className="metropolisReg fz12 blackBlue  text-justify mt-3">
                al hacer clic en enviar, aceptas que <b>distrito pyme</b> almacene y procese la información personal suministrada arriba para contactarte.
              </div>
            </div>
          </Row>

          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6Ld2huQZAAAAANpPc8zQKPnS948P7vzt2T7t-GCF"
              onChange={onChange}
            />
          </div>

          <div className="text-center mb-5">
            {
             
             !disabled && !button ? (
                <Button 
                type="submit" 
                className="mt-50 btn-blue-general" 
                style={{ width: '300px' }}
                >
                  enviar
                </Button>
              ) : (
                <Button
                  type="button"
                  className="mt-50 btn-blue-general btn-gray-general"
                  style={{ width: '300px' }}
                  onClick={() => {
                    props.validateForm().then(errors => props.setTouched({ ...props.touched, ...errors }))
                    goToError()
                  }}
                >
                  enviar
                </Button>
              )
            }
          </div>
        </Form> 
      </Container>
      </>
  )
}

export default withFormik({
  mapPropsToValues({ initialValues }) {
    return initialValues;
  },
  validate: BrokerValidations,
  handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);
    formikBag.props.handleSubmit(values);
  },
  // enableReinitialize: true,
  displayName: 'BrokersForms'
})(BrokersForms);