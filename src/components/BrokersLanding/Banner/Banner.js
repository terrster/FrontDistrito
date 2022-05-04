import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


import BANNER_WEB from '../../../assets/img/brokers-landing/BANNER_web.jpg';
import BANNER_MOVIL from '../../../assets/img/brokers-landing/BANNER_movil.jpg';

const images = [BANNER_WEB, BANNER_MOVIL];

const getVersionImage = () => {
  const currentSize = document.getElementsByTagName('body')[0].clientWidth;
  return currentSize < 775 ? 1 : 0;
};


const Banner = () => {

  const history = useHistory();

  const [versionImage, setVersionImage] = useState(getVersionImage());

  window.addEventListener('resize', () => setVersionImage(getVersionImage()));

  return(
  <>
      <div className="brokers-header">
        <img className="d-block w-100" src={images[versionImage]} alt="WEB"/>
        <Button id="headerButton" className="brokers-header-button header-button fz24 bluePrimary" onClick={() => { history.push("/brokers-registro") }}>
          conviértete en broker
        </Button>
      </div>
  </>
  );
}

export default Banner;