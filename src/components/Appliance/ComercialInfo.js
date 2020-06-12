import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Title from '../Generic/Title';
import { connect } from 'react-redux';
import { execToast } from '../../utils/ToastUtils';
import ComercialInfoForm from '../../forms/ComercialInfoForm';
import { variablesManager } from '../Manager/VariablesManager';
import axiosBase from 'axios';
import axios from '../../utils/axios';

// Components
import Steps from './Steps';
import CustomModal from '../Generic/CustomModal';
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { ToastContainer } from "react-toastify";
import { updateToast } from '../../redux/actions/appActions';

const ComercialInfo = (props) => {
	const dispatch = useDispatch();
	// Redux state
	const { loader: { isLoading } } = useSelector((state) => state);
	const toast = useSelector((state) => state.app.toast);


	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
	const [initialValues, setInitialValues] = useState({});
	const [municipality, setMunicipality] = useState('');
	const [state, changeState] = useState('');
	const history = useHistory();

	const onFormSubmit = async (dataForm) => {		
		dispatch( updateLoader(true) );
		const user = JSON.parse(sessionStorage.getItem('user'));
		const id = user._id;
		const idClient = user.idClient[user.idClient.length - 1];
		const warranty = (dataForm.warranty === "1" || dataForm.warranty === "2" || dataForm.warranty === "3") ? true : false
		const data = {
			...dataForm,
			municipality,
			state,
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
					sessionStorage.setItem('user', JSON.stringify(res.data.user));
					window.location.href = `/informacion-general/${user._id}`;
				} catch (error) {
					console.log("Error de servicio",error);
				} 
			} else {
				try {
					const res = await axios.post(`api/info-comercial/${id}`, data);
					sessionStorage.setItem('user', JSON.stringify(res.data.user));
					window.location.href = `/informacion-general/${user._id}`;
				} catch (error) {
					console.log("Error de servicio",error);
				}	
			}
		} 
		dispatch( updateLoader(false) );
	}

	useEffect(() => {
		if (!toast.second) {
			execToast('second');
			dispatch(updateToast(toast, 'second'));
		}
		window.scrollTo(0, 0);
		const getData = async () => {
			dispatch( updateLoader(true) );
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
					const terminal = res.data.comercial.terminal ? "1" : "0";
					let colonias = [];
					const coloniasRequest = await axiosBase.get(`https://api-sepomex.hckdrk.mx/query/info_cp/${address.zipCode}`);              
					if(Array.isArray(coloniasRequest.data)){
						coloniasRequest.data.map(datos => {
							colonias.push(datos.response.asentamiento);
						});
					} else if(coloniasRequest.error) {
						colonias = null;
					}
					setInitialValues({...res.data.comercial, ...address, terminal, colonias });
				}
			}
			dispatch( updateLoader(false) );
		}
		
		getData();
		
	}, []);	

	return (
		<div className="container mt-3">
			<Loader />
			<Steps />
			<ToastContainer />
			<div className="text-center mb-2">
				<Title
					title="Datos del negocio"
					className="title-dp fz42"
				/>
			</div>
			<CustomModal
				modalName="comercialInfoError"
				message="Error al subir los archivos. Favor de regresar a la pantalla de inicio y continúa tu solicitud."
			/>
			<ComercialInfoForm
				state={state}
				changeState={changeState}
				municipality={municipality}
				setMunicipality={setMunicipality}
				onSubmit={data => onFormSubmit(data)} 
				initialValues={initialValues} 
			/>
		</div>
	);
}

 /* const mapStateToProps = (state, ownProps) => {
	return {
		history: ownProps.history,
		modal: state.modal.name,
		appliance: state.appliance.appliance,
		applianceAmount: state.appliance.amount,
		applianceData: state.appliance,
		applianceComercialInfo: state.appliance.comercialInfo,
		toast: state.app.toast.second, 
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
}; */ 

export default  /* connect(mapStateToProps, mapDispatchToProps)( */ComercialInfo;  //)
