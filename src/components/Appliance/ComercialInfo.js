import Title from '../Generic/Title';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
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

	const onFormSubmit = async (data) => {
		const user = JSON.parse(sessionStorage.getItem('user'));
		console.log(user);
		const id = user._id;
		const idClient = user.idClient[user.idClient.length - 1];
		//--
		if(idClient.appliance.length > 0){
			const appliance = idClient.appliance[idClient.appliance.length - 1];
			if(appliance.idComercialInfo.length > 0){
				const comercial = appliance.idComercialInfo[appliance.idComercialInfo.length - 1]
				const id = comercial._id;
				console.log(id);
				/* try {
					const res = await axios.put(`api/info-comercial/${id}`,data,{
						headers:{
							token: sessionStorage.getItem('token')
						}
					});
					// Se actualiza el usuario en session storage
					await sessionStorage.setItem('user', JSON.stringify(res.data.user));
					// Redireccionar al siguiente formulario
					history.push(`/informacion-general/${user._id}`);
				} catch (error) {
					console.log("Error de servicio",error);
				} */
			}
		}
	}

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
				/* onSubmit={data => {
					onFormSubmit(data);
				}} */
				data={props.currentComercialInfo}
				intialValues={initialValues} 
			></ComercialInfoForm>
		</div>
	);
}

/* ComercialInfo = compose(
	graphql(Mutations.CREATE_ADDRESS, { name: 'createNewAddress' }),
	graphql(Mutations.CREATE_COMERCIAL, { name: 'createNewComercialInfo' }),
	graphql(Mutations.UPDATE_COMERCIAL, { name: 'updateComercialInfo' }),
	graphql(Mutations.UPDATE_APPLIANCE, { name: 'updateApplianceGraph' }),
	graphql(Mutations.UPDATE_CLIENT_DATA, { name: 'updateClient' })
)(ComercialInfo); */

 const mapStateToProps = (state, ownProps) => {
	return {
		history: ownProps.history,
		modal: state.modal.name,
		appliance: state.appliance.appliance,
		applianceAmount: state.appliance.amount,
		applianceData: state.appliance,
		user: {
			name: "Prueba"
		},
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
