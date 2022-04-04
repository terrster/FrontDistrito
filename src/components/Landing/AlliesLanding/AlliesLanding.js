import React,{useState} from 'react';
import Title from '../../Generic/Title';
import { Container } from 'react-bootstrap';
import Marquee from 'react-marquee-slider';
import  {imgFinancial}  from '../../../utils/Financials';
import { useHistory } from 'react-router-dom';

import banner_web from '../../../assets/img/banner-allies/banner_web.jpg';
import banner_mobile from '../../../assets/img/banner-allies/banner_mobile.jpg';

const images = [banner_web, banner_mobile];

const getVersionImage = () => {
  const currentSize = document.getElementsByTagName('body')[0].clientWidth;
  return currentSize < 775 ? 1 : 0;
};


const AlliesLanding = () => {

  const history = useHistory();

  const [versionImage, setVersionImage] = useState(getVersionImage());

  window.addEventListener('resize', () => setVersionImage(getVersionImage()));

  const allies = imgFinancial('ALL');

  return(
    <div>
      <div >
       <img className="d-block w-100 bannerAllies" src={images[versionImage]} alt="WEB"/>
      </div>

      <Container className="container pt-5 pb-3">
        <Marquee velocity={12}>
          {
            allies.map((name, key) => {
              return <div  key={key}>
                <img className="imgAlianzaBrokers mr-3" src={name} alt={`allies${key}`} />
              </div>
            })
          }
        </Marquee>
      </Container>
  </div>
  );
}

export default AlliesLanding;