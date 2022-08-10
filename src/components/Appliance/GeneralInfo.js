import React, { useState, useEffect } from "react";
import Title from "../Generic/Title";
import GeneralInfoForm from "../../forms/GeneralInfoForm";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../Generic/CustomModal";
import { execToast } from "../../utils/ToastUtils";

// Components
import Steps from "./Steps";

import { updateToast, updateDate } from "../../redux/actions/appActions";
import { updateLoader } from "../../redux/actions/loaderActions";
import axios from "../../utils/axios";
import axiosBase from "axios";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";

const GeneralInfo = (props) => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.app.toast);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!toast.third) {
      execToast("third");
      dispatch(updateToast(toast, "third"));
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    let secondLastname = "";
    if (user.secondLastName) {
      secondLastname = user.secondLastName;
    }
    dispatch(updateLoader(true));
    const getData = async () => {
      try {
      const user = JSON.parse(sessionStorage.getItem("user"));

      const idClient = user.idClient;
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance[0]; 
        if (appliance.hasOwnProperty("idGeneralInfo")) {
          const general = appliance.idGeneralInfo;
          const date = general.birthDate.split("/");
          const day = date[0];
          const month = date[1];
          const year = date[2];
          const ref1 = general.contactWith[0];
          const name1 = ref1.name;
          const phone1 = ref1.phone;
          const relative1 = ref1.relative;
          const ref2 = general.contactWith[1];
          const name2 = ref2.name;
          const phone2 = ref2.phone;
          const relative2 = ref2.relative;
          const creditCard = general.creditCard ? "1" : "0";
          const mortgageCredit = general.mortgageCredit ? "1" : "0";
          const address = general.address;
          const street = address.street;
          const state = address.state;
          const municipality = address.municipality;
          const town = address.town;
          const zipCode = address.zipCode;
          const extNumber = address.extNumber;
          const intNumber = address.intNumber;
          let colonias = [];
          try {
            const coloniasRequest = await axiosBase.get(
              `https://api.copomex.com/query/info_cp/${zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`
            );
            if (Array.isArray(coloniasRequest.data)) {
              coloniasRequest.data.map((datos) => {
                colonias.push(datos.response.asentamiento);
              });
            } else if (coloniasRequest.error) {
              colonias = null;
            }
          } catch (e) {
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
            // console.log(e);
          }
          setInitialValues({
            ...initialValues,
            ...general,
            day,
            month,
            year,
            name1,
            name2,
            phone1,
            phone2,
            relative1,
            relative2,
            mortgageCredit,
            creditCard,
            street,
            town,
            zipCode,
            extNumber,
            intNumber,
            colonias,
            state,
            municipality,
          });
        }
        else{
          setInitialValues({...initialValues, name: user.name, lastname: user.lastname, phone: user.phone });
        }
      }
      else{
        setInitialValues({...initialValues, name: user.name, lastname: user.lastname, phone: user.phone });
      }
    } catch (e) {
      console.log(e);
    }
    };
    try {
    getData();
  } catch (e) {
    console.log(e)
  }
    dispatch(updateLoader(false));
  }, []);

  const onFormSubmit = async (dataForm) => {
    dispatch(updateLoader(true));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const id = user._id;
    const idClient = user.idClient;
    let data = {
      ...dataForm,
      birthDate: new Date(
        `${dataForm.day}/${dataForm.month}/${dataForm.year}`
      ).toLocaleDateString(),
    };
    if (idClient.appliance.length > 0) {
      const appliance = idClient.appliance[idClient.appliance.length - 1];
      if (dataForm.sameAddress) {
        if (appliance.hasOwnProperty("idComercialInfo")) {
          const comercial = appliance.idComercialInfo;
          const {
            extNumber,
            intNumber,
            registerDate,
            street,
            town,
            zipCode,
            municipality,
            state,
		  } = comercial.address;
		  data = {
			  ...data,
			  extNumber,
			  intNumber,
			  registerDate,
			  street,
			  town,
			  zipCode,
			  municipality,
			  state,
		  }
        }
      }
      if (appliance.hasOwnProperty("idGeneralInfo")) {
        const general = appliance.idGeneralInfo;
        const id = general._id;
        try {
          const res = await axios.put(`api/info-general/${id}`, data);
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
        //   let score = "score" in idClient ? idClient.score : "NO HAY PUNTUACIÓN";
          
        //   if (score === "ERROR" 
        //   || score === "ERROR 1"
        //   || score === "ERROR 2"
        //   || score === "ERROR 3"
        //   || score === "NO HAY PUNTUACIÓN"
        //   || score === undefined
        //   || score === null
        //   || score === "") {
        //     window.location.href = `/buro/${user._id}`;
        // } else {
        //   window.location.href = `/documentos/${user._id}`;
        // }
        window.location.href = `/documentos/${user._id}`;
          
        } catch (error) {
          console.log("Error de servicio", error);
        }
      } else {
        try {
          const res = await axios.post(`api/info-general/${id}`, data);
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
        //   let score = "score" in idClient ? idClient.score : "NO HAY PUNTUACIÓN";
        //   let  garantia = idClient.appliance[0].idComercialInfo.warranty;
        //   if (score === "ERROR" 
        //   || score === "ERROR 1"
        //   || score === "ERROR 2"
        //   || score === "ERROR 3"
        //   || score === "NO HAY PUNTUACIÓN"
        //   || score === undefined
        //   || score === null
        //   || score === "") {
        //     window.location.href = `/buro/${user._id}`;
        //     return;
        // } 
        // score = parseInt(score);
        // if (score > 0 && score < 525) {
        //   garantia === "1" ? window.location.href = `/documentos/${user._id}` : window.location.href = `/buro/${user._id}`;
        //   return;
        // } else {
        //   window.location.href = `/documentos/${user._id}`;
        //   return;
        // }
        window.location.href = `/documentos/${user._id}`;
        } catch (error) {
          console.log("Error de servicio", error);
        }
      }
    }
    dispatch(updateLoader(false));
  };

  const setComercialAddress = (checkboxComercialAddress) => {
    dispatch(updateLoader(true));
    if (checkboxComercialAddress) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const idClient = user.idClient;
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance;
        if (appliance.hasOwnProperty("idComercialInfo")) {
          const comercial = appliance.idComercialInfo;
          const {
            extNumber,
            intNumber,
            registerDate,
            street,
            town,
            zipCode,
            state,
            municipality,
          } = comercial.address;
          setInitialValues({
            ...initialValues,
            sameAddress: true,
            state,
            municipality,
            extNumber,
            intNumber,
            registerDate,
            street,
            town,
            zipCode,
          });
        }
      }
    } else {
      let extNumber = "";
      let intNumber = "";
      let street = "";
      let town = "";
      let zipCode = "";
      let state = "";
      let municipality = "";
      let user = JSON.parse(sessionStorage.getItem("user"));
      let idClient = user.idClient;
      if (idClient.appliance.length > 0) {
        const appliance = idClient.appliance;
        if (appliance.hasOwnProperty("idGeneralInfo")) {
          const idGeneralInfo = appliance.idGeneralInfo;
          if (idGeneralInfo.hasOwnProperty("address")) {
            const address = idGeneralInfo.address;
            extNumber = address.extNumber;
            intNumber = address.intNumber;
            street = address.street;
            town = address.town;
            zipCode = address.zipCode;
            state = address.state;
            municipality = address.municipality;
          }
        }
      }
      setInitialValues({
        ...initialValues,
        sameAddress: false,
        state,
        municipality,
        extNumber,
        intNumber,
        street,
        town,
        zipCode,
      });
    }
    dispatch(updateLoader(false));
  };

  return (
    <div className="container mt-3">
      <Loader />
      <Steps />
      <ToastContainer />
      <div className="text-center mb-2">
        <Title title="Datos personales" className="title-dp fz42" />
      </div>
      <GeneralInfoForm
        today={new Date()}
        changeDate={updateDate}
        onSubmit={(data) => {
          window.scroll(0, 0);
          onFormSubmit(data);
        }}
        setInitialValues={setInitialValues}
        changeAddress={setComercialAddress}
        initialValues={initialValues}
        positionRef={props.location.position_ref}
      />
      <CustomModal
        modalName="generalInfoError"
        message="Error al subir los archivos. Favor de regresar a la pantalla de inicio y continúa tu solicitud."
      />
    </div>
  );
};

export default GeneralInfo;
