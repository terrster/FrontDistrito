import Steps from './Steps';
import Title from '../Generic/Title';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import AmountForm from '../../forms/AmountForm';
import CustomModal from '../Generic/CustomModal';
import { execToast } from '../../utils/ToastUtils';
import { variablesManager } from '../Manager/VariablesManager';

class Amount extends Component {
	componentDidMount = async () => {
		if (!this.props.toast) {
			execToast('register');
			this.props.updateToast('first');
		}
		window.scrollTo(0, 0);
	};

	onFormSubmit = async (data, typeForm, beforeData) => {
		let p = this.props;
		let pAmount = p.currentAmount;
		p.updateLoader(true);
		p.changeTypeAmountForm('amountForm', typeForm, beforeData);
		window.scrollTo(0, 0);
		data.whenNeed = "This doesn't work";
		try {
			let variables = await variablesManager.createAmountVariables(data);
			let amount = {};
			let id = 0;
			if (pAmount.type === 'update') {
				variables.amountId = pAmount.datos.id;
				amount = await p.updateAmount({ variables });
				id = amount.data.updateAmount.id;
			} else {
				amount = await p.createAmount({ variables });
				id = amount.data.createAmount.id;
			}

			let updatedAppliance = await p.updateApplianceGraph({
				variables: {
					idAppliance: p.match.params.idAppliance,
					idAmount: id
				}
			});
			p.updateAppliance(updatedAppliance.data);
			p.updateApplianceAmount(updatedAppliance.data.updateAppliance.idAmount);
			p.history.push(
				`${
					pAmount.type === 'update'
						? '/credito/solicitud/'
						: '/datos-comerciales/'
				}${p.match.params.idAppliance}`
			);
			p.updateLoader(false);
		} catch (err) {
			p.updateModal('amountError');
			p.updateLoader(false);
			window.scrollTo(0, 0);
		}
	};

	render() {
		let id = this.props.match.params.idAppliance;
		let linkt;
		const { appliance } = this.props;

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
		if (this.props.user === undefined) {
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
				<CustomModal
					modalName="amountError"
					message="Error al enviar los datos. Favor de intentarlo de nuevo"
				/>
				<div className="text-center">
					<Title title="Elige tu monto" className="coolvetica fz42 blackBlue" />
					<label className="brandonReg gray50 fz20 fw500 mt-2 mb-1">Selecciona tu régimen fiscal</label>
				</div>
				{/* <Query query={Queries.GET_APPLIANCE} variables={{ applianceId: id }}> */}
					{({ loading, error, data, refetch }) => {
						if (error) {
							window.location.reload();
							return false;
						}
						if (loading) {
							return false;
						}
						if (
							this.props.applianceAmount &&
							data.getAppliance.idAmount === null
						) {
							refetch().then(_ => {});
						}
						let currentAmount =
							data.getAppliance === undefined ||
							data.getAppliance.idAmount === null
								? []
								: data.getAppliance.idAmount;
						let typeForm = currentAmount.length === 0 ? 'create' : 'update';
						currentAmount =
							currentAmount.length === 0
								? {/* new AmountEntity() */} /*PARA USAR ESTAS FUNCIONES SE USA GRAPHQL */
								: {/* new AmountEntity().fromGraphQlObject(currentAmount); */}
						return (
							<AmountForm
								onSubmit={d => {
									this.onFormSubmit(d, typeForm, currentAmount);
								}}
								data={currentAmount}
							/>
						);
					}}
				{/*</Query>*/}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		history: ownProps.history,
		modal: state.modal.name,
		appliance: state.appliance.appliance,
		applianceAmount: state.appliance.amount,
		applianceData: state.appliance,
		user: state.user.user,
		toast: state.app.toast.first,
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

/* Amount = compose(
	graphql(Mutations.CREATE_AMOUNT, { name: 'createAmount' }),
	graphql(Mutations.UPDATE_AMOUNT, { name: 'updateAmount' }),
	graphql(Mutations.UPDATE_APPLIANCE, { name: 'updateApplianceGraph' })
)(Amount); */

export default connect(mapStateToProps, mapDispatchToProps)(Amount);
