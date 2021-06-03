import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../Generic/Title";
import SignupFormBrokers from "../../forms/SignupFormBrokers";
// import * as $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
//  import { execToast } from "../../utils/ToastUtils";
// import { Link } from "react-router-dom";
import "../../css/signup.css";
// import registerImage from "../../assets/img/register.png";
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { singUpAction } from '../../redux/actions/authActions';
import { updateToast } from '../../redux/actions/appActions';
import axios from '../../utils/axios';
import StepSignup from "../Appliance/StepSignup";
import publicIp from "public-ip";
import { Carousel, Button } from 'react-bootstrap';
// import brokersBanner from '../../assets/img/brokers/broker_banner.png';
import brokersBannerWeb from '../../assets/img/brokers/broker_banner-2.jpg';
import brokersBannerMovil from '../../assets/img/brokers/WEBMOVIL_2.jpg';
import { useHistory } from 'react-router-dom';

const getVersionImage = () => {
	const currentSize = document.getElementsByTagName('body')[0].clientWidth;
	return currentSize < 775 ? 1 : 0;
};

const SignupBrokers = props => {
  const [versionImage, setVersionImage] = useState(getVersionImage());
  const imageBroker = [brokersBannerWeb, brokersBannerMovil];
  const toast = useSelector(state => state.app.toast);
  const [ownerId] = useState(props.match.params.ownerId ? props.match.params.ownerId : '');
  const [errorEmail, setErrorEmail] = useState("");
  const [errorBroker, setErrorBroker] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const history = useHistory();

  window.addEventListener('resize', () => setVersionImage(getVersionImage()));

  useEffect(() => {
    if(ownerId != ''){
      setInitialValues({
        brokercode: ownerId
      });
    }
  },[ownerId]);

  const dispatch = useDispatch();

  let onFormSubmit = async (data) => {
    data.channel = 'Brokers';
    dispatch ( updateToast(toast, "register") );
    dispatch( updateLoader(true) );
    let ipV4 = await publicIp.v4();
    data.ipV4 = ipV4;

    const res = await axios.post('signin', data);
    if(res.data.code === 403){
      setErrorBroker(res.data.msg)
    }
    else if (res.data.code === 500){
      setErrorEmail(res.data.msg)
    } else {
      setErrorEmail("")
      setErrorBroker("")
      dispatch( singUpAction(data) );
    }
    dispatch (updateLoader(false));
  }

  if (sessionStorage.getItem("nameUser")) {
    setTimeout(() => {
      history.push("/home");
    }, 5000)

  }
  else {
    return (
      <>
      {
        ownerId === '' &&
          <Carousel id="brokers-carousel" className="mb-2" controls={false} indicators={false}>
              <Carousel.Item>
                  <img className="d-block w-100"  src={imageBroker[versionImage]} alt="brokersBanner"/>
                  <Carousel.Caption>
                    <div className="btn-broker-container">
                      <Button className={"btn-blue-brokers btn-broker"} onClick={() => history.push("/brokers")}>Aplica aquí</Button>
                    </div>
                  </Carousel.Caption>
              </Carousel.Item>
          </Carousel>
      }
      <div className="container mt-30">
        <Loader />
        {!props.statusSingup ? (
          <>
            {
              ownerId !== '' &&
              <>
                <Title
                  className="fz56 text-center title-dp fw500"
                  title="¡Bienvenido a Distrito Pyme!"
                />
                <div className="mt-30 text-dp fw300 fz20 text-center mb-30">
                  <p className="gray50">Te ayudamos a crecer tu negocio <label className="blue-primary">&nbsp;#ComunidadDeCrédito&nbsp;</label></p>
                </div> 
              </>
            }
            <div className="mt-50">
							<StepSignup/>
						</div>
            <div className="mt-30 text-dp fw300 fz20 text-center mb-30">
              <p className="gray50">Recuerda realizar el registro con la información del Principal Accionista y/o Representante Legal</p>
            </div>
            <style>{"\
                #clgo{\
                    display: none !important;\
                }\
                #clgo-wsp{\
                    display: none !important;\
                }\
            "}</style>
          </>
        ) : (
          <div></div>
        )}
        <SignupFormBrokers onSubmit={e => onFormSubmit(e)} errorEmail={errorEmail} setErrorEmail={setErrorEmail} errorBroker={errorBroker} setErrorBroker={setErrorBroker} initialValues={initialValues} ownerId={ownerId}/>
      </div>
      </>
    );
  }
};

export default SignupBrokers;
