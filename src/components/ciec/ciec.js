import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { Modal } from 'react-responsive-modal';
import { Row, Button, Col } from 'react-bootstrap';
import registerImage from '../../assets/img/enviado_chava-01.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Loader from '../Loader/Loader';
import { useHistory } from "react-router-dom";

// Components
import { updateLoader } from "../../redux/actions/loaderActions";
import CiecForm from "../../forms/ciecForm";
import { type } from "jquery";

const CIECcomponent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({});
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [mensaje , setMensaje] = useState("");

const goToError = () => {
  const rfcError = document.getElementById("rfc-error");

}
  const dataR = (image,title, msg, type, redir) => {
    setOpen(true);
        setMensaje({
          img : image,
          title : title,
          message: msg,
          type: type,
        });
        setState(type);
        if(redir){
          setTimeout(() => { history.push("/"); }, 3000); // Redireccionar a la pagina principal
        }
        dispatch(updateLoader(false));
      }
  const errorLogo = <FontAwesomeIcon icon={faExclamationTriangle} size='3x' style={{color:'#D41919'}} />
  const onFormSubmit = async (dataForm) => {
    dispatch(updateLoader(true));
    const data = dataForm;
    const {rfc, ciec } = data;
    if(rfc && ciec){
    try{
      const res = await axios.post(`ciec`, data);
      console.log(res);
      if (res.status === 200) {
        res.data.status === "invalid" ? dataR(errorLogo, "ERROR", res.data.msg, "error", false) : dataR(registerImage, "¡Registro exitoso!", res.data.msg, "success", true);
      } else {
        setOpen(true);
        setMensaje({
          img: <FontAwesomeIcon icon={faExclamationTriangle} size='3x' style={{color:'#D41919'}} />,
          title: "¡Error!",
          message: res.data.msg,
          type: "error",
        });
        dispatch(updateLoader(false));
        console.log("Error de servicio");
      }
      
    }catch(err){
      console.log(err)
      setOpen(true);
      setMensaje({
        img: <FontAwesomeIcon icon={faExclamationTriangle} size='3x' style={{color:'#D41919'}} />,
        title: "¡Error!",
        message: err.response.data.msg,
        type: "error",
      })
    } } else {
      setOpen(true);
      setMensaje({
          img: <FontAwesomeIcon icon={faExclamationTriangle} size='3x' style={{color:'#D41919'}} />,
          title: "¡Error!",
          message: "debe de llenar todos los campos",
          type: "error"
      });
    }
    dispatch(updateLoader(false));
    }
  return (
    <div>
        <div className='text-center outer '>   
            <CiecForm 
            onSubmit={onFormSubmit}
            initialValues={initialValues}
            setState={setState}
            state={state}>

            </CiecForm>
        </div>
        <Loader />
				<Modal onClose={() => setOpen(false)} open={open} center={true} classNames={{modal:'modalcustum'}} >
					<Row className="d-flex justify-content-center">
						<Col lg={6} sm={12} md={12} className="text-center">
							<div className="fz29 fw400">
								<>
                <div class="text-center">
                  {
                    state === "success" ? ( <img src={mensaje.img} class="rounded" alt="..." style={{maxWidth:'100%'}}/>) : ( <>{mensaje.img}</>)
                  }
                </div>
                </>
			          <div className="title-dp fz42 mb-18 fw500"  style={mensaje.type === 'error'? {color:'#D41919'}:{} }>
                  {mensaje.title}
                </div>
			          <p className="text-dp fz22">{mensaje.message}</p>
							</div> 
						</Col>
					</Row>
					<div className="text-center mt-30">
            {
              state === "success" ? (
                <Button className="btn-blue-general ml-auto mr-auto" style={{width: '250px'}} onClick={() => {history.push("/");} }>aceptar</Button>
              ) : (
                <>
                  <div class="container">
                  <div class="row mt-3">
                    <Button className="btn-blue-general ml-auto mr-auto" style={{width: '250px'}} onClick={() => {history.push("/registrate");} }>nueva solicitud</Button>
                  </div>
                  <div class="row mt-3">
                    <Button className="btn-blue-general ml-auto mr-auto" style={{width: '250px'}} onClick={() => {setOpen(false)} }>cerrar</Button>
                  </div>
                  </div>
                </>
              )
            }
					</div>
				</Modal>
    </div>
  )
}
export default CIECcomponent;