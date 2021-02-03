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
import impulsoDP from '../../assets/img/financialPartners/impulsoDP.jpg';

const financialPartner = (partner) => {
  switch(partner.toUpperCase()){
    case 'IMPULSOMX':
      return {
        image: impulsoDP,
        text: [
          'Solicita tu crédito Pyme a través de nuestro aliado tecnológico Distrito Pyme.',
          'El proceso es fácil, rápido y podrás recibir respuesta en menos de 15 min.'
        ],
        dealstage: '2753634',
        prefix: process.env.REACT_APP_CONFIGURATION === 'localhost' || process.env.REACT_APP_CONFIGURATION === 'development' ? 'FormImpulsoDev - ' : 'FormImpulso - '
      };
    default:
      return false;
  }
}

const Signup = props => {
  const [partner, setPartner] = useState(false);
	const toast = useSelector(state => state.app.toast);
	const [errorEmail, setErrorEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if(props.match.params.financialPartner !== undefined){
      if(financialPartner(props.match.params.financialPartner)){
        setPartner(financialPartner(props.match.params.financialPartner))
      }
    }
  }, [props.match.params.financialPartner])

  let onFormSubmit = async (data) => {

  if(partner){
    let { dealstage, prefix } = partner;
    data = {...data, dealstage, prefix };
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
                    <img className="d-block w-100" src={partner.image} alt={`${props.match.params.financialPartner}`}/>
                </Carousel.Item>
            </Carousel>
            <div className="mt-50 pl-2 pr-2">
              <div className="gray50 text-dp fw300 fz20 text-center mb-5">
                {
                  partner.text.map((text, index) => {
                    return <span className="d-block" key={index}>
                              {text}
                           </span>
                  })
                }
              </div>
              <StepSignup/>
            </div>
          </>
        )}
        <div className="container mt-30">
          <SignupForm onSubmit={e => onFormSubmit(e)} errorEmail={errorEmail} setErrorEmail={setErrorEmail}/>
        </div>
      </>
    );
  }
};

export default Signup;
