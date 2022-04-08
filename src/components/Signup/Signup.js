import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../Generic/Title";
import SignupForm from "../../forms/SignupForm";
// import * as $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
//  import { execToast } from "../../utils/ToastUtils";
//import signupReducer from "../../redux/reducers/signup-reducer"; 
// import { Link } from "react-router-dom";
import "../../css/signup.css";
// import registerImage from "../../assets/img/register.png";
//import RegistroExitoso from "../../components/Registro/RegistroExitoso";
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { singUpAction } from '../../redux/actions/authActions';
import { updateToast } from '../../redux/actions/appActions';
import axios from '../../utils/axios';
import StepSignup from "../Appliance/StepSignup";
import publicIp from "public-ip";
import { Carousel } from 'react-bootstrap';

//FinancialPartners
import impulsoDPWEB from '../../assets/img/financialPartners/impulsoDP-WEB.jpg';
import impulsoDPMovil from '../../assets/img/financialPartners/impulsoDP-Movil.jpg';

import visoorWEB from '../../assets/img/financialPartners/Visoor-WEB.jpg';
import visoorMovil from '../../assets/img/financialPartners/Visoor-Movil.jpg';

import PagaloopWEB from '../../assets/img/financialPartners/Pagaloop-WEB.jpg';
import PagaloopMovil from '../../assets/img/financialPartners/Pagaloop-Movil.jpg';

import KonsultorWEB from '../../assets/img/financialPartners/KonsultorWEB.jpg';
import KonsultorMobile from '../../assets/img/financialPartners/KonsultorMobile.jpg';

import DGimpulsandoWEB from '../../assets/img/financialPartners/DGimpulsandoWEB.jpg';
import DGimpulsandoMobile from '../../assets/img/financialPartners/DGimpulsandoMobile.jpg';

const getVersionImage = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const financialPartner = (partner) => {
  switch(partner.toUpperCase()){
    case 'IMPULSOMX':
      return {
        image: [impulsoDPWEB, impulsoDPMovil],
        text: [
          'Solicita tu crédito Pyme a través de nuestro aliado tecnológico Distrito Pyme.',
          'El proceso es fácil, rápido y podrás recibir respuesta en menos de 15 min.'
        ],
        dealstage: '2753634',
        prefix: process.env.REACT_APP_CONFIGURATION === 'localhost' || process.env.REACT_APP_CONFIGURATION === 'development' ? 'FormImpulsoDev - ' : 'FormImpulso - ',
        channel: 'Impulso'
      };
    case 'VISOOR':
      return {
        image: [visoorWEB, visoorMovil],
        text: [
          'Solicita un crédito para tu empresa o negocio a través de nuestro aliado Distrito Pyme.',
          'Podrás recibir las mejores opciones de crédito en menos de 15 min con un proceso fácil, rápido y sin papeleos.'
        ],
        prefix: process.env.REACT_APP_CONFIGURATION === 'localhost' || process.env.REACT_APP_CONFIGURATION === 'development' ? 'VisoorDev - ' : 'Visoor - ',
        channel: 'Visoor',
        brokercode: '36408310'//Luis Fer - DP
      }
    case 'PAGALOOP':
      return {
        image: [PagaloopWEB, PagaloopMovil],
        text: [
          'Solicita un crédito para tu empresa o negocio a través de nuestro aliado Distrito Pyme.',
          'Podrás recibir las mejores opciones de crédito en menos de 15 min con un proceso fácil, rápido y sin papeleos.'
        ],
        prefix: process.env.REACT_APP_CONFIGURATION === 'localhost' || process.env.REACT_APP_CONFIGURATION === 'development' ? 'PagaloopDev - ' : 'Pagaloop - ',
        channel: 'Pagaloop',
        brokercode: '36408310'//Luis Fer - DP
      }

      case 'KONSULTOR':
      return {
        image: [KonsultorWEB, KonsultorMobile],
        text: [
          'Solicita un crédito para tu empresa o negocio a través de nuestro aliado Distrito Pyme.',
          'Podrás recibir las mejores opciones de crédito en menos de 15 min con un proceso fácil, rápido y sin papeleos.'
        ],
        prefix: process.env.REACT_APP_CONFIGURATION === 'localhost' || process.env.REACT_APP_CONFIGURATION === 'development' ? 'KonsultorDev - ' : 'Konsultor - ',
        channel: 'Konsultor',
        brokercode: '36408310'//Luis Fer - DP
      }

      case 'DG-IMPULSANDO':
      return {
        image: [DGimpulsandoWEB, DGimpulsandoMobile],
        text: [
          'Solicita un crédito para tu empresa o negocio a través de nuestro aliado Distrito Pyme.',
          'Podrás recibir las mejores opciones de crédito en menos de 15 min con un proceso fácil, rápido y sin papeleos.'
        ],
        prefix: process.env.REACT_APP_CONFIGURATION === 'localhost' || process.env.REACT_APP_CONFIGURATION === 'development' ? 'DG-ImpulsandoDev - ' : 'DG-Impulsando - ',
        channel: 'DG-Impulsando',
        brokercode: '36408310'//Luis Fer - DP
      }


    default:
      return false;
  }
}

const Signup = props => {
  const [versionImage, setVersionImage] = useState(getVersionImage());
  const [partner, setPartner] = useState(false);
	const toast = useSelector(state => state.app.toast);
	const [errorEmail, setErrorEmail] = useState("");
  const [ownerId] = useState(props.match.params.ownerId ? props.match.params.ownerId : '');
  const [initialValues, setInitialValues] = useState({});

  const dispatch = useDispatch();

  window.addEventListener('resize', () => setVersionImage(getVersionImage()));

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

   useEffect(() => {
    if(ownerId != ''){
      setInitialValues({
        brokercode: ownerId
      });
    }
  },[ownerId]);

  useEffect(() => {
    if(props.match.params.financialPartner !== undefined){
      if(financialPartner(props.match.params.financialPartner)){
        setPartner(financialPartner(props.match.params.financialPartner))
      }
    }
  }, [props.match.params.financialPartner])

  let onFormSubmit = async (data) => {

  if(partner){
    let partnerFields = Object.fromEntries(Object.entries(partner).filter(([key]) => key !== 'image' && key !== 'text'));
    data = {...data, ...partnerFields };

     if(ownerId){
      data.brokercode = ownerId;
    }
    
  }
  else{
    data.channel = 'Online';
  }
  
	dispatch ( updateToast(toast, "register") );
  dispatch( updateLoader(true) );
  let ipV4 = await publicIp.v4();
  data.ipV4 = ipV4;

	const res = await axios.post('signin', data);
	if (res.data.code === 500){
		setErrorEmail(res.data.msg)
	} else {
		setErrorEmail("")
		dispatch( singUpAction(data) );
	}
	dispatch (updateLoader(false));
  }

  if (sessionStorage.getItem("nameUser")) {
    setTimeout(() => {
      window.location = "/home";
    }, 5000)
    //return (<RegistroExitoso />);
  }else {
    return (
      <>
        <Loader />
        {!partner ? (
          <div className="container mt-30">
            <Title
              className="fz56 text-center blue-primary title-dp fw500"
              title="¡Bienvenido a Distrito Pyme!"
            />
            <div className="mt-30 text-dp fw300 fz20 text-center mb-30">
              <p className="gray50">Te ayudamos a crecer tu negocio <label className="blue-primary">&nbsp;#ComunidadDeCrédito&nbsp;</label></p>
            </div>
            <div className="mt-50">
							<StepSignup/>
						</div>
          </div>
        ) : (
          <>
            <Carousel controls={false} indicators={false}>
                <Carousel.Item>
                    <img className="d-block w-100" src={partner.image[versionImage]} alt={`${props.match.params.financialPartner}`}/>
                </Carousel.Item>
            </Carousel>
            <div className="mt-50 pl-2 pr-2">
              {
                versionImage === 1 &&
                <div className="gray50 text-dp fw300 fz20 text-center mb-5">
                  {
                    partner.text.map((text, index) => {
                      return <span className="d-block" key={index}>
                                {text}
                            </span>
                    })
                  }
                </div>
              }
              <StepSignup/>
            </div>
          </>
        )}
        <div className="container mt-30">
          <SignupForm onSubmit={e => onFormSubmit(e)} errorEmail={errorEmail} setErrorEmail={setErrorEmail} initialValues={initialValues} ownerId={ownerId}/>
        </div>
      </>
    );
  }
};

export default Signup;
