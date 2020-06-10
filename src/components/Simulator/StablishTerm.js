import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Title from '../Generic/Title';
import { Button } from 'react-bootstrap';

// REDUX ACTIONS
import {
	updateTerm,
	updateStep
} from '../../redux/actions/simulatorActions'

const StablishTerm = () => {

	const dispatch = useDispatch();
	const { term } = useSelector(state => state.simulator);

	let selectTerm = (e) => {
		let { value } = e.target
		dispatch(updateTerm(value));
	}

	const changeStep = () => {
		if(term > 0 && term !== 0 ){
			dispatch(updateStep(2))
		}
	}
 
	return(
		<div className="mr-auto ml-auto white-box mb-5 center-buttons">
			<Title className="blackBlue ls-11 lh-15 fz32 coolvetica mb-24" title="¿En cuánto tiempo quieres pagarlo?" />
			<div className="fz29 metropolisReg blackBlue fw500 lh-15 ls-11">
				Quiero pagarlo en 
				<select className="simulator-select metropolisReg" value={term} onChange={selectTerm} style={{height:'40px', fontSize:'1rem', cursor:'pointer'}}>
					<option value="0" style={{cursor: 'pointer'}} defaultValue>Elige...</option>
					<option value="3" style={{cursor: 'pointer'}}>3 meses</option>
					<option value="6" style={{cursor: 'pointer'}}>6 meses</option>
					<option value="12" style={{cursor: 'pointer'}}>12 meses</option>
					<option value="24" style={{cursor: 'pointer'}}>24 meses</option>
					<option value="36" style={{cursor: 'pointer'}}>36 meses</option>
					<option value="48" style={{cursor: 'pointer'}}>48 meses</option>
				</select>
			</div>
			<Button className="coolvetica simulator-next-button mt-45 fz24 white medium-bottom" disabled={(term !== 0) ? false : true} onClick={changeStep}>Siguiente</Button>
		</div>
	)
}

export default StablishTerm;