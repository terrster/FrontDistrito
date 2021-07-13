import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import { Row, Col, Button, Container } from 'react-bootstrap';
import HomeValidations from '../components/Validate/homeValidations';
import scroll from "../utils/scroll";
import { FieldText, FieldTextArea } from '../components/Generic/Fields';
import ReCAPTCHA from "react-google-recaptcha";



const HomeForm = (props) => {

  const goToError = () => {
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const errors = [
      nameError,
      emailError,
      messageError
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
          <Row>
            <Col lg={9}>
              <FieldText name="name" placeholder="Nombre completo" normalize="onlyLirycs" className="forceFullWidth" />
            </Col>

            <Col lg={9}>
              <FieldText name="email" placeholder="Correo" normalize="onlyEmailWithoutSpace" className="forceFullWidth" />
            </Col>

          </Row>

          <Row>
            <Col lg={7}>
              <FieldTextArea name="message" placeholder="Mensaje" className="forceFullWidth" />
            </Col>
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
                  Enviar
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
                  Enviar
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
  validate: HomeValidations,
  handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);
    formikBag.props.handleSubmit(values);
  },
  // enableReinitialize: true,
  displayName: 'HomeForm'
})(HomeForm);

