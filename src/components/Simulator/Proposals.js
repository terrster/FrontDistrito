import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import { Row, Button } from 'react-bootstrap';
import PropCard from './PropCard';
import { Link } from 'react-router-dom'
import Axios from "../../utils/axios";

const Proposals = (props) => {

	useEffect(() => {
        const incrementSimulatorCount = async() => {
            await Axios.post('/counter/simulator');
        }

        incrementSimulatorCount();
	}, []);
	
	const { amount, term } = useSelector(state => state.simulator);

	const amountFloat = parseFloat(amount)
	const termInt = parseInt(term);

	let tasas = [0.179,0.27,0.399,0.509];
	let payments = [];
	let totalPay = [];
	let intereses = [];
	let capital = [];
	let ans = [];
	let totalFinal = 0;
	
	// const changeStep = () => {
	// 	window.location.reload()
	// }

	for(let i = 0; i < termInt; i++){
		let aux = amountFloat/termInt;
		aux = Math.round(aux);
		payments.push(aux);
	}

	for(let j = 0; j < tasas.length; j++){
		totalPay = [];
		intereses = [];
		capital = [];
		totalFinal = 0;
		for(let x = 0; x < payments.length; x++){
		    if(x === 0){
		        capital.push(amountFloat);
            } else {
		        capital.push(capital[x-1] - payments[x]);
		    }    
		}
				
		for(let y = 0; y < capital.length; y++){
			intereses.push(capital[y]*((tasas[j] + 0.01)/360)*30);
	    }	
        for(let z = 0; z < capital.length; z++){
		    totalPay.push(payments[z]+intereses[z]);
		}
		
		/**
		 * Aqui hacemos la suma de Total Pay
		 */
		for(let xx = 0; xx < totalPay.length; xx++){
			totalFinal += totalPay[xx];
		}
		ans.push(Math.round(totalFinal/termInt));
	}

	let tasasDisplay = ["16.9%","24.6%", "47.4%", "73.1%" ];

	return (
		<div style={{maxWidth: '620px'}} className="ml-auto mr-auto">
			
			<Row className="d-flex justify-content-center">
				{ans.map( (value, index) =>
					<PropCard pay={value} tasa={tasasDisplay[index]} number={index + 1} key={index}/>
				)}
			</Row>
			<div className="mt-45 mb-5 margin-reduce-buttons">
				<div className="text-dp">
					*La tasa autorizada dependerá del proceso de evaluación de las correspondientes áreas de crédito. Montos antes de IVA. Simulación para fines informativos, no representa obligación alguna por parte de Distrito Pyme para el otorgamiento del crédito.
				</div>
				{
					(sessionStorage.getItem('token') && sessionStorage.getItem('token') !== '') ?
					<div className="container-buttons">
						<Link className="btn-blue-general mt-45 fz24 link-blue-general" to="/home" style={{width: '250px'}}>solicitar ahora</Link>
						<Button className="btn-blue-general mt-45 fz24 link-blue-general" onClick={props.setNewSimulation} style={{width: '250px'}}>nueva simulación</Button>
					</div>
					:
					<div className="container-buttons">
						<Link className="btn-blue-general mt-45 fz24 link-blue-general" to="/registrate" id="simulatorButton" style={{width: '250px'}}>solicitar ahora</Link>
						<Button className="btn-blue-general mt-45 fz24 link-blue-general" onClick={props.setNewSimulation} style={{width: '250px'}}>nueva simulación</Button>
					</div>
				}
			</div>
		</div>
	)
}

export default Proposals