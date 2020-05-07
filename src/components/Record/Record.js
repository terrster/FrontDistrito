import React, { Component } from "react";
import { connect } from "react-redux";
import Title from "../Generic/Title";
import CustomLoader from "../Generic/CustomLoader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Files from "./Files";
import Credits from "./Credits";
import Rejected from "./Rejected";
import { Col, Row } from "react-bootstrap";

let client;

const Record = (props) => {
  const getAppliances = (idClient) => {
    // Hacer peticion con el idClient y obtener las solicitudes, guardandolas en una variable llamada data
    const data = undefined;
    if (data !== undefined && data.myAppliances.length !== 0) {
      this.props.updateLoader(false);
      return (
        <Tabs>
          <TabList className="coolvetica ulist">
            <Tab>Propuestas de crédito</Tab>
            <Tab>Créditos aprobados</Tab>
            <Tab>Motivo de Rechazo</Tab>
          </TabList>

          <TabPanel>
            <Col className="text-center mt-120 mb-120 fz17 brandonReg gray24">
              <div className="">Aún no tienes ninguna propuesta</div>
            </Col>
          </TabPanel>
          <TabPanel>
            <Col className="text-center mt-120 mb-120 fz17 brandonReg gray24">
              <div className="">Aún no tienes ningun credito aprobado</div>
            </Col>
          </TabPanel>
          <TabPanel>
            <Col className="text-center mt-120 mb-120 fz17 brandonReg gray24">
              <div className="">Aún no tienes ninguna propuesta rechazada</div>
            </Col>
          </TabPanel>
        </Tabs>
      );
    } else {
      this.props.updateLoader(false);

      return (
        <div className="text-center mt-120">
          <Title title="Aún no tienes una solicitud con nosotros" />
        </div>
      );
    }
  };

  const data = {
	  getAppliance: {
		  proposals: []
	  }
  }
  //let id = (sessionStorage.getItem('applianceId') !==  undefined) ? sessionStorage.getItem('applianceId') :this.props.match.params.idAppliance;
  let id =
    sessionStorage.getItem("idClient") !== undefined
      ? sessionStorage.getItem("idClient")
      : null;
  //Se coloca el componente de forma provisional ya que la mutation no funciona
  return (
    <div className="container mt-40 mb-120">
      <Title
        className="blackBlue coolvetica fw500 fz32 mb-16"
        title={`Hola ` + sessionStorage.getItem("nameUser")}
      />
      <Tabs>
        <TabList className="coolvetica ulist">
          <Tab>Propuestas de crédito</Tab>
          <Tab>Créditos aprobados</Tab>
          <Tab>Motivo de Rechazo</Tab>
        </TabList>

        <TabPanel>
          <Files proposals={data.getAppliance.proposals} />
        </TabPanel>
        <TabPanel>
          <Credits client={client} />
        </TabPanel>
        <TabPanel>
          <Rejected client={client} />
        </TabPanel>
      </Tabs>
      {id !== undefined && id !== null ? (
        getAppliances(id)
      ) : (
        <div className="text-center mt-120">
          <Title title="Aún no tienes una solicitud con nosotros" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoader: (isLoading) => {
      dispatch({ type: "UPDATE_LOADER", data: { isLoading } });
    },
    updateUser: (user) => {
      dispatch({ type: "UPDATE_USER", data: { user } });
    },
    updateCurrentUrl: (section) => {
      dispatch({ type: "UPDATE_CURRENT_SECTION", data: { section } });
    },
  };
};

export default Record;
