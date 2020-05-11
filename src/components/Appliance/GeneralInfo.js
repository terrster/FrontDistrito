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
  const {
    app: {
      toast: { third },
    },
  } = useSelector((state) => state);
  

  useEffect(() => {
    if (!third) {
      execToast("second");
      dispatch(updateToast(app, "third"));
    }

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

  const onFormSubmit = async (data) => {
	/*;
	let currentGeneralInfo =
	  data.getAppliance === undefined || data.getAppliance.idGeneralInfo === null
		? []
		: data.getAppliance.idGeneralInfo;
	if (this.props.applianceGeneralInfo) {
	  currentGeneralInfo = this.props.applianceGeneralInfo;
	} */
	let isUpdate = currentGeneralInfo.length === 0 ? false : true;
	let typeForm = isUpdate ? "update" : "create";
	console.log(data); 
	console.log(typeForm);
	//console.log(beforedata);
    /* let p = this.props;
		let pGeneral = this.props.currentGeneralInfo;
		p.updateLoader(true);
		let { sameAddress } = data;
		let newAddress, idReferences, generalInfo;
		let references = variablesManager.createReferenceVariables(data);
		let variables = variablesManager.createGeneralInfoVariables(data);
		p.changeTypeGeneralInfoForm('generalInfoForm', typeForm, beforeData);
		window.scrollTo(0, 0);
		try {
			let newReferences = await this.getReferences(references);

			if (newReferences) {
				idReferences = newReferences.map(value => {
					return value.data.createReference.id;
				});
			}
			if (!sameAddress) {
				let address = await p.createAddress({
					variables: variablesManager.createAddressVariables(data)
				});
				newAddress = address.data.createAddress.id;
			} else {
				let address = await p.createAddress({ variables: p.currentAddress });
				newAddress = address.data.createAddress.id;
			}

			if (idReferences && newAddress) {
				variables.references = [
					idReferences[0],
					idReferences[1],
					idReferences[2]
				];
				variables.address = newAddress;
				if (pGeneral.type === 'update') {
					variables.generalId = p.currentGeneralInfo.datos.id;
					generalInfo = await p.updateGeneralInfo({ variables });
					//Revisar el last4 ya que en update lo regresa como nulo
					//p.changeTypeGeneralInfoForm('generalInfoForm', 'update', generalInfo.data.updateGeneralInfo);
				} else {
					generalInfo = await p.createGeneralInfo({ variables });
					let updatedAppliance = await p.updateApplianceGraph({
						variables: {
							idAppliance: p.match.params.idAppliance,
							idGeneralInfo: generalInfo.data.createGeneralInfo.id
						}
					});
					p.updateAppliance(updatedAppliance.data.updateAppliance);
					p.updateApplianceGeneralInfo(generalInfo.data.createGeneralInfo);
				}
				p.updateLoader(false);
				p.history.push(
					`${
						pGeneral.type === 'update' ? '/credito/solicitud/' : '/documentos/'
					}${p.match.params.idAppliance}`
				);
			}
		} catch (err) {
			this.props.updateModal('generalInfoError');
			this.props.updateLoader(false);
			window.scrollTo(0, 0);
		} */
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
