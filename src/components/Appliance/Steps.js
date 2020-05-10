import React from "react";
import "../../css/progress-tracker.css";
import "../../css/custom-progress.css";
import { Link } from "react-router-dom";

const Steps = props => {
  let activeClass = {
    amount: { class: "is-complete" },
    comercialInfo: { class: "is-complete" },
    generalInfo: { class: "is-complete" },
    documents: { class: "is-complete" }
  };
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
            props.first
              ? `progress-step ${activeClass[props.first].class}`
              : "progress-step"
          }
        >
          {props.first !== undefined &&
          props.first !== null &&
          props.first !== "" ? (
            <Link to={`/elige-monto/${props.id}`}>
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
              {props.first !== undefined &&
              props.first !== null &&
              props.first !== "" ? (
                <Link to={`/elige-monto/${props.id}`} className="form-link">
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
            props.second
              ? `progress-step ${activeClass[props.second].class}`
              : `progress-step`
          }
        >
          {props.second !== undefined &&
          props.second !== null &&
          props.second !== "" ? (
            <Link to={`/datos-comerciales/${props.id}`}>
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
              {props.second !== undefined &&
              props.second !== null &&
              props.second !== "" ? (
                <Link
                  to={`/datos-comerciales/${props.id}`}
                  className="form-link"
                >
                  Datos comerciales
                </Link>
              ) : (
                <label className="form-link">Datos comerciales</label>
              )}
            </h5>
          </span>
        </li>

        <li
          className={
            props.third
              ? `progress-step ${activeClass[props.third].class}`
              : "progress-step"
          }
        >
          {props.third !== undefined &&
          props.third !== null &&
          props.third !== "" ? (
            <Link to={`/informacion-general/${props.id}`}>
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
              {props.third !== undefined &&
              props.third !== null &&
              props.third !== "" ? (
                <Link
                  to={`/informacion-general/${props.id}`}
                  className="form-link"
                >
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
            props.fourth
              ? `progress-step ${activeClass[props.fourth].class}`
              : "progress-step"
          }
        >
          {props.fourth !== undefined &&
          props.fourth !== null &&
          props.fourth !== "" ? (
            <Link to={`/documentos/${props.id}`}>
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
              {props.fourth !== undefined &&
              props.fourth !== null &&
              props.fourth !== "" ? (
                <Link to={`/documentos/${props.id}`} className="form-link">
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
