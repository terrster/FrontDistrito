import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Title from '../Generic/Title';
import { connect } from 'react-redux';
import { execToast } from '../../utils/ToastUtils';
import ComercialInfoForm from '../../forms/ComercialInfoForm';
import { variablesManager } from '../Manager/VariablesManager';
import axios from '../../utils/axios';

// Components
import Steps from './Steps';
import CustomModal from '../Generic/CustomModal';


const ComercialInfo = (props) => {

	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
	const [initialValues, setInitialValues] = useState({});
	const history = useHistory();
	
	const onFormSubmit = async (dataForm) => {
		const user = JSON.parse(sessionStorage.getItem('user'));
		const id = user._id;
		const idClient = user.idClient[user.idClient.length - 1];
		const warranty = (dataForm.warranty === "1" || dataForm.warranty === "2" || dataForm.warranty === "3") ? true : false
		const data = {
			...dataForm,
			warranty
		}
		if(idClient.appliance.length > 0){
			const appliance = idClient.appliance[idClient.appliance.length - 1];
			if(appliance.idComercialInfo.length > 0){
				const comercial = appliance.idComercialInfo[appliance.idComercialInfo.length - 1]
				const id = comercial._id;				
				try {
					const res = await axios.put(`api/info-comercial/${id}`,data,{
						headers:{
							token: sessionStorage.getItem('token')
						}
					});
					await sessionStorage.setItem('user', JSON.stringify(res.data.user));
					history.push(`/informacion-general/${user._id}`);
				} catch (error) {
					console.log("Error de servicio",error);
				} 
			} else {
				try {
					const res = await axios.post(`api/info-comercial/${id}`, data);
					await sessionStorage.setItem('user', JSON.stringify(res.data.user));
					history.push(`/informacion-general/${user._id}`);
					
				} catch (error) {
					console.log("Error de servicio",error);
				}	
			}
		} 
	}

	useEffect(() => {
		
		window.scrollTo(0, 0);
		const getData = async () => {
			const user = JSON.parse(sessionStorage.getItem('user'));
			const id = user._id;
			const idClient = user.idClient[user.idClient.length - 1];
			// Si ya tienen una solicitud, se actualiza
			if (idClient.appliance.length > 0){
				const appliance = idClient.appliance[idClient.appliance.length - 1];
				if (appliance.idComercialInfo.length > 0){
					const comercial = appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
					const id = comercial._id;
					const res = await axios.get(`api/info-comercial/${id}`, {
						headers:{
							token: sessionStorage.getItem("token")
						}
					});					
					const address = res.data.comercial.address[res.data.comercial.address.length - 1]
					const terminal = res.data.comercial.terminal ? "1" : "0"
					setInitialValues({...res.data.comercial, ...address, zipCode: '', terminal });
				}
			}
		}
		
		getData();
		
	}, []);	

	return (
		<div className="container mt-3">
			<Steps />
			<div className="text-center mb-2">
				<Title
					title="Datos del negocio"
					className="coolvetica fz42 blackBlue"
				/>
			</div>
			<CustomModal
				modalName="comercialInfoError"
				message="Error al subir los archivos. Favor de regresar a la pantalla de inicio y continúa tu solicitud."
			/>
			<ComercialInfoForm
				onSubmit={data => onFormSubmit(data)} 
				initialValues={initialValues} 
			/>
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
		applianceComercialInfo: state.appliance.comercialInfo,
		/* toast: state.app.toast.second, */
		currentAddress: state.currentAddress.currentAddress,
		currentComercialInfo: state.actionForm.comercialInfoForm
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
		updateToast: key => {
			dispatch({ type: 'UPDATE_TOAST', data: { key } });
		},
		setSameAddress: address => {
			dispatch({ type: 'SET_CURRENT_SAME_ADDRESS', data: { address } });
		},
		updateApplianceComercialInfo: comercialInfo => {
			dispatch({ type: 'UPDATE_COMERCIAL', data: { comercialInfo } });
		},
		changeTypeComercialInfoForm: (form, type, datos) => {
			dispatch({
				type: 'UPDATE_DATA_AND_TYPE_FORM',
				data: { form, type, datos }
			});
		}
	};
}; 

export default  connect(mapStateToProps, mapDispatchToProps)(ComercialInfo );
