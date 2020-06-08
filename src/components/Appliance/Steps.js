import React from "react";
import { useSelector } from 'react-redux';
import "../../css/progress-tracker.css";
import "../../css/custom-progress.css";
import { Link } from "react-router-dom";

const Steps = (props) => {
	
	const verify = (array) => {
		if (typeof array !== "object") return false;
		return array.length === 0 ? false : array[array.length - 1];
	}
	
  let linkt = "";
  const user = JSON.parse(sessionStorage.getItem("user"));
  const idClient = JSON.parse(sessionStorage.getItem("user")).idClient[
    JSON.parse(sessionStorage.getItem("user")).idClient.length - 1
  ];
  let appliance = verify(idClient.appliance);
  let idAmount = verify(appliance.idAmount);
  let idGeneralInfo = verify(appliance.idGeneralInfo);
  let idComercialInfo = verify(appliance.idComercialInfo);
  let idDocuments = verify(appliance.idDocuments);
  let statusDocuments = { status: false };
  if (idDocuments){
	  statusDocuments.status = idDocuments.status;
  }

  let activeClass = {
    amount: { class: "is-complete" },
    comercialInfo: { class: "is-complete" },
    generalInfo: { class: "is-complete" },
    documents: { class: "is-complete" },
  };

  if (idAmount == null || !idAmount) {
    linkt = `elige-monto/${user._id}`;
  } else if (idComercialInfo == null || !idComercialInfo) {
    linkt = `datos-comerciales/${user._id}`;
  } else if (idGeneralInfo == null || !idGeneralInfo) {
    linkt = `informacion-general/${user._id}`;
  } else if ((!idDocuments || !idDocuments == null) && !statusDocuments.status) {
    linkt = `documentos/${user._id}`;
  }

  const first = idAmount ? "amount" : "";
  const second = idComercialInfo ? "comercialInfo" : "";
  const third = idGeneralInfo ? "generalInfo" : "";
  const fourth = idDocuments && statusDocuments.status ? "documents" : "";

  const route = linkt;
  const id = user._id;

  return (
    <div className="step-container">
      <ul className="progress-tracker progress-tracker--text progress-tracker--center progress-tracker--spaced">
        <li className="progress-step is-complete">
          <span className="progress-marker custom">
            <span className="imagen" style={{ width: "200px" }}></span>
          </span>
          <span className="progress-text">
            <h5
              className="progress-title brandonReg fw500"
              style={{ color: "#4f4f4f" }}
            >
              Registro
            </h5>
          </span>
        </li>

        <li
          className={
            first && activeClass[first].hasOwnProperty("class") 
              ? `progress-step ${activeClass[first].class}`
              : "progress-step"
          }
        >
          {first !== undefined &&
          first !== null &&
          first !== "" ? (
            <Link to={`/elige-monto/${id}`}>
              <span className="progress-marker custom">
                <span className="imagen2" style={{ width: "200px" }}></span>
              </span>
            </Link>
          ) : (
            <span className="progress-marker custom"></span>
          )}
          <span className="progress-text">
            <h5
              className="progress-title brandonReg fw500"
              style={{ color: "#4f4f4f" }}
            >
              {first !== undefined &&
              first !== null &&
              first !== "" ? (
                <Link to={`/elige-monto/${id}`} className="form-link">
                  Elige tu monto
                </Link>
              ) : (
                <label className="form-link">Elige tu monto</label>
              )}
            </h5>
          </span>
        </li>

        <li
          className={
            second && activeClass[second].hasOwnProperty("class") 
              ? `progress-step ${activeClass[second].class}`
              : `progress-step`
          }
        >
          {second !== undefined &&
          second !== null &&
          second !== "" ? (
            <Link to={`/datos-comerciales/${id}`}>
              <span className="progress-marker custom">
                <span className="imagen3" style={{ width: "200px" }}></span>
              </span>
            </Link>
          ) : (
            <span className="progress-marker custom"></span>
          )}
          <span className="progress-text">
            <h5
              className="progress-title brandonReg fw500"
              style={{ color: "#4f4f4f" }}
            >
              {second !== undefined &&
              second !== null &&
              second !== "" ? (
                <Link
                  to={`/datos-comerciales/${id}`}
                  className="form-link"
                >
                  Datos del negocio
                </Link>
              ) : (
                <label className="form-link">Datos del negocio</label>
              )}
            </h5>
          </span>
        </li>

        <li
          className={
            third && activeClass[third].hasOwnProperty("class") 
              ? `progress-step ${activeClass[third].class}`
              : "progress-step"
          }
        >
          {third !== undefined &&
          third !== null &&
          third !== "" ? (
            <Link to={`/informacion-general/${id}`}>
              <span className="progress-marker custom ">
                <span className="imagen4" style={{ width: "200px" }}></span>
              </span>
            </Link>
          ) : (
            <span className="progress-marker custom "></span>
          )}
          <span className="progress-text">
            <h5
              className="progress-title brandonReg fw500"
              style={{ color: "#4f4f4f" }}
            >
              {third !== undefined &&
              third !== null &&
              third !== "" ? (
                <Link
                  to={`/informacion-general/${id}`}
                  className="form-link"
                >
                  Datos personales
                </Link>
              ) : (
                <label className="form-link">Datos personales</label>
              )}
            </h5>
          </span>
        </li>

        <li
          className={
            fourth && activeClass[fourth].hasOwnProperty("class") 
              ? `progress-step ${activeClass[fourth].class}`
              : "progress-step"
          }
        >
          {fourth !== undefined &&
          fourth !== null &&
          fourth !== "" ? (
            <Link to={`/documentos/${id}`}>
              <span className="progress-marker custom">
                <span className="imagen5" style={{ width: "200px" }}></span>
              </span>
            </Link>
          ) : (
            <span className="progress-marker custom"></span>
          )}
          <span className="progress-text">
            <h5
              className="progress-title brandonReg fw500"
              style={{ color: "#4f4f4f" }}
            >
              {fourth !== undefined &&
              fourth !== null &&
              fourth !== "" ? (
                <Link to={`/documentos/${id}`} className="form-link">
                  Documentos
                </Link>
              ) : (
                <label className="form-link">Documentos</label>
              )}
            </h5>
          </span>
        </li>
      </ul>
      <br />
    </div>
  );
};

export default Steps;
