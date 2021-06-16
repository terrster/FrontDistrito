import React, { useState} from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


import BANNER_FINAL from '../../../assets/img/brokers-landing/BANNER_final.jpg';

// const images = [BANNER_FINAL];

// const getVersionImage = () => {
//   const currentSize = document.getElementsByTagName('body')[0].clientWidth;
//   return currentSize < 775 ? 1 : 0;
// };

const BannerFinal = () => {

  const history = useHistory();

  // const [versionImage, setVersionImage] = useState(getVersionImage());

  // window.addEventListener('resize', () => setVersionImage(getVersionImage()));

  return (
    <>
      <div className="brokers-header mt-5">
        <img className="d-block w-100 h-100" src={BANNER_FINAL} /*src={images[versionImage]}*/ alt="WEB" />
        <Button className="brokers-header-button-final header-button-final fz24 bluePrimary" onClick={() => { history.push("/brokers") }}>
          Registrate aquí
        </Button>
      </div>
    </>
  );
}

export default BannerFinal;