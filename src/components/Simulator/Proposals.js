import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import { Row } from 'react-bootstrap';
import PropCard from './PropCard';
import { Link } from 'react-router-dom'

const Proposals = () => {
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
	
	const changeStep = () => {
		window.location.reload()
	}

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
		        capital.push(amountFloat - payments[x]);
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

	let tasasDisplay = ["16.9%","24.6%", "47.4%", "73.1%" ]

	return (
		<div style={{maxWidth: '620px'}} className="ml-auto mr-auto">
			
			<Row className="d-flex justify-content-center">
				{ans.map( (value, index) =>
					<PropCard pay={value} tasa={tasasDisplay[index]} number={index + 1} key={index} />
				)}
			</Row>
			<div className="mt-45 mb-5 margin-reduce-buttons">
				{
					(sessionStorage.getItem('token') && sessionStorage.getItem('token') !== '') ?
					<div className="container-buttons">
						<Link className="coolvetica simulator-next-button link fz18 white" to="/home">Solicitar ahora</Link>
						<Link className="coolvetica simulator-next-button link fz18 white" to="/" onClick={changeStep} >Nueva simulación</Link>
					</div>
					:
					<div className="container-buttons">
						<Link className="coolvetica simulator-next-button link fz18 white" to="/registrate">Solicitar ahora</Link>
						<Link className="coolvetica simulator-next-button link fz18 white" to="/" onClick={changeStep} >Nueva simulación</Link>
					</div>
				}
				
			</div>
		</div>
	)
}

export default Proposals