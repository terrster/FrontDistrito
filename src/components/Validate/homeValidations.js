const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const HomeValidations = values => {
  // console.log(values);
  let errors = {};

  if (!values.name) {
    errors.name = "Debe de ingresar su nombre";
  }

  if (!values.email) {
    errors.email = "Debe de ingresar un correo";
  }
  else if (values.email.length > 0 && !isValidEmail.test(values.email)) {
    errors.email = "El correo no es válido";
  }

  if (!values.message) {
    errors.message = "Debe de ingresar un mensaje";
  }

  return errors;
};

export default HomeValidations;
