import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { requisitos, garantias } from "./requisitos";
import { Add } from "@material-ui/icons";
import Title from "../Generic/Title";
import Steps from "../Appliance/Steps";
import "./newdoc.css";

const NewDoc = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [typePerson, setTypePerson] = useState("");
  const [ciec, setCiec] = useState("");
  const [warranty, setWarranty] = useState([]);
  const [requisitod, setRequisitos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setTypePerson(user.idClient.type);
      setCiec(user.idClient.appliance[0].idComercialInfo.ciec);
      setWarranty(
        garantias[user.idClient.appliance[0].idComercialInfo.warranty]
      );
      setRequisitos(requisitos[user.idClient.type]);
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    warranty ? setTags([...requisitod, ...warranty])
      : setTags(requisitod);
    console.log(tags);
  }, [requisitod, warranty]);

  const Meta = forwardRef((props, ref) => {
    useEffect(() => {
      const element = ref.current;

      element.addEventListener("metamap:userStartedSdk", ({ detail }) => {
        console.log("started payload", detail);
      });

      element.addEventListener("metamap:loaded", ({ detail }) => {
        console.log("loaded payload", detail);
      });

      element.addEventListener("metamap:userFinishedSdk", ({ detail }) => {
        console.log("finished payload", detail);
      });

      element.addEventListener("metamap:exitedSdk", ({ detail }) => {
        console.log("exited payload", detail);
      });

      return () => {
        element.removeEventListener("metamap:userStartedSdk", ({ detail }) => {
          console.log("started payload", detail);
        });
        element.removeEventListener("metamap:loaded", ({ detail }) => {
          console.log("loaded payload", detail);
        });
        element.removeEventListener("metamap:userFinishedSdk", ({ detail }) => {
          console.log("finished payload", detail);
        });

        element.removeEventListener("metamap:exitedSdk", ({ detail }) => {
          console.log("exited payload", detail);
          alert("Exited SDK");
        });
      };
    }, [ref]);
    return (
      <metamap-button
        id={props.id}
        clientid="620fd879e59dff001c13464c"
        flowId="6217f24e167c83001c707df0"
        color="#505DED" // to setup main color of buttons in your metamap
        textcolor="#FFFFFF" // to setup text color of buttons in your metamap
        metadata='{"uid":"203212312312",
                "canal":"Codepen"}'
        ref={ref} // reference to the DOM element
        style={{ display: "none" }}
        metamap={(metadata) => {
          console.log(metadata);
        }}
      />
    );
  });

  const Tarjetas = ({ step, title }) => {
    const [value, setValue] = useState("");
    const ref = useRef();
    const handleClick = (e) => {
      console.log(ref.current);
      // document.getElementById("mati_button").click();
      setValue(ref.current);
    };

    return (
      <Card
        style={{ maxWidth: "90vw", border: "none" }}
        className="h-100 shadow2 p-3 mb-5"
      >
        <Card.Header style={{ backgroundColor: "initial" }}>
          {" "}
          <div className="subtitle form fz24 text-center">{title}</div>
        </Card.Header>
        <Card.Body>
          {
            tags.filter(
              (requisito) => requisito.step === step
            ).map((requisito, index) => (
              <Row key={requisito.name} className="mb-3 align-items-center">
                <Col xs="2" lg="2" className="text-center">
                  <button className="circule_btn" onClick={handleClick}> <Add style={{maxWidth:"70%"}}/> </button>
                  <Meta ref={ref} id={"mati_button" + requisito.name} />
                </Col>
                <Col>
                  <div className="metropolisLight fz12">{requisito.description}</div>
                </Col>
              </Row>
            ))
          }
        </Card.Body>
        <Card.Footer
          style={{ backgroundColor: "initial", border: "none" }}
          className="text-center"
        >
          <Button
            className="simulator-button  ml-auto mr-auto mt-30"
            style={{ cursor: error ? "not-allowed" : "pointer", width: "100%" }}
            // disabled={disabled}
            onClick={handleClick}
          >
            subir
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  const Cards = () => {
    return (
      <>
        <div className="text-center mb-3">
          <Title title="Sube tus documentos" className="title-dp fz42" />
          <div className="metropolisReg fz16 mt-3 mailto-content container">
            procura que la calidad sea óptima y legible en formato: PNG, JPG,
            PDF y/o FOTOS.(peso máximo de 10MB por archivo). <br />
            también puedes enviarnos tu documentación a{" "}
            <a href="mailto:documentos@distritopyme.com">
              documentos@distritopyme.com
            </a>
          </div>
        </div>
        <div className="container-md">
          <Row xs={1} md={2} lg={warranty ? 3 : 2} xl={warranty ? 3 : 2}>
            <Col className="col-sm">
              <Tarjetas step="A" title="socios" />
            </Col>
            <Col className="col-sm">
              <Tarjetas step="B" title="negocio o empresa" />
            </Col>
            {warranty && (
              <Col className="col-sm">
                <Tarjetas step="C" title="Garantias" />
              </Col>
            )}
          </Row>
        </div>
      </>
    );
  };

  const ImagenCards = () => {
    return (
      <>
        <div className="text-center mb-3">
          <Title title="Sube tus documentos" className="title-dp fz42" />
          <div className="metropolisReg fz16 mt-3 mailto-content container">
            procura que la calidad sea óptima y legible en formato: PNG, JPG,
            PDF y/o FOTOS.(peso máximo de 10MB por archivo). <br />
            también puedes enviarnos tu documentación a{" "}
            <a href="mailto:documentos@distritopyme.com">
              documentos@distritopyme.com
            </a>
          </div>
        </div>
      </>
    );
  };

  return <> 
  {typePerson === "PF" ? <ImagenCards /> : <Cards />} 
  </>;
};

export default NewDoc;
