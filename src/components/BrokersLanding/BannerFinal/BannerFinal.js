import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import BANNER_FINAL from '../../../assets/img/brokers-landing/BANNER_final.jpg';

const BannerFinal = () => {

  const history = useHistory();

  return (
    <>
      <div className="brokers-header">
        <img className="d-block w-100 h-100" src={BANNER_FINAL} alt="WEB" />
        <Button className="brokers-button-final fz20 bluePrimary" onClick={() => { history.push("/brokers") }}>
          Regístrate aquí
        </Button>
      </div>
    </>
  );
}

export default BannerFinal;