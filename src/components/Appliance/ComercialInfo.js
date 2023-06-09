import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Title from "../Generic/Title";
import { execToast } from "../../utils/ToastUtils";
import ComercialInfoForm from "../../forms/ComercialInfoForm";
import axiosBase from "axios";
import axios from "../../utils/axios";

// Components
import Steps from "./Steps";
import CustomModal from "../Generic/CustomModal";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import { updateRefDocuments } from "../../redux/actions/modalCiecActions";
import { ToastContainer } from "react-toastify";
import { updateToast } from "../../redux/actions/appActions";

const ComercialInfo = (props) => {
  const dispatch = useDispatch();
  // Redux state
  const toast = useSelector((state) => state.app.toast);
  const { showModal, refDocuments } = useSelector((state) => state.modalCiec);

  const [initialValues, setInitialValues] = useState({});
  const [municipality, setMunicipality] = useState("");
  const [state, setState] = useState("");
  const [confirm, setConfirm] = useState(false);
  const history = useHistory();

  const onFormSubmit = async (dataForm) => {
    dispatch(updateLoader(true));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const id = user._id;
    const idClient = user.idClient;
    const data = {
      ...dataForm,
      state,
      municipality
    };
    if (idClient.appliance.length > 0) {

      // await axios.post(`api/info-comercial/${id}`, data).then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // });
      
        try {
          const res = await axios.post(`api/info-comercial/${id}`, data);
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          if (!refDocuments) {
            history.push(`/informacion-general/${user._id}`);
          } else {
            history.push(`/documentos/${user._id}`);
          }
        } catch (error) {
          console.log("Error de servicio", error);
        }
      
    }
    dispatch(updateRefDocuments(false));
    dispatch(updateLoader(false));
  };

  const cieicValidation = async (ciec, rfc) => {
    dispatch(updateLoader(true));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const { idClient } = user;
    let newCiec = true
    let id = user._id ? user._id : false;
    try {
      let {data} = await axios.post("/ciec", { ciec, newCiec, rfc, id })
      
    if (data.code === 200) {
      dispatch(updateLoader(false));
      setInitialValues({ ...initialValues, ciecStatus: true });
      return { status: true, type : "success", code : 200 };
    } else {
      dispatch(updateLoader(false));
      setInitialValues({ ...initialValues, ciecStatus: false });
      return { status: false, type : "invalid", code: 400 };
    }
    } catch (error) {
      console.log("Error de servicio", error);
      let code = error.response.status;
      console.log("code", code);
      dispatch(updateLoader(false));
      setInitialValues({ ...initialValues, ciecStatus: false });
      return { status: false, type : "error", code };
    }
  };
    

  useEffect(() => {
    if (!toast.second) {
      execToast("second");
      dispatch(updateToast(toast, "second"));
    }

    const getData = async () => {
      dispatch(updateLoader(true));
      const user = JSON.parse(sessionStorage.getItem("user"));
      const { idClient } = user;
      // Si ya tienen una solicitud, se actualiza
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance[idClient.appliance.length - 1];
        if (appliance.hasOwnProperty("idComercialInfo")) {
          const comercial = appliance.idComercialInfo;
          const address = comercial.address;
          const paymentsMoreThan30 = comercial.paymentsMoreThan30 ? "1" : "0";
          const terminal = comercial.terminal ? "1" : "0";
          const exportation = comercial.exportation ? "1" : "0";
          let colonias = [];
          try {
            const coloniasRequest = await axiosBase.get(
              `https://api.copomex.com/query/info_cp/${address.zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`
            );
            if (Array.isArray(coloniasRequest.data)) {
              coloniasRequest.data.map((datos) => {
                colonias.push(datos.response.asentamiento);
              });
            } else if (coloniasRequest.error) {
              colonias = [];
            }
            
            setInitialValues({ ...comercial, ...address, paymentsMoreThan30, terminal, exportation, colonias });
          } catch (error) {
              let origin = process.env.REACT_APP_CONFIGURATION === 'production' ? 'Prod' : process.env.REACT_APP_CONFIGURATION === 'development' ? 'Dev' : 'Local';

              if(origin === 'Prod'){
                await axios.post('/private/api/sms_internal_notify', {
                  msg: origin + ' - Ha ocurrido un error con la API de COPOMEX'
                },{
                  headers: {
                    'tokensecret': 'D7Mqvg5aPcypn97dxdB/Kfe330wwu0IXx0pFQXIFmjs='
                  }
                });
              }
              setInitialValues({ ...comercial, ...address, paymentsMoreThan30, terminal, exportation, colonias });
          }
        }
      }
      // const { email } = JSON.parse(sessionStorage.getItem("user"));

      dispatch(updateLoader(false));
    };

    getData();
  }, []);

  return (
    <div className="container mt-3">
      <Loader />
      <Steps />
      <ToastContainer />
      <div className="text-center mb-2">
        <Title title="Datos del negocio" className="title-dp fz42" />
      </div>
      <CustomModal
        modalName="comercialInfoError"
        message="Error al subir los archivos. Favor de regresar a la pantalla de inicio y continúa tu solicitud."
      />
      <ComercialInfoForm
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        setState={setState}
        setMunicipality={setMunicipality}
        state={state}
        municipality={municipality}
        cieicValidation={cieicValidation}
        setConfirm={setConfirm}
      ></ComercialInfoForm>
    </div>
  );
};

export default ComercialInfo;
