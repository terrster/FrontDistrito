import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, Button, Container, Alert,} from 'react-bootstrap';
import HomeValidations from '../components/Validate/homeValidations';
import scroll from "../utils/scroll";
import ReCAPTCHA from "react-google-recaptcha";
import "../css/doubts.css";

const HomeForm = (props) => {

	const onlyEmailWithoutSpace = (e) => 
	/^$|^[^\s]*[\w-\.\@]+$/i.test(e.target.value) && e.target.value.length > 0 ? 
	props.setFieldValue(e.target.name, e.target.value) : 
	props.setFieldValue(e.target.name, e.target.value.substring(0, e.target.value.length - 1));

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

  useEffect(() => {
    if(props.success){
      props.resetForm({});
    }
  }, [props.success])

  return(
    <>
      <Container>
        <Form>
          <Row>
            <Col lg={9}>
            <h1> contáctanos</h1> 

            </Col>
            <Col lg={9}>
              <Field name="name" placeholder="nombre completo" className="metropolisReg fz20 mb24 input-doubt mb-2 mx-auto"/>
              <ErrorMessage name={"name"} render={msg => <div id={`name-error`} className="error mb-1">{msg}</div>}/>
            </Col>

            <Col lg={9}>
              <Field name="email" placeholder="correo" className="metropolisReg fz20 mb24 input-doubt mb-2 mx-auto" onKeyUp={(e) => {onlyEmailWithoutSpace(e)}}/>
              <ErrorMessage name={"email"} render={msg => <div id={`email-error`} className="error mb-1">{msg}</div>}/>
            </Col>

            <Col lg={9}>
              <Field as="textarea" name="message" placeholder="mensaje" className="metropolisReg fz20 mb24 input-doubt mb-2 mx-auto"/>
              <ErrorMessage name={"message"} render={msg => <div id={`message-error`} className="error">{msg}</div>}/>
            </Col>

            <Col lg={9}>
              {
                  props.success.show &&
                  <Alert variant="success">
                      <strong>{props.success.msg}</strong>
                  </Alert>
              }
              {
                  props.error.show &&
                  <Alert variant="danger">
                      <strong>{props.error.msg}</strong>
                  </Alert>
              }
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
                      className="mt-50 contact-button"
                     
                    >
                      Enviar
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="mt-50 contact-button"
                   
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
            </Col>
          </Row>
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

