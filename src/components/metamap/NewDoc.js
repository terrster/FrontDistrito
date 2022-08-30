import React, { useEffect, useState, useRef, forwardRef, useCallback } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { requisitos, garantias } from "./requisitos";
import {
  Add,
  PostAdd,
  LayersClearOutlined,
  VideoCallRounded,
} from "@material-ui/icons";
import Title from "../Generic/Title";
import Steps from "../Appliance/Steps";
import "./newdoc.css";
import bannerweb from "../../assets/img/carousel/documentos_banner.png";
import bannermovil from "../../assets/img/carousel/documentos_banner_mob.png";
import check from "../../assets/img/underline_men/tick-05.svg";
import prueba from "../../assets/img/underline_men/prueba.svg";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import io from 'socket.io-client';

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
  const [banner, setBanner] = useState(bannerweb);
  const [initialValues, setValues] = useState({
    oficialID: [],
    proofAddress: [],
    bankStatements: [],
    constitutiveAct: [],
    otherActs: [],
    financialStatements: [],
    rfc: [],
    // acomplishOpinion : [],
    lastDeclarations: [],
    facturacion: [],
    others: [],
    cventerprise: [],
    proofAddressMainFounders: [],
    collectionReportSaleTerminals: [],
    localContractLease: [],
    status: false,
  });
  const [socket, setSocket] = useState(null);
  const [uid , setUid] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const userX = JSON.parse(sessionStorage.getItem("user"));
      console.log(userX);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setBanner(bannermovil);
    } else {
      setBanner(bannerweb);
    }
    const getsize = () => {
      if (window.innerWidth < 768) {
        setBanner(bannermovil);
      } else {
        setBanner(bannerweb);
      }
    };
    window.addEventListener("resize", getsize);
    return () => {
      window.removeEventListener("resize", getsize);
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setTypePerson(user.idClient.type);
      setCiec(user.idClient.appliance[0].idComercialInfo.ciec);
      setWarranty(
        garantias[user.idClient.appliance[0].idComercialInfo.warranty]
      );
      setRequisitos(requisitos[user.idClient.type]);
      if (user.idClient.appliance[0].hasOwnProperty("idDocuments")) {
        setValues(user.idClient.appliance[0].idDocuments);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    warranty ? setTags([...requisitod, ...warranty]) : setTags([...requisitod]);
  }, [requisitod, warranty]);

  const nameAux = (value) => {
    let nameDoc = "";
    if (value.name == undefined) {
      let aux = value.split("-");
      for (let i = 6; i < aux.length; i++) {
        nameDoc += aux[i];
      }
      if (nameDoc === "") {
        for (let i = 5; i < aux.length; i++) {
          nameDoc += aux[i];
        }
      }
    } else {
      let aux = value.name.replace(" ", "");
      nameDoc = aux;
    }
    return nameDoc;
  };

  const addtags = (prev) => {
    return prev.push({
      "name":"prueba",
      "description":"prueba",
      "state":true,
      "require":true,
      "flow": "62fb09fa249da5001d41ce7e",
      "step": "B",
    });
  };

  const startSocket = useCallback(() => {//process.env.REACT_APP_BACKEND, https://apidev.distritopyme.com/
    const user = JSON.parse(sessionStorage.getItem('user'));
		const id = user._id;
    const socket = io.connect(process.env.REACT_APP_BACKEND, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        'origin': 'metamap',
        'idU': id,
      }

    });
    setSocket(socket);
    // return () => socket.disconnect();
  }, []);

  useEffect(() => {
    startSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      console.log("socket", socket);
      console.log("uid", socket.id);
      socket.on("connect", (msg) => {
        console.log(msg);
      });
      socket.on("disconnect", () => {
        console.log("desconectado");
      });
      socket.on("new-document", (data) => {
        console.log(data);
      });
    }
  }, []);

  const Banner = () => {
    return (
      <div className="d-flex justify-content-center">
        <img
          src={banner}
          alt="banner_docs"
          style={{ width: "100%", maxInlineSize: "100%" }}
        />
      </div>
    );
  };

  const Meta = forwardRef((props) => {
    const [element, setElement] = useState(null);
    let ref = useRef();
    useEffect(() => {
      setElement(ref.current);
    }, [ref]);

    // if (console.everything === undefined) {
    //   console.everything = [];
    //   function TS(){
    //     return (new Date).toLocaleString("sv", { timeZone: 'UTC' }) + "Z"
    //   }
    //   window.onerror = function (error, url, line) {
    //     console.everything.push({
    //       type: "exception",
    //       timeStamp: TS(),
    //       value: { error, url, line }
    //     })
    //     return false;
    //   }
    //   window.onunhandledrejection = function (e) {
    //     console.everything.push({
    //       type: "promiseRejection",
    //       timeStamp: TS(),
    //       value: e.reason
    //     })
    //   }

    //   function hookLogType(logType) {
    //     const original= console[logType].bind(console)
    //     return function(){
    //       console.everything.push({
    //         type: logType,
    //         timeStamp: TS(),
    //         value: Array.from(arguments)
    //       })
    //       original.apply(console, arguments)
    //     }
    //   }

    //   ['log', 'error', 'warn', 'debug'].forEach(logType=>{
    //     console[logType] = hookLogType(logType)
    //   })
    // }

    const handleClick = () => {
      element.addEventListener("metamap:userStartedSdk", (e) => {
        console.log("started payload", e);
      });

      element.addEventListener("metamap:loaded", ({ detail }) => {
        console.log("loaded payload", detail);
      });
      element.addEventListener(
        "metamap:verification_completed",
        ({ detail }) => {
          console.log("loaded payload", detail);
        }
      );

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
        element.removeEventListener(
          "metamap:verification_completed",
          ({ detail }) => {
            console.log("loaded payload", detail);
          }
        );
        element.removeEventListener("metamap:userFinishedSdk", ({ detail }) => {
          console.log("finished payload", detail);
        });

        element.removeEventListener("metamap:exitedSdk", ({ detail }) => {
          console.log("exited payload", detail);
          alert("Exited SDK");
        });
      };
    };

    return (
      <metamap-button
        id={props.id}
        clientid="62f15ad24621d7001caa5472"
        flowId={props.flow}
        color="#505DED" // to setup main color of buttons in your metamap
        textcolor="#FFFFFF" // to setup text color of buttons in your metamap
        // metadata='{"uid":"203212312312",
        //         "canal":"Codepen"}'
        metadata={JSON.stringify({
          uid: socket.id,
          canal: "Codepen",
        })}
        ref={ref} // reference to the DOM element
        style={{ display: "none" }}
        onClick={handleClick}
        metamap={(metadata) => {
          console.log(metadata);
        }}
        debbug={false}
      />
    );
  });

  const Tarjetas = ({ step, title, number }) => {
    const [value, setValue] = useState("");
    const ref = useRef();
    const handleClick = (e) => {
      let id = e.currentTarget.id.split("_")[1];
      console.log(id);
      document.getElementById("mati_button" + id).click();
    };
    useEffect(() => {
      console.log("valor", value);
    }, [value]);

    const handleAddMore = (e) => {
      // e.preventDefault();
      // let file = e.target.files[0];
      // let nameDoc = nameAux(file);
      // let aux = initialValues[name];
      // aux.push({ name: nameDoc, file: file });
      // setValues({ ...initialValues, [name]: aux });
      let id = e.currentTarget.id.split("_")[1];
      console.log(id);
      if (id === "oficialID") {
        setTags(addtags);
        console.log(tags);
      } else {
        handleClick(e);
      }
    };

    return (
      <Card
        style={{ maxWidth: "90vw", border: "none" }}
        className="h-100 shadow2 p-3 mb-5"
      >
        <Card.Header
          style={{
            backgroundColor: "initial",
            paddingBottom: "0",
            border: "none",
          }}
        >
          {" "}
          <Row className="justify-content-center">
            <Col xs={3} sm={3}>
              <div className="outline_number coolvetica">{number}</div>
            </Col>
            <Col>
              <Row style={{ height: "100%", alignContent: "center" }}>
                <span
                  className="text_title_altblue"
                  style={{ fontSize: "2rem" }}
                >
                  documentos
                </span>

                <span
                  className="text_title_blue"
                  style={{ fontSize: "2.1rem" }}
                >
                  {title}
                </span>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body
          style={{
            backgroundColor: "initial",
            paddingTop: "0",
            border: "none",
          }}
        >
          {tags
            .filter((requisito) => requisito.step === step)
            .map((requisito, index) => (
              <Row key={requisito.name} className="mb-3">
                <Col xs="2" lg="2" className="text-center">
                  {initialValues[requisito.name] &&
                  initialValues[requisito.name].length > 0 ? (
                    // <img
                    //   src={RadioButtonUnchecked}
                    //   alt="uncheck"
                    //   style={{ width: "2rem", height: "2rem" }}
                    // />
                    // <PostAdd style={{ color: '#06c79c'}} className="circule_btn" onClick={handleClick} id={"upload_" + requisito.name}/>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#06c8f4", fontSize: "1.2rem" }}
                    />
                  ) : (
                    <PostAdd
                      style={{ color: "#06c79c" }}
                      className="circule_btn"
                      onClick={handleClick}
                      id={"upload_" + requisito.name}
                    />
                  )}

                  <Meta
                    id={"mati_button" + requisito.name}
                    flow={requisito.flow}
                  />
                </Col>
                <Col>
                  <>
                    <Row>
                      <div
                        className="metropolisLight fz12 text_title"
                        onClick={handleClick}
                        id={"button_" + requisito.name}
                      >
                        {requisito.description}
                      </div>
                    </Row>
                    <Row>
                      <>
                        {initialValues[requisito.name] && (
                          <>
                            {initialValues[requisito.name].map((doc, index) => (
                              <Row key={index} className="mb-1">
                                <Col xs="2" lg="2" className="text-center">
                                  {/* <img
                              src={prueba}
                              alt="uncheck"
                              style={{ width: "2rem", height: "2rem", color:"#06c8f4" }}
                            /> */}
                                </Col>
                                <Col>
                                  <span className="metropolisLight fz10 text_disabled">
                                    {nameAux(doc)}
                                  </span>
                                </Col>
                              </Row>
                            ))}
                          </>
                        )}
                      </>
                    </Row>
                    <Row className="justify-content-center align-content-center">
                      <Col xs="1" lg="1" className="text-center"></Col>

                      <Col>
                        <div
                          className="metropolisLight fz10 text_disabled circule_btn"
                          id={"add_" + requisito.name}
                          style={{ marginTop: "auto", marginBottom: "auto" }}
                          onClick={handleAddMore}
                        >
                          {requisito.name === "oficialID"
                            ? "+ agregar socio"
                            : "+ agregar mas documentos"}
                        </div>
                      </Col>
                      {/* <PostAdd style={{ color: '#06c79c'}} className="circule_btn" onClick={handleClick} id={"upload_" + requisito.name}/> */}
                    </Row>
                  </>
                </Col>
              </Row>
            ))}
        </Card.Body>
      </Card>
    );
  };

  const Cards = () => {
    return (
      <>
        <div className="container-md mt-3">
          <Row xs={1} md={2} lg={warranty ? 3 : 2} xl={warranty ? 3 : 2}>
            <Col className="col-sm">
              <Tarjetas step="A" title="socios" number="1" />
            </Col>
            <Col className="col-sm">
              <Tarjetas step="B" title="empresa" number="2" />
            </Col>
            {warranty && (
              <Col className="col-sm">
                <Tarjetas step="C" title="garantia" number="3" />
              </Col>
            )}
          </Row>
        </div>
      </>
    );
  };

  return (
    <>
      <Banner />
      <div className="container-md">
        <Cards />
      </div>
    </>
  );
};

export default NewDoc;
