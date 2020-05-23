import Steps from "./Steps";
import "../../css/apply.css";
import { Children } from "react";
import Title from "../Generic/Title";
import { connect } from "react-redux";
import React, { Component } from "react";
import LinkButton from "../Generic/LinkButton";
import { Button, Modal } from "react-bootstrap";
import like from "../../assets/img/tito@2x.png";
import CustomLoader from "../Generic/CustomLoader";
import tito from "../../assets/img/tito-credit.png";
import axios from '../../utils/axios';

class Appliance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props, 
			modalStatus: false,
			loading: true,
			dataApp: null,
			user: {}
		};
	}

	getData(){
		const user = JSON.parse(sessionStorage.getItem("user"));
		this.setState({user, loading: false});		
	}

	componentDidMount() {
		this.getData();
		this.props.updateCurrentUrl('credito');
		window.scrollTo(0, 0);
	}

	finishAppliance = async (data) => {
		// Petición al backend con data ? 
		/* try {
			await Appliance({
				variables: {
					idAppliance: this.props.match.params.idAppliance,
					status: true
				}
			});
			window.location.reload();
		} catch (err) {} */
	};

	verify = (array) => {
		if (typeof array !== "object") return false;
		return array.length === 0 ? false : array[array.length - 1];
	}

	getAppliance =  () => {
				if (this.state.loading) return <div></div>;
				 let linkt = "";
				const user = JSON.parse(sessionStorage.getItem("user"));
				const idClient = JSON.parse(sessionStorage.getItem("user")).idClient[
				JSON.parse(sessionStorage.getItem("user")).idClient.length - 1
				];
				let appliance = this.verify(idClient.appliance);
				let idAmount = this.verify(appliance.idAmount);
				let idGeneralInfo = this.verify(appliance.idGeneralInfo);
				let idComercialInfo = this.verify(appliance.idComercialInfo);
				let idDocuments = this.verify(appliance.idDocuments);
				
				if (idAmount == null || !idAmount) {
					linkt = `elige-monto/${user._id}`;
				} else if (idComercialInfo == null || !idComercialInfo) {
					linkt = `datos-comerciales/${user._id}`;
				} else if (idGeneralInfo == null || !idGeneralInfo) {
					linkt = `informacion-general/${user._id}`;
				} else if (!idDocuments || !idDocuments == null) {
					linkt = `documentos/${user._id}`;
				}
				if (!appliance.status || !sessionStorage.status) {
					return (
						<div className="position-relative">
							<Title
								className="blackBlue coolvetica fw500 fz32 mb-16"
								title={`Hola ` + JSON.parse(sessionStorage.getItem("user")).name}
							/>

							<div className="row">
								<div className="col-12 col-md-8 col-xl-10">
									<label className="brandonReg gray50 fz20 fw500 text-center text-md-left">
										Bienvenido a DistritoPyme, la &nbsp;#ComunidadDeCrédito
										&nbsp;más grande de México.
									</label>
								</div>
							</div>
							<img src={tito} className="apply-caracter-img" alt="tito" />
							<div className="step-box text-center">
								<div>
									<Title
										className="blackBlue coolvetica fw600 fz42 mb-16"
										title="Completa tu solicitud"
									/>
									<label className="brandonReg gray50 fz20 fw500">
										Completa el 100% de tu formulario y empieza a recibir las
										mejores opciones de crédito en menos de 48 hrs.
									</label>
								</div>
								<div className="mt-50">
									<Steps />
								</div>
								{(!appliance.idDocuments ||
									(appliance.idDocuments && !appliance.idDocuments.status)) && (
									<LinkButton link={linkt} />
								)}
							</div>
						</div>
					);
				} else {
					return (
						<div className="text-center mt-45">
							<img src={like} style={{ width: '204px' }} alt="Tito" />
							<div>
								<Title
									className="blackBlue coolvetica fw300 fz42 mb-16"
									title="¡Solicitud enviada con éxito!"
								/>
								<div className="mt-24 brandonLight fz20">
									En menos de 48 horas comenzarás a recibir las mejores ofertas{' '}
									<br />
									de crédito para tu empresa o negocio.
								</div>
								<div className="brandonBld mt-45 text-center">
									<Button
										className="appliance-button fz21 bluePrimary"
										onClick={() => this.props.history.push('/home')}
									>
										Volver al inicio
									</Button>
								</div>
							</div>
						</div>
					);
				}
	};

	handleClose = () => {
		this.setState({ modalStatus: false });
	};
	handleShow = () => {
		this.setState({ modalStatus: true });
	};

	render() {
		return (
			<div className="container mt-40 mb-120">
				{this.props.match.params.idAppliance ? (
					this.getAppliance()
				) : (
					<div>No se pudo obtener el ID de solicitud</div>
				)}

				{this.props.appliance !== undefined &&
					!this.props.appliance.status &&
					this.props.appliance.idDocuments !== undefined &&
					this.props.appliance.idDocuments != null &&
					this.props.appliance.idDocuments.status && (
					
                        <div>
								<div className="brandonBld mt-72 text-center">
									{!sessionStorage.status && (
										<Button
											className="appliance-button fz21 bluePrimary "
											value={true}
											onClick={this.handleShow}
										>
											Enviar solicitud
										</Button>
									)}
									<Modal
										show={this.state.modalStatus}
										className="text-center mt-5 "
										style={{ padding: '20px 40px !important' }}
									>
										<Modal.Body>
											<p className="text-center brandonReg fz24 blueDark fw400 margin-lados">
												¿Estás seguro que quieres enviar la solicitud?
											</p>
											<p className="text-center brandonReg fz22 blueDark fw400 margin-lados">
												Una vez enviada solo podrás hacer modificaciones
												menores.
											</p>
											<div className="text-center mt-30 flex-modal">
												<div className="margin-botton-modal-bajo">
													<Button
														className="btn-blue-general button-modal "
														onClick={e =>
															this.finishAppliance(e)
														}
													>
														Enviar
													</Button>
												</div>
												<Button
													className="btn-blue-general button-modal"
													onClick={() => this.handleClose()}
												>
													Cancelar
												</Button>
											</div>
										</Modal.Body>
									</Modal>
								</div>
                            
                        </div>
					)}    
					
			</div>
		);
	}
}

// Appliance = compose(
// 	graphql(Mutations.UPDATE_APPLIANCE, { name : 'updateAppliance' })
// )(Appliance)

const mapStateToProps = (state, ownProps) => {
	return {
		appliance: state.appliance.appliance,
		applianceData: state.appliance,
		history: ownProps.history,
		data: state.client,
		amount: state.appliance.amount ? state.appliance.amount : null,
		comercialInfo: state.appliance.comercialInfo
			? state.appliance.comercialInfo
			: null,
		generalInfo: state.appliance.generalInfo
			? state.appliance.generalInfo
			: null,
		documents: state.appliance.documents ? state.appliance.documents : null,
		user: {
			name: "Pruebas"
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateAppliance: appliance => {
			dispatch({ type: 'UPDATE_APPLIANCE', data: { appliance } });
		},
		updateAmountAppliance: amount => {
			dispatch({ type: 'UPDATE_AMOUNT_APPLIANCE', data: { amount } });
		},
		updateComercialInfo: comercialInfo => {
			dispatch({ type: 'UPDATE_COMERCIAL', data: { comercialInfo } });
		},
		updateGeneralInfo: generalInfo => {
			dispatch({ type: 'UPDATE_GENERAL', data: { generalInfo } });
		},
		updateDocuments: documents => {
			dispatch({ type: 'UPDATE_DOCUMENTS', data: { documents } });
		},
		updateUserName: name => {
			dispatch({ type: 'UPDATE_NAME', data: { name } });
		},
		updateUser: user => {
			dispatch({ type: 'UPDATE_USER', data: { user } });
		},
		updateCurrentUrl: section => {
			dispatch({ type: 'UPDATE_CURRENT_SECTION', data: { section } });
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Appliance);