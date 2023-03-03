import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../Generic/Title";
import SignupFormBrokers from "../../forms/SignupFormBrokers";
import "react-toastify/dist/ReactToastify.css";
import "../../css/signup.css";
import Loader from "../Loader/Loader";
import { updateLoader } from '../../redux/actions/loaderActions';
import { singUpAction } from '../../redux/actions/authActions';
import { updateToast } from '../../redux/actions/appActions';
import axios from '../../utils/axios';
import StepSignup from "../Appliance/StepSignup";
import publicIp from "public-ip";
import { useHistory } from 'react-router-dom';

const SignupBrokers = props => {
  const toast = useSelector(state => state.app.toast);
  const [ownerId] = useState(props.match.params.ownerId ? props.match.params.ownerId : '');
  const [errorEmail, setErrorEmail] = useState("");
  const [errorBroker, setErrorBroker] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const history = useHistory();

  useEffect(() => {
    if(ownerId != ''){
      setInitialValues({
        brokercode: ownerId
      });
    }
  },[ownerId]);

  console.log("ownerId", ownerId);

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
     window.scrollTo(0, 0)
    return (
      <>
      <div className="container mt-30">
        <Loader />

        {
          ownerId !== '314512648' &&
        <>
        <div className="fz56 text-center title-dp fw500">
          ¡Bienvenido Broker a Distrito Pyme!
        </div>

        <div className="mt-30 text-dp fw300 fz20 text-center mb-30">
          <p className="gray50">Te ayudamos a ofrecer las mejores opciones de crédito a tus clientes <br/> <label className="blue-primary">&nbsp;#ComunidadDeCrédito&nbsp;</label></p>
        </div> 

        <div className="mt-50">
          <StepSignup/>
        </div>

        <div className="mt-30 text-dp fw300 fz20 text-center mb-30">
          <p className="gray50">Recuerda realizar el registro con la información del Principal Accionista y/o Representante Legal</p>
        </div>
        </>
        }

        <SignupFormBrokers onSubmit={e => onFormSubmit(e)} errorEmail={errorEmail} setErrorEmail={setErrorEmail} errorBroker={errorBroker} setErrorBroker={setErrorBroker} initialValues={initialValues} ownerId={ownerId}/>
      </div>
      </>
    );
  }
};

export default SignupBrokers;
