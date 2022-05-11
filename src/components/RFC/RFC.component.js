import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { Modal } from 'react-responsive-modal';
import { Row, Button, Col } from 'react-bootstrap';

// Components
import { updateLoader } from "../../redux/actions/loaderActions";
import CiecForm from "../../forms/rfcForm";

const RFCcomponent = (props) => {
  const dispatch = useDispatch();
  // Redux state

  const [initialValues, setInitialValues] = useState({});
  const [state, setState] = useState("");
  const [RFC , setRFC] = useState("");
  const [rfcPerson, setRfcPerson] = useState("");
  const [open, setOpen] = useState(false);

  const onFormSubmit = async (dataForm) => {
    dispatch(updateLoader(true));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const id = user._id;
    const idClient = user.idClient;
    const data = dataForm;
    const {rfc, ciec } = data;
    console.log("data", rfc, ciec);
    
      
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance[idClient.appliance.length - 1];
        if (appliance.hasOwnProperty("idComercialInfo")) {
            const comercial = appliance.idComercialInfo;
        const id = comercial._id;
        console.log("id", id);
        try {
          const res = await axios.put(`api/ciec/${id}`, data);
          const res1 = await axios.get(`api/ciec/${id}`, data);
          console.log("res", res1);
          console.log('rfc updated', res);
        } catch (error) {
          console.log("Error de servicio", error);
        }
        }else{
            try {
                const res = await axios.post(`api/ciec/${id}`, data);
                console.log('rfc created', res);
              } catch (error) {
                console.log("Error de servicio", error);
              }
        }
    }
  

    
    dispatch(updateLoader(false));
    }

    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const id = user.hubspotDealId;
    } , [])

    useEffect(() => {
  
      const getData = async () => {
        dispatch(updateLoader(true));
        const user = JSON.parse(sessionStorage.getItem("user"));
        console.log ('user', user);
        const { idClient, hubspotDealId } = user;
        // Si ya tienen una solicitud, se actualiza
        if (idClient.appliance.length > 0) {
          const appliance = idClient.appliance[idClient.appliance.length - 1];
          if (appliance.hasOwnProperty("idComercialInfo")) {
            const comercial = appliance.idComercialInfo;
            console.log("comercial", comercial);
            const id = comercial._id;
          }
          if (appliance.hasOwnProperty("idGeneralInfo")) {
            const general = appliance.idGeneralInfo;
            const id = general._id;
            console.log("general", general);
            } else{
              setRfcPerson("");
            }
        dispatch(updateLoader(false));
      };
    }
    getData();
    }, []);

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
				<Modal onClose={() => setOpen(false)} open={open} style={{ padding: '30px 40px!important', width: 'auto!important' }}>
					<Row className="d-flex justify-content-center">
						<Col lg={6} sm={12} md={12} className="text-center">
							<div className="metropolisReg fz29 blueDark fw400">
								El RFC no coincide con el que se encuentra en la base de datos
							</div> 
						</Col>
					</Row>
					<div className="text-center mt-30">
						<Button className="btn-blue-general ml-auto mr-auto" style={{width: '250px'}} onClick={() => setOpen(false)}>
							Aceptar
						</Button>
					</div>
				</Modal>
    </div>
  )
}
export default RFCcomponent;
