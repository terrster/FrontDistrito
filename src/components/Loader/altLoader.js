import React from "react";
import { useSelector } from "react-redux";
import im1 from "../../assets/img/estatus_solicitud/status-solicitud_01.png";
import "../../css/loader.css";

const AltLoader = ({loading}) => {
  const { isLoading, msg } = useSelector((state) => state.loader);
  if (loading) {
    return (
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
    );
  }
  return null;
};

export default AltLoader;
