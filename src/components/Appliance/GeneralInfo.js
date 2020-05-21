import React, { useState, useEffect } from "react";
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

const GeneralInfo = () => {
  const dispatch = useDispatch();
  const applianceGeneralInfo = useSelector(
    (state) => state.appliance.generalInfo
  );
  //const appliance = useSelector((state) => state.appliance.appliance);
  const applianceData = useSelector((state) => state.appliance);
  const modal = useSelector((state) => state.modal);
  const app = useSelector((state) => state.app);
  const currentAddress = useSelector(state => state.currentAddress.address);
  const currentGeneralInfo = useSelector(state => state.actionForm.generalInfoForm);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [initialValues, setInitialValues] = useState({});
  

  useEffect(() => {
    const getData = async() => {
		const idUser = user._id;
		const { data } = await axios.get(`api/info-general/${idUser}`, {
			headers: {
				token: sessionStorage.getItem("token")
			}
		});
		if(data.general){
			let general = data.general;
			general.creditCard = data.general.creditCard ? "1" : "0";
			general.mortgageCredit = data.general.mortgageCredit ? "1" : "0";
			setInitialValues({ ...data.general, ...data.general.address[0], name: user.name, lastname: user.lastName });
		}
	}
	getData();

  }, []);

  const getReferences = async (refArr) => {
    let references = refArr.map(async (value) => {
      const data = await this.props.createReference({
        variables: value,
      });
      return data;
    });
    return Promise.all(references);
  };

  const onFormSubmit = async (dataForm) => {
	const idUser = user._id;
	const userRequest = await axios.get(`api/user/${idUser}`, {
		headers: {
			token: sessionStorage.getItem("token")
		}
	});
	const myUser = userRequest.data.user;
	const idClient = myUser.idClient.pop();
	if (idClient.idGeneralInfo.length > 0){ // Si existe un registro, se actualiza
		const idGeneralInfo = idClient.idGeneralInfo.pop();
		const res = await axios.put(`api/info-general/${idGeneralInfo}`, dataForm, {
			headers: {
				token: sessionStorage.getItem("token")
			}
		});
		console.log(res);
	} else { // En caso de no existir registro, se crea
	  console.log("POST")
	}
	  
	  /*
	const { data } = await axios.post(`api/info-general/`, dataForm ,{
		headers: {
			token: sessionStorage.getItem("token")
		}
	});
	console.log(data);
	// Prueba de update
	
	const idInfo = JSON.parse(sessionStorage.getItem("user")).idClient[0].idGeneralInfo[0];
	
	* * */
	
  };

  // Datos de prueba
  //let id = this.props.match.params.idAppliance;
  let id = "12312312312312"; // id de prueba
  let linkt;
  let appliance = {
    idAmount: null,
    idComercialInfo: null,
    idGeneralInfo: null,
    idDocuments: null,
  }
  if (
    !appliance.idAmount &&
    !appliance.idComercialInfo &&
    !appliance.idGeneralInfo &&
    !appliance.idDocuments &&
    applianceData.amount === ""
  ) {
    linkt = `elige-monto/${id}`;
  } else if (
    !appliance.idComercialInfo &&
    !appliance.idGeneralInfo &&
    !appliance.idDocuments &&
    applianceData.comercialInfo === ""
  ) {
    linkt = `datos-comerciales/${id}`;
  } else if (
    !appliance.idGeneralInfo &&
    !appliance.idDocuments &&
    applianceData.generalInfo === ""
  ) {
    linkt = `informacion-general/${id}`;
  } else if (!appliance.idDocuments || !appliance.idDocuments.status) {
    linkt = `documentos/${id}`;
  }
  /* if (this.props.user === undefined) {
    dispatch(updateUserName(appliance.idClient.idUser.name));
    dispatch(updateUser(appliance.idClient.idUser));
  } */
  return (
    <div className="container mt-3">
      <Steps
        first={
          (appliance.idAmount ||
            (applianceData.amount &&
              applianceData.amount !== "")) &&
          "amount"
        }
        second={
          (appliance.idComercialInfo ||
            (applianceData.comercialInfo &&
              applianceData.comercialInfo !== "")) &&
          "comercialInfo"
        }
        third={
          (appliance.idGeneralInfo ||
            (applianceData.generalInfo &&
             applianceData.generalInfo !== "")) &&
          "generalInfo"
        }
        fourth={
          appliance.idDocuments && appliance.idDocuments.status && "documents"
        }
        route={linkt}
        id={id}
      />
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
        initialValues={initialValues}
        data={currentGeneralInfo}
        id={id}
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
