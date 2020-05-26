import React from "react";
import "../../css/progress-tracker.css";
import "../../css/custom-progress.css";
import { Link } from "react-router-dom";

const StepSignup = (props) => {
	
	/* const verify = (array) => {
		if (typeof array !== "object") return false;
		return array.length === 0 ? false : array[array.length - 1];
	}
	
  let linkt = "";
  const user = JSON.parse(sessionStorage.getItem("user"));
  const idClient = JSON.parse(sessionStorage.getItem("user")).idClient[
    JSON.parse(sessionStorage.getItem("user")).idClient.length - 1
  ];

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
  } else if (!idDocuments || !idDocuments == null) {
    linkt = `documentos/${user._id}`;
  } */

  let appliance = true;
  let idAmount = true;
  let idGeneralInfo = true;
  let idComercialInfo = true;
  let idDocuments = true;

  const first = idAmount ? "" : "";

  const second = idComercialInfo ? "" : "";

  const third = idGeneralInfo ? "" : "";
  const fourth = idDocuments ? "" : "";

  //const route = linkt;
  //const id = user._id;

  return (
    <div className="step-container">
      <ul className="progress-tracker progress-tracker--text progress-tracker--center progress-tracker--spaced">
        <li className="progress-step">
          <span className="progress-marker custom">
          </span>
          <span className="progress-text">
            <h5 className="progress-title brandonReg fw500">
              Registro
            </h5>
          </span>
        </li>

        <li
          className={
            first
              ? `progress-step `
              : "progress-step"
          }
        >
          {first !== undefined &&
          first !== null &&
          first !== "" ? (
            <Link className="form-link">
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
                <Link className="form-link">
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
            second
              ? `progress-step `
              : `progress-step`
          }
        >
          {second !== undefined &&
          second !== null &&
          second !== "" ? (
            <Link className="form-link">
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
                <Link className="form-link">
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
            props.third
              ? `progress-step `
              : "progress-step"
          }
        >
          {third !== undefined &&
          third !== null &&
          third !== "" ? (
            <Link className="form-link">
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
                <Link className="form-link">
                  Datos generales
                </Link>
              ) : (
                <label className="form-link">Datos generales</label>
              )}
            </h5>
          </span>
        </li>

        <li
          className={
            fourth
              ? `progress-step `
              : "progress-step"
          }
        >
          {fourth !== undefined &&
          fourth !== null &&
          fourth !== "" ? (
            <Link className="form-link">
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
                <Link className="form-link">
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

export default StepSignup;
