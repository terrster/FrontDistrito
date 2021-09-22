import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import BANNER_FINAL from '../../../assets/img/brokers-landing/BANNER_final.jpg';
import '../../../css/brokers-landing.css'

const BannerFinal = () => {

  const history = useHistory();

  return (
    <>
      <div className="brokers-footer">
        <img className="d-block w-100" src={BANNER_FINAL} alt="WEB" />
        <Button id="footerButton" className="brokers-button-final fz20 bluePrimary" onClick={() => { history.push("/brokers-registro") }}>
        Conviértete en Broker
        </Button>
      </div>
    </>
  );
}

export default BannerFinal;