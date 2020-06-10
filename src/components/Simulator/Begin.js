import React from 'react';
import Title from '../Generic/Title';
import { Button } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import { useDispatch, useSelector } from 'react-redux';

// REDUX ACTIONS
import {
	updateAmount,
	updateCont,
	updateStep
} from '../../redux/actions/simulatorActions';

const Begin = props => {

	const dispatch = useDispatch();
	const { amount, cont } = useSelector(state => state.simulator)

	let handleChange = (event, maskedvalue, floatvalue) => {
		dispatch (updateAmount(maskedvalue));
	};

	let changeStep = () => {
		let amountCopy = amount; 
		let ans;
		if (typeof amountCopy === 'string') {
			amountCopy = amountCopy.substring(1, amountCopy.length - 1);
			while (amountCopy.toString().indexOf(',') !== -1)
				amountCopy = amountCopy.toString().replace(',', '');
			ans = parseFloat(amountCopy);
		}
		if (amountCopy.length > 0 && ans !== 0) {
			dispatch(updateAmount(ans) );
			dispatch(updateStep(1));
			// UPDATE COUNT FROM DATABASE HERE <--
			dispatch(updateCont(cont + 1));
		}
	};

	return (
		<div className="center-buttons">
			<Title
				className="blackBlue ls-11 lh-15 fz32 coolvetica mb-24"
				title="¿Cuánto dinero necesitas?"
			/>
			<div className="fz29 metropolisReg blackBlue fw500 lh-15 ls-11">
				Necesito{' '}
				<CurrencyInput
					className="simulator-input"
					value={amount}
					onChangeEvent={handleChange}
					thousandSeparator=","
					prefix="$"
				/>{' '}
				para mi negocio
			</div>
			<Button
				className="coolvetica simulator-next-button mt-45 fz24 white medium-bottom"
				onClick={changeStep}
			>
				Siguiente
			</Button>
		</div>
	);
};

export default Begin;
