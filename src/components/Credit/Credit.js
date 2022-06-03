import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import CustomLoader from "../Generic/CustomLoader";
import Title from "../Generic/Title";
import LinkButton from "../Generic/LinkButton";
import { updateLoader } from "../../redux/actions/loaderActions";
import { updateAppliance } from "../../redux/actions/applianceActions";
import tito from "../../assets/img/enviado_chava-01.webp";
import Steps from "../Appliance/Steps";
import like from "../../assets/img/tito@2x.png";
import axios from "../../utils/axios";

const getType = (user) => {
  const idClient = user.idClient;
  let type = null;
  if (idClient.hasOwnProperty("type")) {
    type = idClient.type;
  }
  return type;
};

const Credit = (props) => {
  const history = useHistory();
  const appliance = useSelector((state) => state.appliance.appliance);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [id, setId] = useState(user._id);
  const type = getType(user);

  const verifyAppliance = (array) => {
    if (typeof array !== "object") return false;
    return array.length === 0 ? false : array[array.length - 1];
  };

  const verify = (object, property) => {
	return object.hasOwnProperty(property);
}

  const updateAppliance = async () => {
    const idClient = user.idClient[0];
    if (idClient.appliance.length > 0) {
      const appliance = idClient.appliance[idClient.appliance.length - 1];
      const applianceRequest = await axios.put(
        `api/appliance/${appliance._id}`,
        { status: true }
      );
      if (!applianceRequest.data.hasOwnProperty("error")) {
        sessionStorage.setItem(
          "user",
          JSON.stringify(applianceRequest.data.user)
        );
      }
    }
  };

  const getAppliance = () => {
    let linkt = "";
    const idClient = user.idClient;
    let appliance = verifyAppliance(idClient.appliance);
    let idAmount = verify(appliance, "idAmount");
    let idGeneralInfo = verify(appliance, "idGeneralInfo");
    let idComercialInfo = verify(appliance, "idComercialInfo");
    let idDocuments = verify(appliance, "idDocuments");
    let statusDocuments = { status: false };
    if (idDocuments) {
      statusDocuments.status = idDocuments.status;
    }
    if (idAmount == null || !idAmount) {
      linkt = `elige-monto/${user._id}`;
    } else if (idComercialInfo == null || !idComercialInfo) {
      linkt = `datos-comerciales/${user._id}`;
    } else if (idGeneralInfo == null || !idGeneralInfo) {
      linkt = `informacion-general/${user._id}`;
    } else if (
      !idDocuments ||
      !idDocuments == null ||
      !statusDocuments.status
    ) {
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
              className="title-dp fw600 fz42 mb-16"
              title="Completa tu solicitud"
            />
            <label className="subtitle-dp fz20 fw500">
              completa el 100% de tu solicitud y empieza a recibir las mejores
              opciones de crédito en menos de 15 min.
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

  return (
    <div className="mt-72 mb-120 container">
      <div>
        <Title
          className="title-dp fw500 fz32 mb-16"
          title={`Hola ` + user.name}
        />
        <label className="subtitle-dp fz20 fw500">
          conoce el detalle de tu solicitud
        </label>
        {getAppliance()}
      </div>
    </div>
  );
};

export default Credit;
