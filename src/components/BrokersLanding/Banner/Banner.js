import React,{useState} from 'react';
import {Button,Carousel} from 'react-bootstrap';

import BANNER_WEB from '../../../assets/img/brokers-landing/BANNER_web.jpg';
import BANNER_MOVIL from '../../../assets/img/brokers-landing/BANNER_movil.jpg';

const images = [BANNER_WEB, BANNER_MOVIL];

const getVersionImage = () => {
  const currentSize = document.getElementsByTagName('body')[0].clientWidth;
  return currentSize < 775 ? 1 : 0;
};


const Banner = () => {

  const [versionImage, setVersionImage] = useState(getVersionImage());

  window.addEventListener('resize', () => setVersionImage(getVersionImage()));

  React.useEffect(() => {
    console.log(versionImage);
  }, [versionImage])

  return(
  <>
      {/* <Carousel className="mb-2" activeIndex={indexImage} onSelect={handleSelect}>
        {
          images.map((image, index) => {
            return <Carousel.Item>
              <img className="d-block w-100" src={image[versionImage]} alt={`banner${index}`} />
            </Carousel.Item>
          })
        }
      </Carousel> */}
      <div className="brokers-header">
        <img
          className="w-100"
          src={images[versionImage]} alt="WEB"
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