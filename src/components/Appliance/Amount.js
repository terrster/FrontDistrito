import Steps from './Steps';
import Title from '../Generic/Title';
import { connect, useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import AmountForm from '../../forms/AmountForm';
import CustomModal from '../Generic/CustomModal';
import { execToast } from '../../utils/ToastUtils';
import { variablesManager } from '../Manager/VariablesManager';
import axios from '../../utils/axios';
import { useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { updateToast } from '../../redux/actions/appActions';
import { ToastContainer } from "react-toastify";
import { Modal } from 'react-responsive-modal';
import { Row, Button, Col } from 'react-bootstrap';

const Amount = props => {
	// Redux state
	const {
		loader: { isLoading },
	  } = useSelector((state) => state);
	const toast = useSelector(state => state.app.toast);
    const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
	const [initialValues, setInitialValues] = useState({});
	const history = useHistory();
	var typePerson;

	const onFormSubmit = async (data) => {
		if(!JSON.parse(sessionStorage.getItem('user')).idClient.type){
			return 0;
		}
		window.scrollTo(0, 0);
		dispatch( updateLoader(true) );
		const user = JSON.parse(sessionStorage.getItem('user'));
		const id = user._id;
		const idClient = user.idClient;
		// Si ya tienen una solicitud, se actualiza
		if (idClient.appliance.length > 0){
			const appliance = idClient.appliance[idClient.appliance.length - 1];
			if (appliance.hasOwnProperty("idAmount")){
				const amount = appliance.idAmount;
				const id = amount._id;
				try {
					const res = await axios.put(`api/amount/${id}`,data,{
						headers:{
							token: sessionStorage.getItem('token')
						}
					});
					if (res.data.hasOwnProperty("user")){
						sessionStorage.setItem('user', JSON.stringify(res.data.user));
					}
					window.location.href = `/informacion-comercial/${user._id}`;
				} catch (error) {
					console.log("Error de servicio",error);
				}
			} else {
				try {
					const res = await axios.post(`api/amount/${id}`,data,{
						headers:{
							token: sessionStorage.getItem('token')
						}
					});
					if (res.data.hasOwnProperty("user")){
							sessionStorage.setItem('user', JSON.stringify(res.data.user));
					}
					window.location.href = `/informacion-comercial/${user._id}`;
					
				} catch (error) {
					console.log("Error de servicio",error);
				}	
			}
		} else {
			try {
				const res = await axios.post(`api/amount/${id}`,data,{
					headers:{
						token: sessionStorage.getItem('token')
					}
				});
				if (res.data.hasOwnProperty("user")){
						sessionStorage.setItem('user', JSON.stringify(res.data.user));
				}
				window.location.href = `/informacion-comercial/${user._id}`;
				
			} catch (error) {
				console.log("Error de servicio",error);
			}	
		}
		dispatch( updateLoader(false) );
	}
	
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch (updateLoader(true)) ;
		const getData = async () => {
			const user = JSON.parse(sessionStorage.getItem('user'));
			const idClient = user.idClient;
			// Si ya tienen una solicitud, se actualiza
			let amount = {}
			if (idClient.appliance.length > 0){
				const appliance = idClient.appliance[idClient.appliance.length - 1];
				if (appliance.hasOwnProperty("idAmount")){
					amount = appliance.idAmount;
					setInitialValues(amount);
				}

			}

			if(user.idClient.type){
				setInitialValues({					
					...amount,
					personType: user.idClient.type
				});
			}

		}
		if (!toast.first) {
			execToast('first');
			dispatch( updateToast(toast,'first') );
		}
		getData();
		dispatch (updateLoader(false)) ;
	}, [])		
		return (
			<div className="container mt-3">
				<Loader />
				<Steps />
				<ToastContainer />
				<CustomModal
					modalName="amountError"
					message="Error al enviar los datos. Favor de intentarlo de nuevo"
				/>
				{/* <div className="text-center">
					<Title title="Elige tu tipo de negocio" className="title-dp fz42" />	
				</div> */}
				<AmountForm
					onSubmit={data => onFormSubmit(data)}
					initialValues={initialValues}
					typePerson={typePerson}
				></AmountForm>
			</div>
		);
}

const mapStateToProps = (state, ownProps) => {
	return {
		history: ownProps.history,
		modal: state.modal.name,
		appliance: state.appliance.appliance,
		applianceAmount: state.appliance.amount,
		applianceData: state.appliance,
		currentAmount: state.actionForm.amountForm
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateLoader: isLoading => {
			dispatch({ type: 'UPDATE_LOADER', data: { isLoading } });
		},
		updateModal: name => {
			dispatch({ type: 'UPDATE_MODAL', data: { name } });
		},
		updateAppliance: appliance => {
			dispatch({ type: 'UPDATE_APPLIANCE', data: { appliance } });
		},
		updateApplianceAmount: amount => {
			dispatch({ type: 'UPDATE_AMOUNT_APPLIANCE', data: { amount } });
		},
		updateToast: key => {
			dispatch({ type: 'UPDATE_TOAST', data: { key } });
		},
		changeTypeAmountForm: (form, type, datos) => {
			dispatch({
				type: 'UPDATE_DATA_AND_TYPE_FORM',
				data: { form, type, datos }
			});
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Amount);
