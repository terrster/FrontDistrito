import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import BANNER_FINAL from '../../../assets/img/brokers-landing/BANNER_final.jpg';
import '../../../css/brokers-landing.css'

const BannerFinal = () => {

  const history = useHistory();

  return (
    <>
      <div className="brokers-footer d-block w-100" style={{ minHeight: '20vh' }}>
        <Button id="footerButton" className="brokers-button-final fz20 bluePrimary" onClick={() => { history.push("/brokers-registro") }}>
        conviértete en broker
        </Button>
      </div>
    </>
  );
}

export default BannerFinal;