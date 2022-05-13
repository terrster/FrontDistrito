import React, { useEffect, useState} from 'react';
import Title from '../Generic/Title';
import Carousel from './Carousel';
import Allies from './Allies';
import banner_web from '../../assets/img/banner-allies/banner_web.jpg';
import banner_mobile from '../../assets/img/banner-allies/banner_mobile.jpg';

const images = [banner_web, banner_mobile];
const getSize = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const OurAllies = () => {
    const [version, setVersion] = useState(getSize());
    const [versionImage, setVersionImage] = useState(0);

    useEffect(() => {
		setVersionImage(version)
	}, [version]);
    useEffect(() => {
        window.addEventListener('resize', () => setVersion(getSize()));
        return () => {
            window.removeEventListener('resize', () => setVersion(getSize()));
        }
    }  , []);
    window.scrollTo(0, 0)
    return(
        <div className="text-center">
            <div >
                <img className="d-block w-100" src={images[versionImage]} alt="WEB"/>
            </div>
            <div className="container-fluid mb-2 mt-3">
                <Allies/> 
            </div>
        </div>
    );
}

export default OurAllies;