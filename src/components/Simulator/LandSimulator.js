import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Title from '../Generic/Title';
import '../../css/land-simulator.css'
import Begin from './Begin';
import StablishTerm from './StablishTerm';
import Proposals from './Proposals';
import CustomLoader from '../Generic/CustomLoader';

// REDUX ACTIONS
import {
	updateStep
} from '../../redux/actions/simulatorActions'

const LandSimulator = () => {

	const dispatch = useDispatch();
	const { step, amount } = useSelector(state => state.simulator)

	return (
		<div id="simulador" className={`${step < 2 ? 'bg-gray' : 'bg-gray'} pt-4 pb-2 mb-3 text-center ml-auto mr-auto plr-20 center-items`} style={{maxWidth : '1440px'}}>
			{ (step <= 2) 
				? <Title className="blackBlue fz42 coolvetica mb-18 fw500" title="Cotiza tu crédito"/>
				: <div>
					<Title className="blackBlue fz38 coolvetica mb-18 fw500" title="¡Enhorabuena!"/>				
					<Title className="blackBlue fz32 coolvetica mb-18 fw500" title="Hemos encontrado 4 ofertas de crédito para tu negocio"/>
				</div>
			}
			{	step === 0 && <Begin />	}
			{	step === 1 && amount > 0 && <StablishTerm />	}
			{	step === 2 && amount > 0 &&  setInterval(() => dispatch(updateStep(3)), 2000 ) && <CustomLoader />	}
			{	step === 3 && <Proposals />	}
		</div>
	)
}

export default LandSimulator;