import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import CustomLoader from "../Generic/CustomLoader";
import Title from "../Generic/Title";
import LinkButton from "../Generic/LinkButton";
import { updateLoader } from "../../redux/actions/loaderActions";
import { updateAppliance } from "../../redux/actions/applianceActions";
import tito from "../../assets/img/tito-credit.png";
import Steps from "../Appliance/Steps";
import like from "../../assets/img/tito@2x.png";
import axios from '../../utils/axios';

const getType = (user) => {
	const idClient = user.idClient[user.idClient.length - 1];
	let type = null;
	if (idClient.hasOwnProperty("type")){
		type = idClient.type;
	}
	return type;
} 

const Credit = (props) => {
  const history = useHistory()
  const appliance = useSelector((state) => state.appliance.appliance);  
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [id, setId] = useState(user._id);
  const type = getType(user);
 
  const apply = () => {
    /* this.props
      .newEmptyAppliance({
        variables: {
          idClient: this.props.user.idClient.id,
        },
      })
      .then((data) => {
        let newAppliance = data.data.createEmptyAppliance;
        this.props.updateAppliance(newAppliance);
        this.props.history.push(`/credito/solicitud/${newAppliance.id}`);
        sessionStorage.setItem("applianceId", newAppliance.id);
      })
      .catch((err) => console.log(JSON.stringify(err))); */
  };

  const verify = (array) => {
		if (typeof array !== "object") return false;
		return array.length === 0 ? false : array[array.length - 1];
	}

  const updateAppliance = async () => {
	  const idClient = user.idClient[0];
	  if (idClient.appliance.length > 0){
		const appliance = idClient.appliance[idClient.appliance.length - 1];
		const applianceRequest = await axios.put(`api/appliance/${appliance._id}`, { status: true });
		if(!applianceRequest.data.hasOwnProperty("error")){
			sessionStorage.setItem('user', JSON.stringify(applianceRequest.data.user));
		}  
	  }
  }

  const getAppliance = () => {
	let linkt = "";
	const idClient = user.idClient[ user.idClient.length - 1 ];
	let appliance = verify(idClient.appliance);
	let idAmount = verify(appliance.idAmount);
	let idGeneralInfo = verify(appliance.idGeneralInfo);
	let idComercialInfo = verify(appliance.idComercialInfo);
	let idDocuments = verify(appliance.idDocuments);
	let statusDocuments = { status: false }
	if (idDocuments){
		statusDocuments.status = idDocuments.status;
	}
	if (idAmount == null || !idAmount) {
		linkt = `elige-monto/${user._id}`;
	} else if (idComercialInfo == null || !idComercialInfo) {
		linkt = `datos-comerciales/${user._id}`;
	} else if (idGeneralInfo == null || !idGeneralInfo) {
		linkt = `informacion-general/${user._id}`;
	} else if (!idDocuments || !idDocuments == null || !statusDocuments.status) {
		linkt = `documentos/${user._id}`;
	} else {
		updateAppliance();
		linkt = `credito/solicitud/${appliance._id}`;
	}
		return (
			<div className="position-relative">
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
			</div> );
	};

/*
  const getAppliances = (idClient) => {
    return <h1>No hay solicitudes</h1>
    /*dispatch(updateLoader(true));
     if (
      data !== null &&
        data !== undefined &&
          data.myAppliances !== undefined &&
          data.myAppliances.length > 0
        ) {
          this.props.updateLoader(false);
          this.props.history.push(
            `/credito/solicitud/${data.myAppliances[0].id}`
          );
          return "";
        } else {
          this.props.updateLoader(false);
          return (
            <div className="text-center mt-120">
              <Title title="Aún no tienes una solicitud con nosotros" />
              <Button className="btn-blue-general mt-50" onClick={this.apply}>
                {" "}
                SOLICITAR{" "}
              </Button>
            </div>
          
  }
*/
  
  if (type === null){
	  window.location.href = `/elige-monto/${user._id}`;
  }

  return (
    <div className="mt-72 mb-120 container">
        <div>
          <Title
            className="blackBlue coolvetica fw500 fz32 mb-16"
            title={`Hola ` + user.name}
          />
          <label className="brandonReg gray50 fz20 fw500">
            Conoce el detalle de tu solicitud
          </label>
          {getAppliance()}
		</div>	
    </div>
  );
};

export default Credit;
