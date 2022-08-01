/**
=========================================================
* @name: Consulta de buró
=========================================================
* @description: componente que muestra el resultado de la consulta del buró 
* @param {isLoading} boolean que indica si se esta cargando o no
* @param {buro} function que muestra el resultado de la consulta del buró
* @param {BuroPositivo} componente respuesta 200 buro positivo, solo si el buro es entre 400 o 524 se pide una garantia 
* @param {BuroError} componente respuesta 400 buro no encontrado
* @param {BuroUltimo} componente respuesta 401 se ha consultado mas de tres veces el buró
* @param {ErrorConsulta} componente que muestra el error 500 no se pudo conectar con el servidor
=========================================================
*/

import React, { useEffect, useState } from "react";
import im1 from "../../assets/img/estatus_solicitud/status-solicitud_01.png";
import ERRORImg from "../../assets/img/estatus_solicitud/status-solicitud_02.png";
import imgUlti from "../../assets/img/estatus_solicitud/status-solicitud_03.png";
import axios from "../../utils/axios";
import { Row, Col, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import "../../css/loaderimg.css";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import { useSelector, useDispatch } from "react-redux";
import { set } from "lodash";
import ErrorBuro from "../../forms/buroErrorForm";
import { ContactlessOutlined, CloudUploadOutlined } from "@material-ui/icons";
import { renderFieldFull } from "../Generic/Fields";

//buro menos de 524 sin garantias
const buroNegativo = () => {
  return (
    <div className="wait-page">
      <div className="text-center">
        <div className="text-center">
          <label className="text-dp fz20 fw500 ml-auto mt-2 mb-1">
            lo sentimos pero tu buro da asco
          </label>
        </div>
      </div>
    </div>
  );
};
//respuesta 200 buro encontrado
const BuroPositivo = ({ score, user }) => {
  const handleClick = (e) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    switch (e) {
      case 1:
        window.location.href = "/credito";
        break;
      case 2:
        window.location.href = `/documentos/${user._id}`;
        break;
      default:
        break;
    }
  };

  const [disabled, setDisabled] = useState(true);

  const handleChange = () => {
    setDisabled(!disabled);
  };

  let mensaje = "";
  let casos =
    score <= -1 && score >= -9
      ? "1"
      : score >= 400 && score <= 524
      ? "2"
      : score >= 525 && score <= 625
      ? "3"
      : score >= 626 && score <= 725
      ? "4"
      : score >= 726
      ? "5"
      : "pendejo";

  switch (casos) {
    case "1":
      mensaje =
        "hemos detectado  que no cuentas con historial crediticio, pero no importa en distrito pyme contamos con las mejores opciones para iniciar con tu historial crediticio";
      break;
    case "2":
      mensaje =
        "lo sentimos hemos detectado que tu buró no es del todo positivo, sabemos que no son buenas noticias pero aún podemos ofrecerte opciones de crédito si cuentas con una garantia inmobiliaria";
      break;
    case "3":
      mensaje =
        "hemos consultado tu buró correctamente, lo estamos analizando para poder ofrecerte las mejores propuestas de crédito. ahora ayudanos a subir tus documentos";
      break;
    case "4":
      mensaje =
        "hemos consultado tu buró correctamente y cumple con los requisitos de la mayoria de nuestros aliados. ahora ayudanos a subir tus documentos para poder ofrecerte las mejores opciones de crédito";
      break;
    case "5":
      mensaje =
        "!felicidades! tu buró de crédito es el mejor, estás muy cerca de recibir las mejores opciones de crédito, ahora ayúdanos a subir tus documentos";
      break;
    default:
      mensaje = "";
      break;
  }
  return (
    <div className="wait-page">
      <div className="text-center">
        <img src={ERRORImg} alt="errorr IMG" className="tijuanaImg" />
        <div className="text-dp fz20 fw500 ml-auto mt-2 mb-1">
          <label
            className="text-dp fz20 fw500 ml-auto mt-2 mb-1"
            style={{ maxWidth: "89%" }}
          >
            {mensaje}
          </label>
        </div>
        {casos === "2" && (
          <div className="mt-3">
            <input
              type="checkbox"
              id="checkbox"
              style={{ width: "1.2rem", height: "1.2rem" }}
              onChange={handleChange}
            />
            <label className="fz16 text-dp text-msg-dp ml-2">
              confirmo que cuento con una garantía inmobiliaria libre de
              gravamen
            </label>
            <Row className="mb-1" style={{ margin: "0" }}>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Button
                  variant="primary"
                  className="mt-3 btn-blue-general"
                  onClick={(e) => {
                    handleClick(1);
                  }}
                  disabled={!disabled}
                >
                  <span className="ml-2">continuar en otra ocacion</span>
                </Button>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Button
                  variant="primary"
                  className="mt-3 btn-blue-general"
                  onClick={(e) => {
                    handleClick(2);
                  }}
                  disabled={disabled}
                >
                  <span className="ml-2">subir documentacion</span>
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {casos !== "2" && (
          <Button
            variant="primary"
            className="mt-3 btn-blue-general"
            onClick={(e) => {
              handleClick(2);
            }}
            disabled={false}
          >
            <span className="ml-2">subir documentacion</span>
          </Button>
        )}
      </div>
    </div>
  );
};
//respuesta 400 buro no encontrado
const BuroError = ({ isLoading, buro }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);

    const user = JSON.parse(sessionStorage.getItem("user"));
    let secondLastname = "";
    if (user.secondLastName) {
      secondLastname = user.secondLastName;
    }
    dispatch(updateLoader(true));
    const getData = async () => {
      try {
        const { idClient } = JSON.parse(sessionStorage.getItem("user"));
        const { appliance } = idClient;
        const { idComercialInfo, idGeneralInfo } = appliance[0];
        let rfc = idComercialInfo.rfc ? idComercialInfo.rfc : "";
        let rfcPerson = idGeneralInfo.rfcPerson ? idGeneralInfo.rfcPerson : "";
        let carCredit = idGeneralInfo.carCredit ? idGeneralInfo.carCredit : "";
        let creditCard = idGeneralInfo.creditCard ? "1" : "0";
        let mortgageCredit = idGeneralInfo.mortgageCredit ? "1" : "0";
        let name = idGeneralInfo.name ? idGeneralInfo.name : "";
        let lastname = idGeneralInfo.lastname ? idGeneralInfo.lastname : "";
        let secondLastname = idGeneralInfo.secondLastname
          ? idGeneralInfo.secondLastname
          : "";
        setInitialValues({
          rfc,
          rfcPerson,
          carCredit,
          creditCard,
          mortgageCredit,
          name,
          lastname,
          secondLastname,
        });
        dispatch(updateLoader(false));
      } catch (e) {
        console.log(e);
      }
    };
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
    dispatch(updateLoader(false));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading(true);
    buro(null);
    const data = { ...initialValues, update: true };
    const user = JSON.parse(sessionStorage.getItem("user"));
    const idClient = user._id;
    try {
      const res = await axios.post(`api/buro/${idClient}`, data);
      isLoading(false);
      buro(<BuroPositivo score={res.data.buro.valorScore} user={user} />);
    } catch (error) {
      if (error.response.data.user) {
        sessionStorage.setItem(
          "user",
          JSON.stringify(error.response.data.user)
        );
      } else {
        isLoading(false);
        return buro(<ErrorConsulta />);
      }
      isLoading(false);
      sessionStorage.setItem("user", JSON.stringify(error.response.data.user));

      switch (error.response.status) {
        case 400:
          buro(<BuroError buro={buro} isLoading={isLoading} />);
          break;
        case 401:
          buro(<BuroUltimo />);
          break;
        case 500:
          buro(<ErrorConsulta />);
          break;
        default:
          buro(<ErrorConsulta />);
          break;
      }
    }
  };
  return (
    <div className="wait-page">
      <div className="text-center">
        <img src={ERRORImg} alt="errorr IMG" className="tijuanaImg" />
        <div className="text-center">
          <label
            className="text-dp fz20 fw500 ml-auto mt-2 mb-1"
            style={{ maxWidth: "90%" }}
          >
            ¡ups! lo sentimos no pudimos revisar tu buró, por favor revisa que
            tu informacion sea la correcta{" "}
          </label>
        </div>
        <Loader />
        <ErrorBuro
          setInitialValues={setInitialValues}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
//respuesta 401 se consulto mas de 3 veces y no se encontro
const BuroUltimo = () => {
  return (
    <div className="text-center">
      <div className="text-center position-relative mt-2 containerC">
        <div className="cardIMG">
          <img src={im1} alt="" className="tijuanaImg" />
        </div>
      </div>
      <div className="mt-3">
        <div className="text-center">
          <label
            className="title-dpAlt fz20 fw500 ml-auto mt-2 mb-1"
            style={{ maxWidth: "90%" }}
          >
            desafortunadamente no hemos logrado consultar tu buró correctamente,
            pero no te preocupes, un asesor de dp se comunicara contigo a la
            brevedad.
          </label>
        </div>
        <Button
          variant="primary"
          className="mt-3 btn-blue-general"
          onClick={(e) => {
            window.location.href = "/credito";
          }}
          disabled={false}
        >
          <span className="ml-2">regresar</span>
        </Button>
      </div>
    </div>
  );
};
//error 500 no se pudo conectar con el servidor
const ErrorConsulta = () => {
  return (
    <div className="wait-page">
      <div className="text-center">
        <img src={imgUlti} alt="errorr IMG" className="tijuanaImg" />
        <div className="text-center">
          <label
            className="text-dp fz20 fw500 ml-auto mt-2 mb-1"
            style={{ maxWidth: "90%" }}
          >
            error en el servidor, por favor intenta de nuevo en unos minutos
          </label>
        </div>
        <Button
          variant="primary"
          className="mt-3 btn-blue-general"
          onClick={(e) => {
            window.location.href = "/credito";
          }}
          disabled={false}
        >
          <span className="ml-2">regresar</span>
        </Button>
      </div>
    </div>
  );
};

const WaitPage = () => {
  const [versionImage, setVersionImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [buro, setBuro] = useState(null);
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState(null);

  const [initialValues, setInitialValues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const getData = async () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user.idClient.score === "ERROR 3") {
        setIsLoading(false);
        setStatus("ERROR 3");
        return setBuro(<BuroUltimo />);
      }
      
      const idClient = user._id;
      // Si ya tienen una solicitud, se actualiza
      let data = {};
      if (user.idClient.appliance.length > 0) {
        const appliance =
          user.idClient.appliance[user.idClient.appliance.length - 1];
        if (appliance.hasOwnProperty("idGeneralInfo")) {
          data = appliance.idGeneralInfo;
        }
      }

      try {
        const response = await axios.post(`/api/buro/${idClient}`, data);
        if (response.status === 200) {
          setIsLoading(false);
          setScore(response.data.buro.valorScore);
          setStatus(response.data.buro.status);
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          return setBuro(
            <BuroPositivo score={response.data.buro.valorScore} user={user} />
          );
        }
      } catch (error) {
        if (error.response.data.user) {
          sessionStorage.setItem(
            "user",
            JSON.stringify(error.response.data.user)
          );
        } else {
          setStatus("ERROR");
          setIsLoading(false);
          return setBuro(<ErrorConsulta />);
        }
        switch (error.response.status) {
          case 400:
            setStatus("ERROR");
            setIsLoading(false);
            setBuro(<BuroError buro={setBuro} isLoading={setIsLoading} />);
            break;
          case 401:
            setStatus("ERROR");
            setIsLoading(false);
            setBuro(<BuroUltimo />);
            break;
          case 500:
            setStatus("ERROR");
            setIsLoading(false);
            setBuro(<ErrorConsulta />);
            break;
          default:
            setStatus("ERROR");
            setIsLoading(false);
            setBuro(<ErrorConsulta />);
            break;
        }
      }
    };
    getData();
  }, []);

  return (
    <div className="wait-page">
      {isLoading && (
        <div className="text-center">
          <div className="text-center">
            <label className="text-dp fz20 fw500 ml-auto mt-2 mb-1">
              estamos procesando tu solicitud
            </label>
          </div>
          <div className="text-center position-relative mt-2 containerC">
            <div className="cardIMG">
              <img src={im1} alt="" className="tijuanaImg" />
              <div className="loaderP"></div>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-center">
              <label className="title-dpAlt fz20 fw500 ml-auto mt-2 mb-1">
                8 de cada 10 solicitudes reciben una autorización
              </label>
            </div>
          </div>
        </div>
      )}
      {status && buro}
    </div>
  );
};

export default WaitPage;
