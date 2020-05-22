import React from 'react';
import '../css/general.css';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import InputLabel from '../components/Generic/InputLabel';
import { old, reason } from '../models/AmountModels';
import PersonType from '../components/Appliance/PersonType';
import { validateAmount } from '../components/Validate/ValidateAmount';
import { renderField, renderSelectField } from '../components/Generic/Fields';

const onlyNumbers = (nextValue, previousValue) => /^\d+$/.test(nextValue) || nextValue.length === 0? nextValue : previousValue;


let AmountForm = props => {
	const { handleSubmit } = props;
	return (
		<div>
			<form
				className="ml-auto mr-auto"
				style={{ maxWidth: '690px' }}
				onSubmit={handleSubmit}
			>
				<PersonType />
			<InputLabel label="¿Cuánto necesitas?" class="mt-18" />
			<Field
        		normalize={onlyNumbers}
				component={renderField}
				type="text"
				name="howMuch"
				label="Ej. 500000"
			/>

			<InputLabel label="¿En cuánto tiempo quieres pagarlo?" class="mt-18" />
			<Field component={renderSelectField} name="term">
				<option value="">Elige...</option>
				<option value="3">3 meses</option>
				<option value="6">6 meses</option>
				<option value="12">12 meses</option>
				<option value="24">24 meses</option>
				<option value="36">36 meses</option>
				<option value="48">48 meses</option>
			</Field>

			<InputLabel label="¿Para qué lo necesitas?" class="mt-18" />
			<Field component={renderSelectField} type="text" name="whyNeed">
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
			/>
			
			<strong><span style={{color:'var(--primary-color)', fontSize: '0.7em'}} >Ventas totales en un año</span></strong>
			<InputLabel label="Antigüedad del negocio" class="mt-18" />
			<Field component={renderSelectField} type="text" name="old">
				<option value="">Elige...</option>
				{Object.keys(old).map((value, i) => (
					<option value={value} key={i}>
						{old[value]}
					</option>
				))}
			</Field>
			<div className="text-center" style={{ marginBottom: '50px' }}>
				<Button
					type="submit"
					className="mt-50 btn-blue-general"
					onClick={() => window.scrollTo()}
				>
					Continuar
				</Button>
			</div>
			</form>
		</div>
	);
};

AmountForm = reduxForm({
	form: 'amountForm', // a unique identifier for this form
	validate: validateAmount, // <--- validation function given to redux-form
	enableReinitialize: true
})(AmountForm);

AmountForm = connect((state, props) => ({
	
}))(AmountForm);

export default AmountForm;
