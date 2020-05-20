import Title from '../Generic/Title';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { execToast } from '../../utils/ToastUtils';
import ComercialInfoForm from '../../forms/ComercialInfoForm';
import { variablesManager } from '../Manager/VariablesManager';
import axios from '../../utils/axios';

// Components
import Steps from './Steps';
import CustomModal from '../Generic/CustomModal';


class ComercialInfo extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			modalStatus: false,
			loading: true,
			dataApp: null
		};
	}
	
	async componentDidMount() {
		const dataApp = {
			getAppliance: null,
			status: true,
			idAmount: null, 
			idComercialInfo: "", 
			idGeneralInfo: null, 
			idDocuments: {
				status: false
			}, 
		};
		this.setState({ loading: false, dataApp });
		if (!this.props.toast) {
			execToast('second');
			this.props.updateToast('second');
		}
		
		const res = await axios.get('api/info/comercial', {
			headers: {
				token: sessionStorage.getItem("token"),
			}
		});
		console.log("GET TO COMERCIAL INFO");
		console.log(res);
		
	}
	
	getTable = () => {
		let appliance =  {
			getAppliance: undefined,
			status: true,
			idAmount: null,
			idComercialInfo: '1', 
			idGeneralInfo: null, 
			idDocuments: {
				status: false
			}, 
		};
		const error= false;
		if (error) {
			window.location.reload();
			return false;
		}
		if (this.state.loading) {
			
			return false;
		}
		if (
			this.props.applianceComercialInfo &&
			this.state.dataApp.getAppliance.idComercialInfo === null
		) {
			/* refetch().then(_ => {}); */
			
			return false;
		}
		let currentComercialInfo =
		appliance.getAppliance === undefined ||
		appliance.idComercialInfo === null
				? []
				: appliance.idComercialInfo;
		let isUpdate = currentComercialInfo.length === 0 ? false : true;
		let typeForm = isUpdate ? 'update' : 'create';
		currentComercialInfo =
			currentComercialInfo.length === 0
				? error/* new ComercialInfoEntity()  */
				:  error/* new ComercialInfoEntity().fromGraphQlObject(
						currentComercialInfo
				  ); */
		if (isUpdate) {
			let cAddress = currentComercialInfo.address;
			for (const k in cAddress) {
				if (k !== 'id') {
					currentComercialInfo[k] = cAddress[k];
				}
			}
			currentComercialInfo.warranty = currentComercialInfo.warranty
				? '1'
				: '0';
			currentComercialInfo.terminal = currentComercialInfo.terminal
				? '1'
				: '0';
		}else{
			return (
			
				<ComercialInfoForm
					onSubmit={d => {
						this.onFormSubmit(d, typeForm, currentComercialInfo);
					}}
					data={currentComercialInfo}
				></ComercialInfoForm>
			);
		}
		
	}

	async getData(){
		// fetch (Peticion a la API para obtener los datos de la solicitud)
		try{
			const infoPost = await axios.get('api/info/comercial',{
				headers: {
					token: sessionStorage.getItem('token')
				}
			});
			console.log("Respuesta del back Get", infoPost);
		}catch(error){
			console.log("Error del get",error)
		}

		
	}

	onFormSubmit = async (data, typeForm, beforeData) => {
		try{
			const infoPost = await axios.post('api/info/comercial/store',data,{
				headers: {
					token: sessionStorage.getItem('token')
				}
			});
			console.log("Respuesta del back Post", infoPost);
			console.log("Peticion hecha");
		}catch(error){
			console.log("Error del back",error)
		}
		this.getData()
	};

	render() {
		let linkt;
		/* const { appliance } = this.props; */
		let appliance =  {
				getAppliance: null,
				status: true,
				idAmount: null, 
				idComercialInfo: null, 
				idGeneralInfo: null, 
				idDocuments: {
					status: false
				}, 
		};				
		if (
			!appliance.idAmount &&
			!appliance.idComercialInfo &&
			!appliance.idGeneralInfo &&
			!appliance.idDocuments &&
			this.props.applianceData.amount === ''
		) {
			linkt = `elige-monto/${this.props.match.params.idAppliance}`;
		} else if (
			!appliance.idComercialInfo &&
			!appliance.idGeneralInfo &&
			!appliance.idDocuments &&
			this.props.applianceData.comercialInfo === ''
		) {
			linkt = `datos-comerciales/${this.props.match.params.idAppliance}`;
		} else if (
			!appliance.idGeneralInfo &&
			!appliance.idDocuments &&
			this.props.applianceData.generalInfo === ''
		) {
			linkt = `informacion-general/${this.props.match.params.idAppliance}`;
		} else if (!appliance.idDocuments || !appliance.idDocuments.status) {
			linkt = `documentos/${this.props.match.params.idAppliance}`;
		}
		if (this.props.user.name === undefined) {
			this.props.updateUserName(appliance.idClient.idUser.name);
			this.props.updateUser(appliance.idClient.idUser);
		}
		return (
			<div className="container mt-3">
				<Steps
					first={
						(appliance.idAmount ||
							(this.props.applianceData.amount &&
								this.props.applianceData.amount !== '')) &&
						'amount'
					}
					second={
						(appliance.idComercialInfo ||
							(this.props.applianceData.comercialInfo &&
								this.props.applianceData.comercialInfo !== '')) &&
						'comercialInfo'
					}
					third={
						(appliance.idGeneralInfo ||
							(this.props.applianceData.generalInfo &&
								this.props.applianceData.generalInfo !== '')) &&
						'generalInfo'
					}
					fourth={
						appliance.idDocuments && appliance.idDocuments.status && 'documents'
					}
					route={linkt}
					id={this.props.match.params.idAppliance}
				/>
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
					{this.getTable()}
			</div>
		);
	}
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
