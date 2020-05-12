import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import CustomLoader from "../Generic/CustomLoader";
import Title from "../Generic/Title";
import { updateLoader } from "../../redux/actions/loaderActions";
import { updateAppliance } from "../../redux/actions/applianceActions";

const Credit = (props) => {
  const history = useHistory()
  const appliance = useSelector((state) => state.appliance.appliance);
  //const user = useSelector((state) => state.user.user);
  const user = null;
  let id =
    sessionStorage.getItem("applianceId") !== undefined
      ? sessionStorage.getItem("applianceId")
      : this.props.match.params.idAppliance;
  let type = sessionStorage.getItem("type");
  useEffect(() => {
    if (user) {
      if (user.idClient.type != null) {
        sessionStorage.setItem("type", user.idClient.type);
      }
    }
  }, []);

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
          ); */
  }

  return (
    <div className="mt-72 mb-120 container">
      {!id && user ? (
        <div>
          <Title
            className="blackBlue coolvetica fw500 fz32 mb-16"
            title={`Hola ` + sessionStorage.getItem("nameUser")}
          />
          <label className="brandonReg gray50 fz20 fw500">
            Conoce el detalle de tu solicitud
          </label>
          {type !== null && typeof type === "string" && type !== "null"
            ? getAppliances(user.idClient.id)
            : (window.location.href = `/home`)}
        </div>
      ) : (
        <div
          className="text-center brandonReg fz32"
          style={{ marginTop: "200px", marginBottom: "200px" }}
        >
          {id !== undefined &&
          id !== null &&
          type !== null &&
          typeof type == "string" &&
          type !== "null"
            ? history.push(`/credito/solicitud/` + id)
            : (window.location.href = `/home`)}
          Regresa a <i>"Mi cuenta"</i> para que podamos cargar todas las
          solicitudes de tu perfil.
        </div>
      )}
    </div>
  );
};
/* 
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    appliance: state.appliance.appliance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserName: (name) => {
      dispatch({ type: "UPDATE_NAME", data: { name } });
    },
    updateUser: (user) => {
      dispatch({ type: "UPDATE_USER", data: { user } });
    },
  };
};
 */
export default Credit;
