import React from 'react';
import '../../../css/about-us.css';
import Title from '../../Generic/Title';
import radar from '../../../assets/img/aboutus/radar.png';
import buropng from '../../../assets/img/aboutus/buro.png';
import mifiel from '../../../assets/img/aboutus/mifiel.png';
import prizes from '../../../assets/img/logos-pitch-3-x@2x.png';
import vtxnegocios from '../../../assets/img/aboutus/vxtnegocios.png';
import grantthornton from '../../../assets/img/aboutus/grantthornton.png';

const AboutUs = props => {
    return(
        <div id="about" className="pt-0 text-center">
            <Title title="Nosotros" className="coolvetica fz42 blackBlue fw500 mb-1"/>
            <div className="gray50 brandonReg fw300 mb-2 fz29" style={{letterSpacing : '0.1px'}}>
                La #ComunidadDeCrédito más grande de México
            </div>
            <div className="container-logos">
                <div className="logos"><img alt="Premios Pitch" src={prizes} className="img-about-us"/></div>
                <div className="logos"><a href="https://www.burodecredito.com.mx" target="_blank" rel="noopener noreferrer"><img alt="Buro" src={buropng} className="img-about-us"/></a></div>
				<div className="logos"><a href="http://www.vxtnegocios.mx" target="_blank" rel="noopener noreferrer"><img alt="vtxnegocios" src={vtxnegocios} className="img-about-us"/></a></div>
				<div className="logos"><a href="https://www.mifiel.com" target="_blank" rel="noopener noreferrer"><img alt="mifiel" src={mifiel} className="img-about-us"/></a></div>
				<div className="logos"><a href="https://www.radarsantander.com" target="_blank" rel="noopener noreferrer"><img alt="radar" src={radar} className="img-about-us"/></a></div>
				<div className="logos"><a href="https://www.grantthornton.mx" target="_blank" rel="noopener noreferrer"><img alt="Grantthornton" src={grantthornton} className="img-about-us"/></a></div>
            </div>
        </div>
    );
}

export default AboutUs;