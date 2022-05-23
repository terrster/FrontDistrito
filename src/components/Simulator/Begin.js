import React, { useState } from 'react';
import Title from '../Generic/Title';
import { Button } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/land-simulator.css'


// REDUX ACTIONS
import {
	updateAmount,
	updateCont,
	updateStep
} from '../../redux/actions/simulatorActions';


const Begin = props => {

	const dispatch = useDispatch();
	const { amount, cont } = useSelector(state => state.simulator)
	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState(false);

	let handleChange = (event, maskedvalue, floatvalue) => {
		if (floatvalue >= 25000){
			setError(false);
			setDisabled(false);
		} else {
			setError(true)
		}
		dispatch (updateAmount(maskedvalue));
	};

	let changeStep = () => {
		let amountCopy = amount; 
		let ans;
		if (typeof amountCopy === 'string') {
			amountCopy = amountCopy.substring(1, amountCopy.length);
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

	const webstyle = {
		width: '80%',
		marginTop: '2rem'
	}
	const mobilestyle = {
		width: '100%',
		marginTop: '1.5rem'
	}
	return (
		<div className="center-buttons align-self-center" style={props.estado.estado === 0 ? webstyle : mobilestyle}>
			<Title
				className="title-dp ls-11 lh-15 fz32 mb-24 lg1"
				title="¿cuánto dinero necesitas?"
			/>
			<div className="fz29 text-dp fw500 lh-15 ls-11">
				necesito{' '}
				<CurrencyInput
					className="simulator-input"
					value={amount}
					onChangeEvent={handleChange}
					thousandSeparator=","
					prefix="$"
					precision="0"
				/>{' '}
				para mi negocio
			</div>
			{ error && <strong><span style={{color:'var(--primary-color)', fontSize: '0.8em'}} >debe ingresar una cantidad mayor a 25000</span></strong>
			}
			
			<Button
				className="simulator-button  ml-auto mr-auto mt-30"
				style={{ cursor: error ? "not-allowed" : "pointer", width: '100%' }}
				disabled={disabled}
				onClick={changeStep}
			>
				siguiente
			</Button>
		</div>
	);
};

export default Begin;
