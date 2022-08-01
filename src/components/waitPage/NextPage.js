import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import im1 from "../../assets/img/estatus_solicitud/status-solicitud_03.png";
import im2 from "../../assets/img/estatus_solicitud/status-solicitud_02.png";

const NextPageP = () => {
  const [buro , setBuro] = useState(null);
  const resBuro = JSON.parse(sessionStorage.getItem('buro'));

  useEffect(() => {
    window.scrollTo(0, 0);
    resBuro.data.code === 200 ? setBuro(true) : setBuro(false);
  }, []);


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
          <img src={im1} alt="" className="tijuanaImg" />
          <div className="text-center p-3">
            <label className="text-dp fz20 fw500 ml-auto mt-2 mb-1">
              tu monto ha sido pre autorizado por las mejores instituciones
              financieras <br /> da click en continuar para terminar el proceso
            </label>
          </div>
          <Button
            className="header-button fz18 bluePrimary"
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
