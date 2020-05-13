import Title from '../Generic/Title';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { execToast } from '../../utils/ToastUtils';
import ComercialInfoForm from '../../forms/ComercialInfoForm';
import { variablesManager } from '../Manager/VariablesManager';

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

	getData(){
		// fetch (Peticion a la API para obtener los datos de la solicitud)
		const dataApp = {
			getAppliance: null,
			status: true,
			idAmount: null, 
			idComercialInfo: null, 
			idGeneralInfo: null, 
			idDocuments: {
				status: false
			}, 
		};
		this.setState({ loading: false, dataApp });
	}
	
	componentDidMount() {
		this.getData();
		if (!this.props.toast) {
			execToast('second');
			this.props.updateToast('second');
		}
		window.scrollTo(0, 0);
	}

	onFormSubmit = async (data, typeForm, beforeData) => {
		let p = this.props;
		let pComercial = p.currentComercialInfo;
		let { terminal, warranty } = data;
		p.updateLoader(true);
		p.changeTypeComercialInfoForm('comercialInfoForm', typeForm, beforeData);
		window.scrollTo(0, 0);
		try {
			let currentAddress = {};
			let addressId = 0;
			let comercialInfo = {};
			let address = {};
			let updatedAppliance = {};
			if (pComercial.type === 'update') {
				//this.props.setSameAddress(address.data.createAddress);
				//falta que se pueda actualizar la direccion
				let variables = await variablesManager.createComercialInfoVariables(
					data,
					pComercial.datos.address.id
				);
				variables.comercialId = pComercial.datos.id;
				comercialInfo = await p.updateComercialInfo({ variables });
				updatedAppliance = await p.updateApplianceGraph({
					variables: {
						idAppliance: p.match.params.idAppliance,
						idComercialInfo: comercialInfo.data.updateComercialInfo.id
					}
				});
			} else {
				address = await p.createNewAddress({
					variables: variablesManager.createAddressVariables(data)
				});
				p.setSameAddress(address.data.createAddress);
				let variables = await variablesManager.createComercialInfoVariables(
					data,
					address.data.createAddress.id
				);
				comercialInfo = await p.createNewComercialInfo({ variables });

				updatedAppliance = await p.updateApplianceGraph({
					variables: {
						idAppliance: p.match.params.idAppliance,
						idComercialInfo: comercialInfo.data.createComercialInfo.id
					}
				});
			}
			p.updateAppliance(updatedAppliance.data.updateAppliance);
			p.updateApplianceComercialInfo(
				updatedAppliance.data.updateAppliance.idComercialInfo
			);
			p.history.push(
				`${
					pComercial.type === 'update'
						? '/credito/solicitud/'
						: '/informacion-general/'
				}${p.match.params.idAppliance}`
			);
			this.props.updateLoader(false);
		} catch (err) {
			this.props.updateLoader(false);
			this.props.updateModal('comercialInfoError');
			window.scrollTo(0, 0);
		}
	};

	render() {
		let linkt;
		/* const { appliance } = this.props; */
		console.log(this.state);
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
				{/* <Query
					query={Queries.GET_APPLIANCE}
					variables={{ applianceId: this.props.match.params.idAppliance }}
				> */}
					{({ loading, error, data, refetch }) => {
						if (error) {
							window.location.reload();
							return false;
						}
						if (loading) {
							return false;
						}
						if (
							this.props.applianceComercialInfo &&
							data.getAppliance.idComercialInfo === null
						) {
							refetch().then(_ => {});
						}
						let currentComercialInfo =
							data.getAppliance === undefined ||
							data.getAppliance.idComercialInfo === null
								? []
								: data.getAppliance.idComercialInfo;
						let isUpdate = currentComercialInfo.length === 0 ? false : true;
						let typeForm = isUpdate ? 'update' : 'create';
						currentComercialInfo =
							currentComercialInfo.length === 0
								? {/* new ComercialInfoEntity() */}
								: {/* new ComercialInfoEntity().fromGraphQlObject(
										currentComercialInfo
								  ); */}
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
						}
						return (
							<ComercialInfoForm
								onSubmit={d => {
									this.onFormSubmit(d, typeForm, currentComercialInfo);
								}}
								data={currentComercialInfo}
							></ComercialInfoForm>
						);
					}}
				{/*</Query>*/}
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
}; 

export default  connect(mapStateToProps, mapDispatchToProps)(ComercialInfo );
