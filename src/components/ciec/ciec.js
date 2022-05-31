import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { Modal } from 'react-responsive-modal';
import { Row, Button, Col } from 'react-bootstrap';
import registerImage from '../../assets/img/enviado_chava-01.webp'
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
  

  const onFormSubmit = async (dataForm) => {
    console.log(dataForm);
    dispatch(updateLoader(true));
    const data = dataForm;
    const {rfc, ciec } = data;
    if(rfc && ciec){
    try{
      const res = await axios.get(`api/ciec/${rfc}`);
      console.log(res.data);
      if(res.data.code === 200){
        const { idUser} = res.data.client;
        if(res.data.rfc.rfc || res.data.rfcPerson.rfcPerson === rfc){
          const id = res.data.rfc._id || res.data.rfcPerson._id;
          try {
                  const res = await axios.put(`api/ciec/${id}`, {...data, idUser});
                  console.log(res);
                  if(res.data.code === 200){
                    setState("success");
                    setMensaje({
                      img: <img src={registerImage} alt="registerimage" style={{ width: '250px' }}/>,
                      title: "¡registro exitoso!",
                      message: `la CIEC de ${rfc} se ha registrado correctamente`,
                      type: "success"
                    });
                    setOpen(true);
                    dispatch(updateLoader(false));
                  } else{
                    setMensaje({
                      img: <FontAwesomeIcon icon={faExclamationTriangle} size='3x' style={{color:'#D41919'}} />,
                      title: "¡Error!",
                      message: "la CIEC no se ha podido registrar correctamente, favor de intentarlo más tarde",
                      type: "error"
                    });
                    setOpen(true);
                    setState("error");
                    dispatch(updateLoader(false));
                  }
                } catch (error) {
                  console.log("Error de servicio", error);
                }
                dispatch(updateLoader(false));
        } else {
          setState("error");
          setOpen(true);
          setMensaje({
            img: <FontAwesomeIcon icon={faExclamationTriangle} size='3x' style={{color:'#D41919'}} />,
            title: "¡Error!",
            message: "la CIEC no se ha podido registrar, porfavor de intentarlo nuevamente",
            type: "error"
          });
          dispatch(updateLoader(false));
        }
      }
      else{
        setOpen(true);
        setState("error");
        setMensaje({
          img: <FontAwesomeIcon icon={faExclamationTriangle} size='3x' style={{color:'#D41919'}} />,
          title: "¡Error!",
          message: "el RFC no existe en la base de datos, por favor verifique su información",
          type: "error"
        });
        dispatch(updateLoader(false));
      }
    }catch(err){
      console.log("err", err);
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
        <div className='text-center outer'>   
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
                  {mensaje.img}
                </>
			          <div className="title-dp fz42 mb-18 fw500"  style={mensaje.type === 'error'? {color:'#D41919'}:{} }>
                  {mensaje.title}
                </div>
			          <p className="text-dp fz22">{mensaje.message}</p>
							</div> 
						</Col>
					</Row>
					<div className="text-center mt-30">
						<Button className="btn-blue-general ml-auto mr-auto" style={{width: '250px'}} onClick={() => {
              if (state === "success") {
                history.push("/");
              } else {
                setOpen(false);
              }
            }}>
							{
                state === "success" ? "aceptar" : "cerrar"
              }
						</Button>
					</div>
				</Modal>
    </div>
  )
}
export default CIECcomponent;