import React from 'react';
import '../../../css/footer.css';

import logo from '../../../assets/img/logo-dp-3-x@2x.png';
import face from '../../../assets/img/facebook@2x.png';
import mail from '../../../assets/img/mail@2x.png';
import twitter from '../../../assets/img/twiiter@2x.png';
import linked from '../../../assets/img/linkedin@2x.png';
import Whatsapp from '../../../assets/img/whatsapp.png';

const Footer = props => {
    return(
    <div className="row d-flex justify-content-center footer-bg">
        <div className="col-xs-12 col-lg-3 text-center text-lg-left mb-1 mb-lg-0">
            <img src={logo} alt="Distrito Pyme" className="nav-logo mb-1 mb-lg-0"/>
                <div className="brandonReg fw300 fz16 gray50"  >
                    Distrito Pyme&copy; Av. Javier Barrios Sierra 540, Santa Fe, Ciudad de México 01210, México.
                </div>
        </div>
        <div className="col-5 col-lg-3">
            <div className=" brandonReg fw500 fz24">Menú</div>
            <div>
                <a href="/#simulador" className="brandonReg black-link fw300 fz18">Simulador</a>
            </div>
            <div>
                <a href="/#about" className="brandonReg black-link fw300 fz18">Conócenos</a>
            </div>
            <div>
                <a href="/#howWorks" className="brandonReg black-link fw300 fz18">¿Cómo funciona?</a>
            </div>
            <div>
                <a href="https://distritopyme.com.mx/" target='_blank' rel="noopener noreferrer" className="brandonReg black-link fw300 fz18">Blog</a>
            </div>
        </div>
        <div className="col-7 col-lg-3">
            <div className="brandonReg fw500 fz24">Soporte</div>
            <div className="brandonReg fw300 fz18"><a href="/preguntas-frecuentes" className="footer-link" target="blank">Preguntas frecuentes</a></div>
            <div className="brandonReg fw300 fz18"><a href="/terminos-y-condiciones" className="footer-link" target="blank">Términos y condiciones</a></div>
            <div className="brandonReg fw300 fz18"><a href="/privacidad" className="footer-link" target="blank">Aviso de privacidad</a></div>
            <div className="brandonReg fw300 fz18"><a className="footer-link" href="mailto:contacto@distritopyme.com">Trabaja en Distrito Pyme</a></div>
        </div>
        <div className="col-12 col-lg-3">
            <div className="brandonReg fw500 fz24">Contacto</div>
            <a href="https://www.facebook.com/distritopyme" target="blank"><img src={face} alt="Facebook Distrito Pyme" className="footer-icon" /></a>
            <a href="https://twitter.com/DistritoPymeMx" target="blank"><img src={twitter} alt="Twitter Distrito Pyme" className="footer-icon" /> </a>
            <a href="https://mx.linkedin.com/company/distritopyme" target="blank"><img src={linked} alt="LinkedIn Distrito Pyme" className="footer-icon" /> </a>
            <a href="mailto:contacto@distritopyme.com"><img src={mail} alt="Mail Distrito Pyme" className="footer-icon" /> </a>
            <a href="https://api.whatsapp.com/send?phone=525526954055&text=Hola%2c%20%c2%bfpodr%c3%adan%20ayudarme%3f&source=&data=" target="blank"><img src={Whatsapp} alt="Whatsapp Distrito Pyme" className="footer-icon" /> </a>
            <div className="brandonReg fw300 fz18 mt-1">(55) 8661-9486</div>
        </div>
    </div>
    );
}
export default Footer;