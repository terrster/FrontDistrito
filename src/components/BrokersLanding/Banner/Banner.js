import React from 'react';
import {Button} from 'react-bootstrap';

import BANNER_WEB from '../../../assets/img/brokers-landing/BANNER_web.jpg';


const Banner = () => {

  return(
  <>
      <div className="brokers-header">
        <img
          className="w-100"
          src={BANNER_WEB} alt="WEB"
        />
        <Button className="brokers-header-button header-button fz24 bluePrimary">
          Solicitar ahora
        </Button>
      </div>
      {/* <video style={{
                objectFit: 'fill',
                width: '100%',
                height: '350px',
                border: '0',
                padding: '0'
            }} 
          controls={false} muted={true} autoPlay={true} preload={"true"} 
          src="https://distrito-pyme-media.s3.us-west-2.amazonaws.com/%C2%BFC%C3%B3mo+Funciona+Distrito+Pyme_+Solicita+tu+CR%C3%89DITO+Ya!!.mp4"/> */}
  </>
  );
}

export default Banner;