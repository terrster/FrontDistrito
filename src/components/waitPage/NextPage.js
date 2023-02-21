import React from "react";
import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import im2 from "../../assets/img/estatus_solicitud/status-solicitud_02.png";

const NextPageP = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    history.push(`/documentos/${user._id}`);
  };

  return (
    <>
      
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
            continuar
          </Button>
        </div>
    </>
  );
};

export default NextPageP;
