const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const BrokerValidations = values => {
  // console.log(values);
  let errors = {};

  if (!values.name) {
    errors.name = "Debe de ingresar su nombre";
  }

  // if (!values.lastname) {
  //   errors.lastname = "Debe de ingresar su apellido paterno";
  // }

  // if (!values.secondlastname) {
  //   errors.secondlastname = "Debe de ingresar su apellido materno";
  // }

  if (!values.email) {
    errors.email = "Debe de ingresar un correo";
  } 
  else if (values.email.length > 0 && !isValidEmail.test(values.email)) {
    errors.email = "El correo no es válido";
  }

  if (!values.mobilephone) {
    errors.mobilephone = "Debe de ingresar un número telefónico";
  }
  else if(values.mobilephone.length < 10){
    errors.mobilephone = "El número telefónico debe de ser de 10 dígitos";
  }

  if (!values.zip) {
    errors.zip = "Debe de ingresar su código postal";
  }
  else if(values.zip.length < 5){
    errors.zip = "El código postal costa de cinco dígitos";
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
