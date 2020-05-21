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

class Appliance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props, 
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

	getAppliance = () => {
				if (this.state.loading) return <CustomLoader />;
				let linkt;
				const user = JSON.parse(sessionStorage.getItem("user"));
				const appliance = user.idClient[0].appliance[0];
				const idAmount = appliance.idAmount[0];
				const idComercialInfo = appliance.idComercialInfo[0];
				const idGeneralInfo = appliance.idGeneralInfo[0];
				const idDocuments = appliance.idDocuments[0];
				
				if (!appliance) return null;
				console.log(appliance);
				if (!appliance.status || !sessionStorage.status) {
					if (
						!idAmount &&
						!idComercialInfo &&
						!idGeneralInfo &&
						!idDocuments 
					) {
						linkt = `elige-monto/${idAmount}`;
					} else if (
						!idComercialInfo &&
						!idGeneralInfo &&
						!idDocuments 
					) {
						linkt = `datos-comerciales/${idComercialInfo}`;
					} else if (
						!idGeneralInfo &&
						!idDocuments 
					) {
						linkt = `informacion-general/${idGeneralInfo}`;
					} else if (!appliance.idDocuments || !appliance.idDocuments.status) {
						linkt = `documentos/${idDocuments}`;
					}
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
							 {/* <div className="step-box text-center position-relative apply-box-mt" > */} 
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
									<Steps
										first={
											idAmount && "amount"
										}
										second={
											idComercialInfo && "comercialInfo"
										}
										third={ 
											idGeneralInfo && "generalInfo"
										}
										fourth={
											idDocuments && "documents"
										}
										route={linkt}
										id={this.props.match.params.idAppliance}
									/>
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
