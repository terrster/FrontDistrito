import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../css/footer.css';
import logo from '../../../assets/img/redes_sociales/logo.png';
import face from '../../../assets/img/redes_sociales/Facebook.png';
import mail from '../../../assets/img/redes_sociales/mail.png';
// import twitter from '../../../assets/img/redes_sociales/Twitter.png';
import linked from '../../../assets/img/redes_sociales/Linkedin.png';
import instagram from '../../../assets/img/redes_sociales/Instagram.png';
import youtube from '../../../assets/img/redes_sociales/Youtube.png';
import { indexOf } from 'lodash';
//import Whatsapp from '../../../assets/img/redes_sociales/whatsapp.png';

const getSize = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const Footer = props => {
    const [version, setVersion] = useState(getSize());
    const location = useLocation();
    useEffect(() => {
        window.addEventListener('resize', () => setVersion(getSize()));
        return () => {
            window.removeEventListener('resize', () => setVersion(getSize()));
        }
    }  , []);
    const url = indexOf(location.pathname.split('/'), 'buro') > -1 ? 'buro' : 'other';
    const show = location.pathname === "/solicitudBrokers/314512648" ? false : true;

    if(!show) return null;
    
    return(
    <div id="footer-dp" className="row d-flex justify-content-center">
        <div className="col-xs-12 col-lg-3 text-center text-lg-left mb-3 mb-lg-0" >
            {
                (version === 1 && url === "buro") ? null : <img src={logo} alt="Distrito Pyme" className="nav-logo mb-1 mb-lg-0"/>
            }
                <div className="text-dp-gray fw300 fz18 mt-16"  >
                    distrito pyme&copy; las arboledas, tlalnepantla, estado de méxico, 54026, méxico, 55 8661 9486.
                </div>
        </div>

        { location.pathname !== '/brokersCP' && 
        <>
        <div className="col-6 col-lg-3 mt-3">
        <div className="box vertical">menú</div>
          <div className='box horizontal'>
            <div>
                <a href="/#simulador" className="footer-link">simulador</a>
            </div>
            {/* <div>
                <a href="/#about" className="metropolisReg black-link fw300 fz18">Conócenos</a>
            </div> */}
            <div>
                <a href="/#videoHowWorks" className="footer-link">¿cómo funciona?</a>
            </div>
            <div>
                <a href="https://distritopyme.com.mx/" target='_blank' rel="noopener noreferrer" className="footer-link">blog</a>
            </div>
            <div>
                <Link  to="/login" rel="noopener noreferrer" className="footer-link">iniciar sesión</Link>
                {/* <a href="/login" rel="noopener noreferrer" className="metropolisReg black-link fw300 fz18">Iniciar Sesión</a> */}
            </div>
            </div>
        </div>

        <div className="col-6 col-lg-3 mt-3" >
            <div className="box vertical">soporte</div>
          <div className='box horizontal'>
            <div className="footer-link"><a href="/preguntas-frecuentes" className="footer-link" target="blank">preguntas frecuentes</a></div>
            <div className="footer-link"><a href="/terminos-y-condiciones" className="footer-link" target="blank">términos y condiciones</a></div>
            <div className="footer-link"><a href="/privacidad" className="footer-link" target="blank">aviso de privacidad</a></div>
            <div className="footer-link"><a className="footer-link" href="mailto:contacto@distritopyme.com">trabaja en Distrito Pyme</a></div>
            <div className="footer-link"><Link className="footer-link" to="/aliado_financiero">quiero ser Aliado Financiero</Link></div>
          </div>
        </div>
        </>
        }
        <div className="col-12 col-lg-3 mt-3 text-center">
          
            <div className="text-dp-gray fw300 fz18">(55) 8661-9486</div>
            <a href="https://www.facebook.com/distritopyme" target="blank"><img src={face} alt="Facebook Distrito Pyme" className="footer-icon" /></a>
            {/* <a href="https://twitter.com/DistritoPymeMx" target="blank"><img src={twitter} alt="Twitter Distrito Pyme" className="footer-icon" /></a> */}
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