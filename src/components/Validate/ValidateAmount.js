export const validateAmount = values => {
    let errors = {};
    // if(!values.personType){
    //   errors.personType = "Elige un tipo de persona";
    // }
    if (!values.howMuch) {
      errors.howMuch = "Ingresa la cantidad que necesitas";
    } else if (values.howMuch < 25000) {
      errors.howMuch = "Ingresa una cantidad mayor a 25000";
    } else if (values.howMuch >= 100000000) {
      errors.howMuch = "Ingresa una cantidad no maxima a 100000000";
    }
  
    if (!values.yearSales) {
      errors.yearSales = "Ingresa tus ventas anuales";
    }
  
    // if (!values.term) {
    //   errors.term = "Elige en cuánto tiempo quieres pagarlo";
    // }
      if(!values.yearSales) {
          errors.yearSales = "Ingresa tus ventas anuales"
      } else if(!/^[+]?\d*$/.test(values.yearSales)){
          errors.yearSales = "Ingresa una cantidad válida"
      }
  
    if (!values.whyNeed) {
      errors.whyNeed = "Elige para qué lo necesitas";
    }
  
    if (!values.old) {
      errors.old = "Elige la antigüedad del negocio";
    }
  
    return errors;
  };
  