import React, { useState } from 'react';

import '../css/general.css';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { old, reason } from '../models/AmountModels';
import { createNumberMask  } from 'redux-form-input-masks';
import helpImg from '../assets/img/type_person/help.png'

import Title from '../components/Generic/Title';
import InputLabel from '../components/Generic/InputLabel';
import PersonType from '../components/Appliance/PersonType';
import { validateAmount } from '../components/Validate/ValidateAmount';
import { renderField, renderSelectField } from '../components/Generic/Fields';

const onlyNumbers = (nextValue, previousValue) => /^[+]?([0-9]+(?:[\,.][0-9]*)?|\,.[0-9]+)$/.test(nextValue) || nextValue.length === 0? nextValue : previousValue;
/* ^[0-9]+([,.][0-9]+)?$ */


const currencyMask = createNumberMask({
  sufix: '',
  prefix: 'MX$ ',
  decimalPlaces: 0,  
  locale: "en-US"
})


let AmountForm = props => {
	const { handleSubmit, valid } = props;
	const [disabled, setDisabled] = useState(true);

	const selectedPerson = (type) => {
		props.change('personType', type);
	}

	const goToError = () => {
		const personTypeError = document.getElementById("personType-error");
		const howMuchError = document.getElementById("howMuch-error");
		const termError = document.getElementById("term-error");
		const whyNeedError = document.getElementById("whyNeed-error");
		const yearSalesError = document.getElementById("yearSales-error");
		const oldError = document.getElementById("old-error");
		let posY = "";
		const errors = [personTypeError, howMuchError, termError, whyNeedError, yearSalesError, oldError];
		for (let x = 0; x < errors.length; x++){
			if (errors[x] != null){
				posY = errors[x].offsetTop
				break;
			}
		}
		if (posY !== ""){
			if (posY-200 < 0 ){
				window.scrollTo( 0, 0);
			} else {
				window.scrollTo( 0, posY - 200 );
			}
		}
	}

	if (disabled && valid){
		setDisabled(false);
	}
	if (!disabled && !valid){
		setDisabled(true);
	}


	return (
		<div>
			<p className="text-dp fz20 fw500 mt-2 mb-1 text-center">Selecciona tu tipo de negocio, si tienes duda presiona <img src={helpImg} width="20px" heigth="30px" /> para saber más.</p>
			<PersonType onSelectPerson={selectedPerson}/>
			<Field component={renderField} type="text" name="personType" label="secret"></Field>
			<form
				className="ml-auto mr-auto"
				style={{ maxWidth: '690px' }}
				onSubmit={handleSubmit}
			>
				<div className="text-center">
					<Title title="Elige tu monto" className="title-dp fz42" />	
				</div>
				<div className="text-center"><label className="text-dp fz20 fw500 ml-auto mt-2 mb-1">Cuéntanos un poco más sobre el monto que necesitas</label></div>
			<InputLabel label="¿Cuánto necesitas?" class="mt-18" />
			<Field
        		normalize={onlyNumbers}
				component={renderField}
				type="text"
				name="howMuch"
				label="Ej. 500000" 
				cls="text-dp"
				{...currencyMask}
			/>

			<InputLabel label="¿En cuánto tiempo quieres pagarlo?" class="mt-18" />
			<Field component={renderSelectField} name="term" cls="text-dp">
				<option value="">Elige...</option>
				<option value="3">3 meses</option>
				<option value="6">6 meses</option>
				<option value="12">12 meses</option>
				<option value="24">24 meses</option>
				<option value="36">36 meses</option>
				<option value="48">48 meses</option>
			</Field>

			<InputLabel label="¿Para qué lo necesitas?" class="mt-18" />
			<Field component={renderSelectField} type="text" name="whyNeed" cls="text-dp">
				<option value="">Elige...</option>
				{Object.keys(reason).map((value, i) => (
					<option value={value} key={i}>
						{reason[value]}
					</option>
				))}
			</Field>

			<InputLabel label="Ventas anuales" class="mt-18" />
			<Field
        		normalize={onlyNumbers}
				component={renderField}
				type="text"
				name="yearSales"
				label="Ej. 500000"
				cls="text-dp"
				{...currencyMask}
			/>
			
			<strong><span style={{color:'var(--primary-color)', fontSize: '0.7em'}} >Ventas totales en un año</span></strong>
			<InputLabel label="Antigüedad del negocio" class="mt-18" />
			<Field component={renderSelectField} type="text" name="old" cls="text-dp">
				<option value="">Elige...</option>
				{Object.keys(old).map((value, i) => (
					<option value={value} key={i}>
						{old[value]}
					</option>
				))}
			</Field>
			<div className="text-center" style={{ marginBottom: '50px' }}>
				{
					!disabled ? (
						<Button
							type="submit"
							className={"mt-50 btn-blue-general"}
							style={{ width: '250px' }}
						>
							Continuar
						</Button>
					) : (
						<Button 
							type="button"
							className="mt-50 btn-blue-general btn-gray-general"
							onClick={() => goToError()}
							style={{ width: '250px' }}
						>
							Continuar
						</Button>
					)
				}
			</div>
			</form>
		</div>
	);
};

AmountForm = reduxForm({
	form: 'amountForm', // a unique identifier for this form
	validate: validateAmount, // <--- validation function given to redux-form
	enableReinitialize : true
})(AmountForm);

export default AmountForm;
