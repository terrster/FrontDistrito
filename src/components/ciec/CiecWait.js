import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import CiecForm from "../../forms/ciecForm";
import ReactPlayer from "react-player";
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
  const [initialValues, setInitialValues] = useState({});

  const { isLoading, msg } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  let CiecStatus = (st) => {
    setCiec(st);
  };

  const onSubmit = (values) => {
    dispatch(
      updateLoader(
        true,
        "Estamos procesando tus documentos y en breve te daremos una respuesta"
      )
    );
    console.log(values);
    setTimeout(() => { 
      dispatch(updateLoader(false))
    }, 4000);
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

export default CiecWait;
