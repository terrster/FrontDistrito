import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/footer.css';
import logo from '../../../assets/img/logo_dp/extras-03.png';
import face from '../../../assets/img/redes_sociales/Facebook.png';
import mail from '../../../assets/img/redes_sociales/mail.png';
import twitter from '../../../assets/img/redes_sociales/Twitter.png';
import linked from '../../../assets/img/redes_sociales/Linkedin.png';
import instagram from '../../../assets/img/redes_sociales/Instagram.png';
import youtube from '../../../assets/img/redes_sociales/Youtube.png';
//import Whatsapp from '../../../assets/img/redes_sociales/whatsapp.png';

const Footer = props => {
    return(
    <div id="footer-dp" className="row d-flex justify-content-center footer-bg">
        <div className="col-xs-12 col-lg-3 text-center text-lg-left mb-1 mb-lg-0" >
            <img src={logo} alt="Distrito Pyme" className="nav-logo mb-1 mb-lg-0"/>
                <div className="metropolisReg fw300 fz16 gray600"  >
                    Distrito Pyme&copy; Av. Javier Barrios Sierra 540, Santa Fe, Ciudad de México 01210, México.
                </div>
        </div>
        <div className="col-5 col-lg-3">
            <div className="metropolisMed fw500 fz24">Menú</div>
            <div>
                <a href="/#simulador" className="metropolisReg black-link fw300 fz18">Simulador</a>
            </div>
            {/* <div>
                <a href="/#about" className="metropolisReg black-link fw300 fz18">Conócenos</a>
            </div> */}
            <div>
                <a href="/#videoHowWorks" className="metropolisReg black-link fw300 fz18">¿Cómo funciona?</a>
            </div>
            <div>
                <a href="https://distritopyme.com.mx/" target='_blank' rel="noopener noreferrer" className="metropolisReg black-link fw300 fz18">Blog</a>
            </div>

            <div>
                <a href="/brokers" rel="noopener noreferrer" className="metropolisReg black-link fw300 fz18">Quiero ser Broker</a>
            </div>

            <div>
                <a href="/solicitudBrokers" rel="noopener noreferrer" className="metropolisReg black-link fw300 fz18">Soy Broker</a>
            </div>

            <div>
                <a href="/nuestros-aliados" rel="noopener noreferrer" className="metropolisReg black-link fw300 fz18">Aliados</a>
            </div>

            <div>
                <a href="/login" rel="noopener noreferrer" className="metropolisReg black-link fw300 fz18">Iniciar Sesión</a>
            </div>

            <div>
                <a href="/registrate" rel="noopener noreferrer" className="metropolisReg black-link fw300 fz18">Solicita tu Crédito</a>
            </div>
        </div>
        <div className="col-7 col-lg-3" >
            <div className="metropolisMed fw500 fz24">Soporte</div>
            <div className="metropolisReg fw300 fz18"><a href="/preguntas-frecuentes" className="footer-link" target="blank">Preguntas frecuentes</a></div>
            <div className="metropolisReg fw300 fz18"><a href="/terminos-y-condiciones" className="footer-link" target="blank">Términos y condiciones</a></div>
            <div className="metropolisReg fw300 fz18"><a href="/privacidad" className="footer-link" target="blank">Aviso de privacidad</a></div>
            <div className="metropolisReg fw300 fz18"><a className="footer-link" href="mailto:contacto@distritopyme.com">Trabaja en Distrito Pyme</a></div>
            <div className="metropolisReg fw300 fz18"><Link className="footer-link" to="/aliado_financiero">Quiero ser Aliado Financiero</Link></div>
        </div>
        <div className="col-12 col-lg-3">
            <div className="metropolisMed fw500 fz24">Contacto</div>
            <div className="metropolisReg fw300 fz18 mb-1">(55) 8661-9486</div>
            <a href="https://www.facebook.com/distritopyme" target="blank"><img src={face} alt="Facebook Distrito Pyme" className="footer-icon" /></a>
            <a href="https://twitter.com/DistritoPymeMx" target="blank"><img src={twitter} alt="Twitter Distrito Pyme" className="footer-icon" /></a>
            <a href="https://mx.linkedin.com/company/distritopyme" target="blank"><img src={linked} alt="LinkedIn Distrito Pyme" className="footer-icon" /></a>
            <a href="https://instagram.com/distritopyme?igshid=sacp808q14u5" target="blank"><img src={instagram} alt="Instagram Distrito Pyme" className="footer-icon" /></a>
            <a href="https://www.youtube.com/channel/UCU1Qfe1nw7O4N-V16HFt0GQ" target="blank"><img src={youtube} alt="Youtube Distrito Pyme" className="footer-icon" /></a>
            <a href="mailto:contacto@distritopyme.com"><img src={mail} alt="Mail Distrito Pyme" className="footer-icon" /></a>
            {/* <a href="https://api.whatsapp.com/send?phone=525526954055&text=Hola%2c%20%c2%bfpodr%c3%adan%20ayudarme%3f&source=&data=" target="blank"><img src={Whatsapp} alt="Whatsapp Distrito Pyme" className="footer-icon" /> </a> */}
            
        </div>
    </div>
    );
}
export default Footer;