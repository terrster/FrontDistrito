import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Card} from 'react-bootstrap';

// Components
import Title from '../Generic/Title';
import '../../css/land-simulator.css'
import Begin from './Begin';
import StablishTerm from './StablishTerm';
import Proposals from './Proposals';
import CustomLoader from '../Generic/CustomLoader';

// REDUX ACTIONS
import {
	newSimulation
} from '../../redux/actions/simulatorActions'

const LandSimulator = () => {

	const dispatch = useDispatch();
	const { step, amount, loading } = useSelector(state => state.simulator)

	const setNewSimulation = () => {
		dispatch(newSimulation());
	}

	return (
		<div id="simulador" className={`${step < 2 ? 'bg-gray' : 'bg-gray'} pt-4 pb-2 mb-3 text-center ml-auto mr-auto plr-20 center-items`} style={{maxWidth : '1440px'}}>
			{ (step <= 2) 
				? <Card.Header id="header"  className="title-dp-blue fz48  fw300 subtitle-text line-height"><span className='title-dp'> cotiza  </span>tu crédito </Card.Header>
				: <div>
					<Title className="title-dp fz38 mb-18 fw500" title="¡enhorabuena!"/>				
					<Title className="subtitle-dp fz32 mb-18 fw500" title="hemos encontrado 4 ofertas de crédito para tu negocio"/>
				</div>
			}
			{
				loading &&
				<CustomLoader />
			}
			{	step === 0 && <Begin />	}
			{	step === 1 && amount > 0 && !loading && <StablishTerm />	}
			{	step === 2 && !loading && <Proposals setNewSimulation={setNewSimulation}/>	}
		</div>
	)
}

export default LandSimulator;