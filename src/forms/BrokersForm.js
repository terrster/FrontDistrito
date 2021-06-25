import React, {useEffect} from 'react';
import { withFormik, Form, ErrorMessage, Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { FieldText, FieldTextArea, FieldCheck } from '../components/Generic/Fields';
import BrokerValidations from '../components/Validate/brokersValidations';
import scroll from "../utils/scroll";




const BrokersForms = (props) => {


  const goToError = () => {
    const nameError = document.getElementById("name-error");
    const lastnameError = document.getElementById("lastname-error");
    const secondlastnameError = document.getElementById("secondlastname-error");
    const emailError = document.getElementById("email-error");
    const mobilephoneError = document.getElementById("mobilephone-error");
    const zipError = document.getElementById("zip-error");
    const messageError = document.getElementById("message-error");
    const trmError = document.getElementById("trm-error");

    

    const errors = [
      nameError,
      lastnameError,
      secondlastnameError,
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

  return(
      <>
        <Form>

          <Row>
            <Col lg={4}>
            <FieldText name="name" placeholder="Nombre" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
            <FieldText name="lastname" placeholder="Apellido paterno" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
            <FieldText name="secondlastname" placeholder="Apellido materno" className="forceFullWidth" />
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
            <FieldText name="email" placeholder="Correo" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
            <FieldText name="mobilephone" placeholder="WhatsApp" className="forceFullWidth" />
            </Col>

            <Col lg={4}>
            <FieldText name="zip" placeholder="Código postal" className="forceFullWidth" />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
            <FieldTextArea name="message" placeholder="¿Por qué te gustaría ser Broker Digital?" className="forceFullWidth" />
            </Col>
          </Row>

          <Row>
            <div>
              <div className="metropolisReg fz12 blackBlue text-left">
                <b>Distrito Pyme</b> se compromete a proteger y respetar tu privacidad, y solo usaremos tu información
                personal para administrar tu cuenta y proporcionar los servicios que nos solicitaste.
                Consulta nuestro Aviso de privacidad
              </div>

            <Col lg={5} className="mt-2">
              <FieldCheck name="trm" label="Entiendo*" className="metropolisReg fz12 blackBlue"/>
            </Col>

              <div className="metropolisReg fz12 blackBlue text-left mt-3">
                Al hacer clic en Enviar, aceptas que <b>Distrito Pyme</b> almacene y procese la información personal suministrada arriba para contactarte.
              </div>
            </div>
          </Row>

          <div className="text-center mb-5">
          <Button type="submit" className="btn-blue-documents mt-30" onClick={() => goToError()} style={{ width: '300px' }}>Enviar</Button>
          </div>

        </Form> 
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