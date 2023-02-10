import React from "react";
import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { buroPrueba } from "../../redux/actions/buroActions";
import axios from "../../utils/axios";
import im1 from "../../assets/img/estatus_solicitud/status-solicitud_03.png";
import im2 from "../../assets/img/estatus_solicitud/status-solicitud_02.png";

const NextPageP = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [buro , setBuro] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consultas, setConsultas] = useState(0);
  const resBuro = JSON.parse(sessionStorage.getItem('buro'));
  const buroRedux = useSelector((state) => state.buro);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
        
    
    const consulta = async () => {
      setLoading(true);
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
        console.log(response);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess(response.data.success);
        dispatch(buroPrueba());
        
      } catch (error) {
        console.log(error);
        if(error.response){
          if(error.response.data.user){
            sessionStorage.setItem("user", JSON.stringify(error.response.data.user));
          }
        }
        setSuccess(false);
        dispatch(buroPrueba());
        
      }
      setLoading(false);
    }
    consulta();
    
  }, [])

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
        loading === true ? (
          <div className="text-center">
            <div className="text-center">
              <label className="text-dp-blue-2 fz20 fw500 ml-auto mt-2 mb-1">
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
                <label className="text-dp-gray-ligth fz20 ml-auto mt-2 mb-1">
                  8 de cada 10 solicitudes reciben una opción de crédito
                </label>
              </div>
            </div>
          </div>
         ) : (
          <div className="next-page text-center">
          <h1> felicidades </h1>
          <img src={im2} alt="" className="tijuanaImg" />
          <div className="text-center p-3">
            <label className="text-dp fz20 fw500 ml-auto mt-2 mb-1"
              style={{
                maxWidth: "80%",
              }}
            >
              
              {
                success === true ? (
                  "muchas gracias por tu solicitud, ahora puedes subir tus documentos para completar tu proceso"
                ) : (
                  "estas a un paso de completar tu proceso en un momento te llegara un correo con la información necesaria para seguir con tu solicitud de crédito"
                )
              }
            </label>
          </div>
          <Button
            className="header-button fz18 bluePrimary"
            onClick={() => handleNext()}
          >
            {
              success === true ? (
                "continuar"
              ) : (
                "regresar"
              )
            }
          </Button>
        </div>
        )
      }
    </>
  );
};

export default NextPageP;
