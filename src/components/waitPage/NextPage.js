import React from "react";
import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import im1 from "../../assets/img/estatus_solicitud/status-solicitud_03.png";
import im2 from "../../assets/img/estatus_solicitud/status-solicitud_02.png";

const NextPageP = () => {
  const history = useHistory();
  const [buro , setBuro] = useState(null);
  const [success, setSuccess] = useState(false);
  const [consultas, setConsultas] = useState(0);
  const resBuro = JSON.parse(sessionStorage.getItem('buro'));
  const buroRedux = useSelector((state) => state.buro);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
        
    
    const consulta = async () => {
      const idClient = user._id;
      let data = {
        id: idClient,
      };
      if (user.idClient.appliance.length > 0) {
        const appliance =
          user.idClient.appliance[user.idClient.appliance.length - 1];
        if (appliance.hasOwnProperty("idAmount")) {
          data = {...data, idAmount: appliance.idAmount};
        }
      }
      
      try{
        const response = await axios.post(`/api/buroMoral/${user._id}`, data);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess(response.data.success);
      } catch (error) {
        console.log(error);
      }
    }
    consulta();
    
  }, [buroRedux])

  const handleNext = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(success === true){
      history.push(`/credito`);
    } else {
      history.push(`/credito`);
    }
  };

  return (
    <>
      {
        buro === false ? (
          <div className="next-page text-center">
          <h1> aun se puede </h1>
          <img src={im2} alt="" className="tijuanaImg" />
          <div className="text-center p-3">
            <label className="text-dp fz20 fw500 ml-auto mt-2 mb-1">
              tu perfil no cumple con los requerimientos de instituciones bancarias, pero aun temos más opciones para ti <br /> da click en continuar para terminar el proceso
            </label>
          </div>
          <Button
            className="header-button fz18 bluePrimary"
          >
            continuar
          </Button>
        </div>
        ) : (
          <div className="next-page text-center">
          <h1> felicidades </h1>
          <img src={im2} alt="" className="tijuanaImg" />
          <div className="text-center p-3">
            <label className="text-dp fz20 fw500 ml-auto mt-2 mb-1">
              estas a un paso de completar tu proceso <br /> en un momento te llegara un correo con la información necesaria para seguir con tu solicitud de crédito
            </label>
          </div>
          <Button
            className="header-button fz18 bluePrimary"
            onClick={() => handleNext()}
          >
            continuar
          </Button>
        </div>
        )
      }
    </>
  );
};

export default NextPageP;
