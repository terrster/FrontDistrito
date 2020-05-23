import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Title from "../Generic/Title";
import GeneralInfoForm from "../../forms/GeneralInfoForm";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../Generic/CustomModal";
import { execToast } from "../../utils/ToastUtils";
import GeneralInfoEntity from "../../entity/generalInfo";

// Components
import Steps from "./Steps";

import { updateToast, updateDate } from "../../redux/actions/appActions";
import { updateLoader } from "../../redux/actions/loaderActions";
import { updateModal } from "../../redux/actions/modalActions";
import {
  updateAppliance,
  updateApplianceGeneralInfo,
} from "../../redux/actions/applianceActions";
import {
	changeTypeGeneralInfoForm
} from '../../redux/actions/formsTypeActions';
import axios from '../../utils/axios';
import Loader from "../Loader/Loader";

const GeneralInfo = () => {
  const dispatch = useDispatch();
  const applianceGeneralInfo = useSelector((state) => state.appliance.generalInfo);
  //const appliance = useSelector((state) => state.appliance.appliance);
  const applianceData = useSelector((state) => state.appliance);
  const modal = useSelector((state) => state.modal);
  const app = useSelector((state) => state.app);
  const currentGeneralInfo = useSelector(state => state.actionForm.generalInfoForm);
  
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [initialValues, setInitialValues] = useState({});
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    setInitialValues({...initialValues, name: user.name, lastname: user.lastName, phone: user.phone });
    dispatch( updateLoader(true));
	const getData = async () => {
		const user = JSON.parse(sessionStorage.getItem('user'));
		const id = user._id;
		const idClient = user.idClient[user.idClient.length - 1];
		if (idClient.appliance.length > 0){
			const appliance = idClient.appliance[idClient.appliance.length - 1];
			if (appliance.idGeneralInfo.length > 0){
				const general = appliance.idGeneralInfo[appliance.idGeneralInfo.length - 1];
				const id = general._id;
				const res = await axios.get(`api/info-general/${id}`);		
				const date = res.data.general.birthDate.split('/');
				const day = date[0];
				const month = date[1];
				const year = date[2];
				const ref1 = res.data.general.contactWith[0];
				const name1 = ref1.name;
				const phone1 = ref1.phone;
				const relative1 = ref1.relative;
				const ref2 = res.data.general.contactWith[1];
				const name2 = ref2.name;
				const phone2 = ref2.phone;
				const relative2 = ref2.relative;
				const creditCard = res.data.general.creditCard ? "1" : "0";
				const mortgageCredit = res.data.general.mortgageCredit ? "1" : "0";
				const address = res.data.general.address[res.data.general.address.length - 1];
				const street = address.street;
				const town = address.town;
				const zipCode = address.zipCode;
				const extNumber = address.extNumber;
				const intNumber = address.intNumber;
				setInitialValues({ 
					...initialValues, ...res.data.general, day, month, year,
					name1, name2, phone1, phone2, relative1, relative2,
					mortgageCredit, creditCard, street, town, zipCode, extNumber, intNumber
				});
			}
		}
		dispatch( updateLoader(false));
	}
	getData();	

  }, []);


  const onFormSubmit = async (dataForm) => {
	dispatch( updateLoader(true));
	const user = JSON.parse(sessionStorage.getItem('user'));
	const id = user._id;
	const idClient = user.idClient[user.idClient.length - 1];
	const data = { 
		...dataForm,
		birthDate : new Date(`${dataForm.day}/${dataForm.month}/${dataForm.year}`).toLocaleDateString(),
	}
	if(idClient.appliance.length > 0){
		const appliance = idClient.appliance[idClient.appliance.length - 1];
		if(appliance.idGeneralInfo.length > 0){
			const general = appliance.idGeneralInfo[appliance.idGeneralInfo.length - 1]
			const id = general._id;				
			try {
				const res = await axios.put(`api/info-general/${id}`,data);
				await sessionStorage.setItem('user', JSON.stringify(res.data.user));
				history.push(`/documentos/${user._id}`);
			} catch (error) {
				console.log("Error de servicio",error);
			} 
		} else {
				try {
					const res = await axios.post(`api/info-general/${id}`, data);
					console.log("POST");
					console.log(res);
					await sessionStorage.setItem('user', JSON.stringify(res.data.user));
					history.push(`/documentos/${user._id}`);
				} catch (error) {
					console.log("Error de servicio",error);
				}	
			}
		} 	
	dispatch( updateLoader(false));		
  };

	const setComercialAddress = (checkboxComercialAddress) => {
		dispatch( updateLoader(true));		
		if (checkboxComercialAddress){
			const user = JSON.parse(sessionStorage.getItem('user'));
			const id = user._id;
			const idClient = user.idClient[user.idClient.length - 1];
			if (idClient.appliance.length > 0){
				const appliance = idClient.appliance[idClient.appliance.length - 1];
				if (appliance.idComercialInfo.length > 0){
					const comercial = appliance.idComercialInfo[appliance.idComercialInfo.length - 1];
					const { extNumber, intNumber, registerDate, street, town, zipCode } = comercial.address[comercial.address.length - 1];
					setInitialValues({ ...initialValues, extNumber, intNumber, registerDate, street, town, zipCode, sameAddress: true })				}
				}
		}
		else {
			const extNumber = "";
			const intNumber = "";
			const registerDate = "";
			const street = "";
			const town = "";
			const zipCode = "";
			const sameAddress = false;
			setInitialValues({  ...initialValues, extNumber, intNumber, registerDate, street, town, zipCode, sameAddress })
		}
		dispatch( updateLoader(false));		
	}	
	

  return (
    <div className="container mt-3">
      <Loader />
      <Steps />
      <div className="text-center mb-2">
        <Title
          title="Información general"
          className="coolvetica fz42 blackBlue"
        />
      </div>
      <GeneralInfoForm
        today={new Date()}
        changeDate={updateDate}
        onSubmit={(data) => {
          onFormSubmit(data);
        }}
        setInitialValues={setInitialValues}
        changeAddress={setComercialAddress}
        initialValues={initialValues}
      />
      <CustomModal
        modalName="generalInfoError"
        message="Error al subir los archivos. Favor de regresar a la pantalla de inicio y continúa tu solicitud."
      />
    </div>
  );
};

/*

const mapStateToProps = (state, ownProps) => {
	return {
		state: state,
		user : state.user.user,	
	};
};
*/

export default GeneralInfo;
