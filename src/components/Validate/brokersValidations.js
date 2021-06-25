const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const BrokerValidations = values => {
  // console.log(values);
  let errors = {};

  if (!values.name) {
    errors.name = "Debe de ingresar su nombre";
  }

  if (!values.lastname) {
    errors.lastname = "Debe de ingresar su apellido paterno";
  }

  if (!values.secondlastname) {
    errors.secondlastname = "Debe de ingresar su apellido materno";
  }

  if (!values.email) {
    errors.email = "Debe de ingresar un correo";
  }

  if (!values.mobilephone) {
    errors.mobilephone = "Debe de ingresar un numero telefónico";
  }

  if (!values.zip) {
    errors.zip = "Debe de ingresar su código postal";
  }

  if (!values.message) {
    errors.message = "Debe de ingresar un mensaje";
  }

  if (!values.trm) {
    errors.trm = "Debe de seleccionar la casilla";
  }
  return errors;
};

export default BrokerValidations;
