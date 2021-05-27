const AlliesValidations = values => {
  // console.log(values);
  let errors = {};

  if(!values.nameMainContact){
    errors.nameMainContact = "Debe de ingresar el nombre de contacto principal";
  }

  if(!values.allieName){
    errors.allieName = "Debe de ingresar el nombre de la alianza";
  }

  if(!values.businessName){
    errors.businessName = "Debe de ingresar una razón social";
  }

  if(values.leadEmail.primary.length === 0 && values.leadEmail.secondary.length === 0 && values.leadEmail.tertiary.length === 0){
    errors.leadEmail = "Debe ingresar al menos un correo a donde llegarán los leads";
  }

  let someTypeCreditSelected = false;
  Object.keys(values.typeCredit).map(tc => {
    if(values.typeCredit[tc] === true && tc !== 'otro'){
      someTypeCreditSelected = true;
    }
  });

  if(values.typeCredit['otro'] === true && values.typeCredit['otroTxt'].length > 0){
    someTypeCreditSelected = true;
  }

  if(!someTypeCreditSelected){
    errors.typeCredit = "Debe seleccionar al menos un tipo de crédito o ingresar otro";
  }
  
  let someTaxRegimeSelected = false;
  Object.keys(values.taxRegime).map(tr => {
    if(values.taxRegime[tr]){
      someTaxRegimeSelected = !someTaxRegimeSelected;
    }
  });

  if(!someTaxRegimeSelected){
    errors.taxRegime = "Debe seleccionar al menos un régimen fiscal";
  }

  if(!values.annualSales){
    errors.annualSales = "Debe de indicar las ventas mínimas anuales";
  }

  if(!values.since){
    errors.since = "Debe de indicar desde que monto se puede solicitar";
  }

  if(!values.until){
    errors.until = "Debe de indicar hasta que monto se puede solicitar";
  }

  if(!values.sales){
    errors.sales = "Debe de indicar el porcentaje mínimo de ventas";
  }

  if(!values.antiquity){
    errors.antiquity = "Debe de indicar la antigüedad mínima aceptada";
  }

  if(!values.flexibilityCreditBureau){
    errors.flexibilityCreditBureau = "Debe de indicar la flexibilidad que puede tener el buró de crédito";
  }

  if(!values.score){
    errors.score = "Debe de indicar el score mínimo aceptado";
  }

  if(!values.ciec){
    errors.ciec = "Debe de seleccionar si la CIEC es obligatoria o no";
  }

  if(!values.warranty){
    errors.warranty = "Debe de seleccionar alguna garantía";
  }

  if(!values.acceptedLeverage){
    errors.acceptedLeverage = "Debe de indicar el apalancamiento aceptado";
  }

  let someUseOfCreditSelected = false;
  Object.keys(values.useOfCredit).map(uc => {
    if(values.useOfCredit[uc]){
      someUseOfCreditSelected = !someUseOfCreditSelected;
    }
  });

  if(!someUseOfCreditSelected){
    errors.useOfCredit = "Debe seleccionar al menos un uso para el crédito";
  }
  
  if(values.logo.length === 0){
    errors.logo = "Debe de cargar su archivo de logo";
  }
  // console.log(errors);
  return errors;
};

export default AlliesValidations; 