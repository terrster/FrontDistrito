import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import CiecForm from "../../forms/ciecForm";
import ReactPlayer from "react-player";
import Axios from "../../utils/axios";
import Swal from "sweetalert2";
import "../../css/ciec.css";

const getSize = () => {
  const currentSize = document.getElementsByTagName("body")[0].clientWidth;
  return currentSize < 775 ? 1 : 0;
};

const CiecWait = () => {
  const [version, setVersion] = useState(getSize());
  const [wait, setWait] = useState(false);
  const [open, setOpen] = useState(false);
  const [ciec, setCiec] = useState(true);
  const [response, setResponse] = useState({});
  const [initialValues, setInitialValues] = useState({});

  const { isLoading, msg } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const history = useHistory();

  let CiecStatus = (st) => {
    if(st === true){
      setCiec(st);
      return
    }
    Swal.fire({
      title: "¿estás seguro?",
      text: "sin la CIEC las opciones de financiamiento se reducen considerablemente, pero buscaremos una opción de crédito personal, que puede ser por un monto pequeño, o que requerirá de una garantia inmobiliaria",
      icon: "warning",
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
        setCiec(st);
      } else {
        setCiec(!st);
      }
    }).catch((err) => {
      console.log(err);
      dispatch(updateLoader(false));
    });
  };

  const defaultCase = "Error en el servidor"

  const cases = {
    200: {
      title: "¡Listo!",
      text: "gracias por tu paciencia, ahora puedes continuar con tu solicitud",
      icon: "success",
    },
    400: {
      title: "¡Error!",
      text: "No encontramos tu usuario, intenta más tarde",
      icon: "error",
    },
    404: {
      title: "¡Error!",
      text: "el RFC o la CIEC no son válidos, por favor verifica tus datos",
      icon: "error",
    },
    429: {
      title: "¡Error!",
      text: "lo lamentamos, pero ya rebasaste el límite de solicitudes diarias para este RFC, por lo mientras revisa tu información e intenta más tarde",
      icon: "error",
    }, 
    500: {
      title: "¡Error!",
      text: "lo lamentamos, pero no pudimos procesar tu solicitud, por favor intenta más tarde",
      icon: "error",
    }
  }

  const onSubmit = async (values) => {
    dispatch(
      updateLoader(
        true,
        "Estamos procesando tu información y en breve te daremos una respuesta"
      )
    );

     let CiecStatus = ciec;
     let user = JSON.parse(sessionStorage.getItem("user"));
     let id = user._id;
     values = { ...values, CiecStatus };
     await Axios.post(`/api/ciec/${id}`, values)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            const user = JSON.parse(sessionStorage.getItem("user"));
              sessionStorage.setItem("user", JSON.stringify(res.data.user));
              let message = cases[res.status] || defaultCase;
              Swal.fire({
                title: message.title,
                text: message.text,
                icon: message.icon,
                customClass: {
                  title: "title-dp fz42",
                  popup: "text-dp fz20",
                  confirmButton: "btn-blue-general btn btn-primary",
                },
                confirmButtonText: "aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(updateLoader(false));
                  history.push(`/elige-monto/${user._id}`);
                  
                }
              }).catch((err) => {
                console.log(err);
                dispatch(updateLoader(false));
              });
          }
        })
        .catch((err) => {
          console.log(err.response);
          let msg = cases[err.response.status] || defaultCase;
          Swal.fire({
            title: msg.title,
            text: msg.text,
            icon: msg.icon,
            customClass: {
              title: "subtitle form fz42",
              popup: "text-dp fz20",
              confirmButton: "btn-blue-general btn btn-primary",
            },
            confirmButtonText: "aceptar",
          });

          dispatch(updateLoader(false));
        });
  };

  useEffect(() => {
    window.addEventListener("resize", () => setVersion(getSize()));
    return () => {
      window.removeEventListener("resize", () => setVersion(getSize()));
    };
  }, []);

  const Video = (props) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ReactPlayer
          width="100%"
          height="400px"
          style={{ maxWidth: "1000" }}
          url="https://www.youtube.com/watch?v=zfpsVpQwNtg"
        />
      </div>
    );
  };

  const ModalComponent = ({video}) => {
    return (
        <Modal
            show={open}
            onHide={() => setOpen(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Información sobre CIEC
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <Video />
            </Modal.Body>
        </Modal>
    );
    };

    const OpenModal = () => {
        setOpen(true);
    };

  return (
    <div>
      {isLoading && <Loader />}
      {wait && <h1>Espera un momento...</h1>}
      {!wait && (
        <Row style={{ maxWidth: "100%", margin: "auto", padding: "0 2%" }}>
          <Col
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              padding: "2% 1%",
              flexDirection: "column",
            }}
            md={6}
            xs={12}
            id="videoHowWorks"
            className="text-center background2"
          >
            {
                version === 0 ? <Video /> : <ModalComponent />
            }
            
          </Col>
          <Col
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              padding: "2% 1%",
            }}
            md={6}
            xs={12}
          >
            <CiecForm
              onSubmit={onSubmit}
              initialValues={initialValues}
              popup={true}
              video={true}
              version={version}
              openModal={OpenModal}
              CiecStatus={CiecStatus}
              ciec={ciec}
            ></CiecForm>
          </Col>
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
	return {
		history: ownProps.history,
		modal: state.modal.name,
		appliance: state.appliance.appliance,
		applianceAmount: state.appliance.amount,
		applianceData: state.appliance,
		currentAmount: state.actionForm.amountForm
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateLoader: isLoading => {
			dispatch({ type: 'UPDATE_LOADER', data: { isLoading } });
		},
		updateModal: name => {
			dispatch({ type: 'UPDATE_MODAL', data: { name } });
		},
		updateAppliance: appliance => {
			dispatch({ type: 'UPDATE_APPLIANCE', data: { appliance } });
		},
		updateApplianceAmount: amount => {
			dispatch({ type: 'UPDATE_AMOUNT_APPLIANCE', data: { amount } });
		},
		updateToast: key => {
			dispatch({ type: 'UPDATE_TOAST', data: { key } });
		},
		changeTypeAmountForm: (form, type, datos) => {
			dispatch({
				type: 'UPDATE_DATA_AND_TYPE_FORM',
				data: { form, type, datos }
			});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CiecWait);
