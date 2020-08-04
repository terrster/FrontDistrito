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

  const [banks, setBanks] = useState([]); // Bancos que ya tiene seleccionados el usuario
  const [initialValues, setInitialValues] = useState({});
  const [municipality, setMunicipality] = useState("");
  const [state, setState] = useState("");
  const [idFinerio, setIdFinerio] = useState("");
  const history = useHistory();

  const isRegistredInFinerio = async (email) => {
    const {
      data: { data },
    } = await axios.get("api/finerio/customers");
    let isRegistred = false;
    data.forEach((user) => {
      if (user.name === email) {
        isRegistred = true;
      }
    });
    return isRegistred;
  };

  const getCustomer = async (email) => {
    const {
      data: { data },
    } = await axios.get("api/finerio/customers");
    let currentCustomer = {};
    data.forEach((user) => {
      if (user.name === email) {
        currentCustomer = user;
      }
    });
    return currentCustomer;
  };

  const storeCredentials = async (customerId, email) => {
    banks.forEach(async (bank) => {
      let securityCode = "";
      if (bank.hasOwnProperty("securityCode")) {
        securityCode = bank.securityCode;
      }
      const data = {
        customerId,
        bankId: bank.id,
        username: email,
        password: bank.password,
        securityCode,
      };
      const storeRequest = await axios.post("api/finerio/credentials", data);
      if (storeRequest.data.msg === "Finerio: La credencial ya existe.") {
        const getCredentials = await axios.get(
          `api/finerio/credentials/customer/${customerId}`
        );        
        const dataCredentials = getCredentials.data.data;
        const credentialId = dataCredentials[0].id;
        const updateData = await axios.put(
          `api/finerio/credentials/${credentialId}`,
          data
        );
        return updateData.data.msg;
      } else {
        return storeRequest.data.msg;
      }
    });
  };

  const submitFinerioData = async () => {
    const { email } = JSON.parse(sessionStorage.getItem("user"));
    const isRegistred = await isRegistredInFinerio(email);
    let customer = {};
    if (!isRegistred) {
      const {
        data: { data },
      } = await axios.post("api/finerio/customers", { name: email });
      const { dateCreated, id, name } = data;
      customer = {
        dateCreated,
        id,
        name,
      };
    } else {
      const customerdb = await getCustomer(email);
      customer = customerdb;
    }
    const customerId = customer.id;
    setIdFinerio(customerId);
    await storeCredentials(customerId, email);
  };

  const onFormSubmit = async (dataForm) => {
    dispatch(updateLoader(true));
    const user = JSON.parse(sessionStorage.getItem("user"));
    submitFinerioData();
    const id = user._id;
    const idClient = user.idClient;
    const data = {
      ...dataForm,
      state,
      municipality,
      idFinerio,
    };
    if (idClient.appliance.length > 0) {
      const appliance = idClient.appliance[idClient.appliance.length - 1];
      if (appliance.hasOwnProperty("idComercialInfo")) {
        const comercial = appliance.idComercialInfo;
        const id = comercial._id;
        try {
          const res = await axios.put(`api/info-comercial/${id}`, data, {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          });
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          if (!refDocuments) {
            history.push(`/informacion-general/${user._id}`);
          } else {
            history.push(`/documentos/${user._id}`);
          }
        } catch (error) {
          console.log("Error de servicio", error);
        }
      } else {
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
    }
    dispatch(updateRefDocuments(false));
    dispatch(updateLoader(false));
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
          const terminal = comercial.terminal ? "1" : "0";
          let colonias = [];
          try {
            const coloniasRequest = await axiosBase.get(
              `https://api-sepomex.hckdrk.mx/query/info_cp/${address.zipCode}`
            );
            if (Array.isArray(coloniasRequest.data)) {
              coloniasRequest.data.map((datos) => {
                colonias.push(datos.response.asentamiento);
              });
            } else if (coloniasRequest.error) {
              colonias = [];
            }
            setInitialValues({ ...comercial, ...address, terminal, colonias });
          } catch (error) {
            setInitialValues({ ...comercial, ...address, terminal, colonias });
          }
        }
      }
      const { email } = JSON.parse(sessionStorage.getItem("user"));
      const isRegistred = await isRegistredInFinerio(email);
      let customer = {};
      if (!isRegistred) {
        const {
          data: { data },
        } = await axios.post("api/finerio/customers", { name: email });
        const { dateCreated, id, name } = data;
        customer = {
          dateCreated,
          id,
          name,
        };
      } else {
        const customerdb = await getCustomer(email);
        customer = customerdb;
      }
      const customerId = customer.id;
      await axios.get(`api/finerio/credentials/customer/${customerId}`);
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
        setState={setState}
        setMunicipality={setMunicipality}
        state={state}
        municipality={municipality}
        banks={banks}
        setBanks={setBanks}
        isRegistredInFinerio={isRegistredInFinerio}
        getCustomer={getCustomer}
      ></ComercialInfoForm>
    </div>
  );
};

export default ComercialInfo;
