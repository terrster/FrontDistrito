import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Title from "../Generic/Title";
import BuroExtForm from "../../forms/BuroExtForm";
import axios from "../../utils/axios";
import Swal from "sweetalert2";

// Components
import CustomModal from "../Generic/CustomModal";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import { ToastContainer } from "react-toastify";


const BuroExt = (props) => {
  const dispatch = useDispatch();
  // Redux state

  const [initialValues, setInitialValues] = useState({});
  const [municipality, setMunicipality] = useState("");
  const [state, setState] = useState("");
  const history = useHistory();

  const onFormSubmit = async (dataForm) => {
    dispatch(updateLoader(true));

    const address = {
      town: dataForm.town,
      state: dataForm.state,
      zipCode: dataForm.zipCode,
      municipality: dataForm.municipality,
      street: dataForm.street,
      extNumber: dataForm.extNumber,
      intNumber: dataForm.intNumber,
    };

    dataForm.address = address;
    
    const  { town: _, state: __, zipCode: ___, municipality: ____, street: _____, extNumber: ______, intNumber: _______ , colonias: ________ , ...userData } = dataForm;

    const data = {
      ...userData,
    };
    console.log("data", data);
    try {
      const consulta = await axios.post("/buro_ext", data);
      const { success, message, score } = consulta.data;
      if (success) {
        Swal.fire({
          title: "¡Gracias!",
          text: "Hemos consultado exitosamente el buró de crédito, el score es de " + score,
          icon: "success",
          customClass: {
            title: "title-dp fz42",
            popup: "text-dp fz20",
            confirmButton: "btn-blue-general btn-gray-general btn btn-primary",
            cancelButton: "btn-blue-general btn btn-primary",
          },
          confirmButtonText: "aceptar",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/");
          }
        });
      } else {
        Swal.fire({
          title: "¡Ups!",
          text: message,
          icon: "error",
          customClass: {
            title: "title-dp fz42",
            popup: "text-dp fz20",
            confirmButton: "btn-blue-general btn-gray-general btn btn-primary",
            cancelButton: "btn-blue-general btn btn-primary",
          },
          confirmButtonText: "aceptar",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(updateLoader(false));
  };
    

//   useEffect(() => {
//     if (!toast.second) {
//       execToast("second");
//       dispatch(updateToast(toast, "second"));
//     }

//     const getData = async () => {
//       dispatch(updateLoader(true));
//       const user = JSON.parse(sessionStorage.getItem("user"));
//       const { idClient } = user;
//       // Si ya tienen una solicitud, se actualiza
//       if (idClient.appliance.length > 0) {
//         const appliance = idClient.appliance[idClient.appliance.length - 1];
//         if (appliance.hasOwnProperty("idComercialInfo")) {
//           const comercial = appliance.idComercialInfo;
//           const address = comercial.address;
//           const paymentsMoreThan30 = comercial.paymentsMoreThan30 ? "1" : "0";
//           const terminal = comercial.terminal ? "1" : "0";
//           const exportation = comercial.exportation ? "1" : "0";
//           let colonias = [];
//           try {
//             const coloniasRequest = await axiosBase.get(
//               `https://api.copomex.com/query/info_cp/${address.zipCode}?token=${process.env.REACT_APP_SEPOMEXTOKEN}`
//             );
//             if (Array.isArray(coloniasRequest.data)) {
//               coloniasRequest.data.map((datos) => {
//                 colonias.push(datos.response.asentamiento);
//               });
//             } else if (coloniasRequest.error) {
//               colonias = [];
//             }
            
//             setInitialValues({ ...comercial, ...address, paymentsMoreThan30, terminal, exportation, colonias });
//           } catch (error) {
//               let origin = process.env.REACT_APP_CONFIGURATION === 'production' ? 'Prod' : process.env.REACT_APP_CONFIGURATION === 'development' ? 'Dev' : 'Local';

//               if(origin === 'Prod'){
//                 await axios.post('/private/api/sms_internal_notify', {
//                   msg: origin + ' - Ha ocurrido un error con la API de COPOMEX'
//                 },{
//                   headers: {
//                     'tokensecret': 'D7Mqvg5aPcypn97dxdB/Kfe330wwu0IXx0pFQXIFmjs='
//                   }
//                 });
//               }
//               setInitialValues({ ...comercial, ...address, paymentsMoreThan30, terminal, exportation, colonias });
//           }
//         }
//       }
//       // const { email } = JSON.parse(sessionStorage.getItem("user"));

//       dispatch(updateLoader(false));
//     };

//     getData();
//   }, []);

  return (
    <div className="container mt-3">
      <Loader />
      <ToastContainer />
      <div className="text-center mb-2">
        <Title title="Consulta de Buro de Crédito" className="title-dp fz42" />
      </div>
      <CustomModal
        modalName="comercialInfoError"
        message="Error al subir los archivos. Favor de regresar a la pantalla de inicio y continúa tu solicitud."
      />
      <BuroExtForm
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        setState={setState}
        setMunicipality={setMunicipality}
        state={state}
        municipality={municipality}
      ></BuroExtForm>
    </div>
  );
};

export default BuroExt;
