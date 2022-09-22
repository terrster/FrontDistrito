import React from "react";
import { useSelector } from "react-redux";
import im1 from "../../assets/img/estatus_solicitud/status-solicitud_01.png";
import "../../css/loader.css";

const Loader = () => {
  const { isLoading, msg } = useSelector((state) => state.loader);
  if (isLoading) {
    return (
      <div
        className="loader-container-alt"
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: "200",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >


            <div className="centDiv">
              <div className="lds-ripple">
                <div />
                <div />
              </div>
              <div className="mt-3">
                <div className="text-center">
                  <label
                    className="text-dp-gray-ligth fz20 ml-auto mt-2 mb-1"
                    style={{ width: "30rem" }}
                  >
                    {/* estamos preocesando tus documentos y en breve te daremos una
                    respuesta */}
                    {msg}
                  </label>
                </div>
              </div>
            </div>

      </div>
    );
  }
  return null;
};

export default Loader;
