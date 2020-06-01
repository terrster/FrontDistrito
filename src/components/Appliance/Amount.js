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
	
	const onFormSubmit = async (data) => {
		window.scrollTo(0, 0);
		dispatch( updateLoader(true) );
		const user = JSON.parse(sessionStorage.getItem('user'));
		const id = user._id;
		const idClient = user.idClient[user.idClient.length - 1];
		// Si ya tienen una solicitud, se actualiza
		if (idClient.appliance.length > 0){
			const appliance = idClient.appliance[idClient.appliance.length - 1];
			if (appliance.idAmount.length > 0){
				const amount = appliance.idAmount[appliance.idAmount.length - 1];
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
			const id = user._id;
			const idClient = user.idClient[user.idClient.length - 1];
			// Si ya tienen una solicitud, se actualiza
			if (idClient.appliance.length > 0){
				const appliance = idClient.appliance[idClient.appliance.length - 1];
				if (appliance.idAmount.length > 0){
					const amount = appliance.idAmount[appliance.idAmount.length - 1];
					const id = amount._id;
					const res = await axios.get(`api/amount/${id}`, {
						headers:{
							token: sessionStorage.getItem("token")
						}
					});
					setInitialValues(res.data.amount);
				}
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
				<div className="text-center">
					<Title title="Elige tu monto" className="coolvetica fz42 blackBlue" />
					
				</div>
				<AmountForm
					onSubmit={data => onFormSubmit(data)}
					initialValues={initialValues}
				></AmountForm>
			</div>
		);
}
/*
class Amount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalStatus: false,
			loading: true,
			dataApp: null
		};
	}

	componentDidMount = async () => {
		const dataApp = {
			getAppliance:{
				idAmount: null, 
			},
			status: true,
			idComercialInfo: null, 
			idGeneralInfo: null, 
			idDocuments: {
				status: false
			}, 
		};
		this.setState({ loading: false, dataApp });
		if (!this.props.toast) {
			execToast('register');
			this.props.updateToast('first');
		}
		window.scrollTo(0, 0);
	};

	getTable = ()=> {

		let data = {
			getAppliance:{
				idAmount: null, 
			},
			status: true,
			idComercialInfo: '1', 
			idGeneralInfo: null, 
			idDocuments: {
				status: false
			}, 
		};
		const error = false;
		if (error) {
			window.location.reload();
			return false;
		}
		if (this.state.loading) {
			return false;
		}
		if (
			this.props.applianceAmount &&
			this.state.dataApp.getAppliance.idAmount === null
		) {
			// refetch().then(_ => {}); 
			return false;
		}
		let currentAmount =
		data.getAppliance === undefined ||
		data.getAppliance.idAmount === null
				? []
				: data.getAppliance.idAmount;
		let isUpdate = currentAmount.length === 0 ? false : true;
		let typeForm = isUpdate ? 'update' : 'create';
		currentAmount =
			currentAmount.length === 0
				?  error/* new AmountEntity() 
				: error/* new AmountEntity().fromGraphQlObject(currentAmount); 
		if(isUpdate){
			return false;
		}else{
			return (
				<AmountForm
					onSubmit={d => {
						this.onFormSubmit(d, typeForm, currentAmount);
					}}
					data={currentAmount}
				></AmountForm>
			);
		}
	}
	
	 getData= async ()=>{
		try{
			const infoPost = await axios.get('api/amount',{
				headers:{
					token: sessionStorage.getItem('token')
				}
			});
			console.log("Respuesta del back en get",infoPost);
		}catch(error){
			console.log("Error del back en get",error);
		}
	}

	onFormSubmit = async (data, typeForm, beforeData) => {
		console.log("Data del formulario",data)
		try{
			const infoPost = await axios.post('api/amount/store',data,{
				headers:{
					token: sessionStorage.getItem('token')
				}
			});
			console.log("Respuesta del back en post",infoPost);
		}catch(error){
			console.log("Error del back en post",error);
		}

		this.getData()
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
			
		}
	};

*/

const mapStateToProps = (state, ownProps) => {
	return {
		history: ownProps.history,
		modal: state.modal.name,
		appliance: state.appliance.appliance,
		applianceAmount: state.appliance.amount,
		applianceData: state.appliance,
		/* toast: state.app.toast.first, */
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
