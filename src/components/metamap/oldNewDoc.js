import React, {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useCallback,
  } from "react";
  import { Card, Button, Row, Col } from "react-bootstrap";
  import { requisitos, garantias } from "./requisitos";
  import {
    Add,
    PostAdd,
    LayersClearOutlined,
    VideoCallRounded,
  } from "@material-ui/icons";
  import Tooltip from "@material-ui/core/Tooltip";
  import Title from "../Generic/Title";
  import Steps from "../Appliance/Steps";
  import "./newdoc.css";
  import bannerweb from "../../assets/img/carousel/documentos_banner.png";
  import bannermovil from "../../assets/img/carousel/documentos_banner_mob.png";
  import check from "../../assets/img/underline_men/tick-05.svg";
  import upload from "../../assets/img/underline_men/documentos_banner_upload.svg";
  import { useSelector, useDispatch } from "react-redux";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCheck, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
  import io from "socket.io-client";
  import Axios from "../../utils/axios";
  import { update } from "lodash";
  import { Grid } from "@material-ui/core";
  
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
    const [size, setSize] = useState(0);
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
      guaranteeStatement: [],
      guaranteeFixedAssets: [],
      status: false,
    });
    const [socket, setSocket] = useState(null);
    const [uid, setUid] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
      const update = async (id) => {
        await Axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/update`, {
          data: "update",
          uid: uid,
          id,
        })
          .then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const getUser = () => {
        const userX = JSON.parse(sessionStorage.getItem("user"));
        if (
          userX.idClient.appliance[0].idDocuments === undefined ||
          userX.idClient.appliance[0].idDocuments === null
        ) {
          return;
        }
  
        let idDoc = userX.idClient.appliance[0].idDocuments;
        if (idDoc.__v === 0) {
          let id = userX._id;
          update(id);
        }
      };
      getUser();
    }, []);
  
    useEffect(() => {
      if (window.innerWidth < 768) {
        setBanner(bannermovil);
        setSize(1);
      } else {
        setBanner(bannerweb);
        setSize(0);
      }
      const getsize = () => {
        if (window.innerWidth < 768) {
          setBanner(bannermovil);
          setSize(1);
        } else {
          setBanner(bannerweb);
          setSize(0);
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
        setUser(user);
        setTypePerson(user.idClient.type);
        setCiec(user.idClient.appliance[0].idComercialInfo.ciec);
        setWarranty(
          garantias[user.idClient.appliance[0].idComercialInfo.warranty]
        );
        setRequisitos(requisitos[user.idClient.type]);
        if (user.idClient.appliance[0].hasOwnProperty("idDocuments")) {
          for (const key in user.idClient.appliance[0].idDocuments) {
            if (
              user.idClient.appliance[0].idDocuments.hasOwnProperty(key) &&
              key !== "__v" &&
              key !== "_id"
            ) {
              if (
                user.idClient.appliance[0].idDocuments[key].length > 0 &&
                user.idClient.appliance[0].idDocuments[key] !== undefined
              ) {
                initialValues[key] = user.idClient.appliance[0].idDocuments[key];
              }
            }
          }
        }
      } else {
        window.location.href = "/login";
      }
    }, []);
  
    useEffect(() => {
      warranty ? setTags([...requisitod, ...warranty]) : setTags([...requisitod]);
    }, [requisitod, warranty]);
  
    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      let idU = user.idClient._id;
      const newSocket = io.connect(process.env.REACT_APP_BACKEND, {
        transports: ["websocket"],
        autoConnect: true,
        forceNew: true,
        query: {
          idU: idU,
        },
      });
      setSocket(newSocket);
      newSocket.on("connect", () => {
        console.log("connected");
        setUid(newSocket.id);
      });
      return () => newSocket.close();
    }, [setSocket]);
  
    useEffect(() => {
      socket?.on("message", (data) => {
        console.log(data);
      });
      return () => socket?.off("message");
    }, [socket]);
  
    const copyURL = (e) => {
      let element = e.target;
      const el = document.createElement("textarea");
      el.value = "https://www.google.com";
      element.appendChild(el);
      el.select();
      document.execCommand("copy");
      const popup = document.createElement("div");
      popup.classList.add("popup");
      <Tooltip title="Copiado" placement="top" arrow>
        <FontAwesomeIcon icon={faCheck} />
      </Tooltip>;
      popup.innerHTML = "Copiado";
  
      element.appendChild(popup);
      setTimeout(() => {
        popup.remove();
      }, 2000);
      el.remove();
    };
  
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
        name: "prueba",
        description: "prueba",
        state: true,
        require: true,
        flow: "62fb09fa249da5001d41ce7e",
        step: "B",
      });
    };
  
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
      const [meta, setMeta] = useState(null);
      let ref = useRef();
      useEffect(() => {
        setElement(ref.current);
      }, [ref]);
  
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
  
      let accion = props.id.split("_")[1];
  
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
            uid: uid,
            canal: "distrito_pyme",
            idUSer: props.idUser,
            accion: accion,
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
  
    const IconMedia = (props) => {
      return (
        <img
          src={props.icon}
          alt="icon"
          style={{
            width: "1.5em",
            maxInlineSize: "100%",
            verticalAlign: "baseline",
          }}
          className={props.class}
        />
      );
    };
  
    const Tarjetas = ({ step, title, number, user }) => {
      const [value, setValue] = useState("");
      const [style, setStyle] = useState("none");
      const [userp, setUserp] = useState(user);
      const ref = useRef();
      const handleClick = (e, more) => {
        let id = e.currentTarget.id.split("_")[1];
        // if (initialValues[id].length > 0 && more !== true) {
        //   return;
        // }
        document.getElementById("mati_" + id).click();
      };
      useEffect(() => {
        console.log("valor", value);
        console.log("user", userp);
        console.log("initialValues", initialValues);
      }, [value, userp, initialValues]);
      let idUser = userp ? userp._id : "";
  
      const handleAddMore = (e) => {
        let id = e.currentTarget.id.split("_")[1];
        console.log(id);
        if (id === "socios") {
          setTags((oldArray) => [
            ...oldArray,
            {
              name: "oficialID",
              description: "oficialID",
              state: true,
              require: true,
              flow: "62f15ad24621d7001caa5471",
              step: "A",
            },
          ]);
          console.log(tags);
        } else {
          let more = true;
          handleClick(e, more);
        }
      };
  
      useEffect(() => {
        const calculo = () => {
          let widthW = window.innerWidth;
          let heightW = window.innerHeight;
          let aspectRatio = "";
          let width = ref.current.offsetWidth;
          let height = ref.current.offsetHeight;
          if (
            /Android | webOS | iPhone | iPad | iPod | Blackberry | IEMobile | Opera Mini/i.test(
              navigator.userAgent
            )
          ) {
            aspectRatio = "mobile";
            setStyle(`translate(${-width / 100}px, ${height / 9}px)`);
          } else {
            aspectRatio = "desktop";
            setStyle(`translate(${-width / 9}px, ${height / 9}px)`);
          }
          if (widthW > 0 && widthW <= 768) {
            aspectRatio === "mobile"
              ? setStyle(`translate(${-width / 100}px, ${height / 9}px)`)
              : setStyle(`scale(0.8)`);
          } else if (widthW > 768 && widthW <= 992) {
            aspectRatio === "mobile"
              ? setStyle(
                  `translate(${width / 2.3}px, -${height / 0.7}px) scale(0.7)`
                )
              : setStyle(`translate(${-width / 9}px, ${height / 9}px)`);
          } else if (widthW > 992 && widthW <= 1200) {
            setStyle(`translate(${width / 4}px, -${height / 0.7}px) scale(0.9)`);
          } else if (widthW > 1200 && widthW <= 1600) {
            setStyle(`translate(-${width / 9}px, ${height / 9}px)`);
          } else {
            setStyle(`translate(-${width / 1.3}px, ${height / 9}px)`);
          }
        };
  
        calculo();
        window.addEventListener("resize", () => {
          calculo();
        });
        return () => {
          window.removeEventListener("resize", () => {
            calculo();
          });
        };
      }, [ref.current]);
  
      let classlist = (name) => {
        let aux = initialValues[name];
        return aux !== undefined
          ? aux.length > 0
            ? "metropolisReg fz12 text_title"
            : "metropolisReg fz12 text_title_alt"
          : "metropolisReg fz12 text_title_alt";
      };
      return (
        <Card
          style={{ maxWidth: "90vw", border: "none" }}
          className="h-100 shadow2 mb-5"
        >
          <Card.Header
            style={{
              backgroundColor: "initial",
              paddingBottom: "0",
              border: "none",
            }}
          >
            {" "}
            <Grid
              container
              spacing={3}
              align="center"
              alignItems="center"
              style={{ flexWrap: "nowrap" }}
            >
              <Grid item xs={2} md={2}>
                <div className="outline_number coolvetica">{number}</div>
              </Grid>
              <Grid
                item
                style={{
                  marginLeft: "1rem",
                  alignSelf: "stretch",
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "0rem",
                }}
              >
                <Grid
                  container
                  spacing={3}
                  align="center"
                  alignItems="center"
                  ref={ref}
                  direction="column"
                >
                  <Grid item style={{ padding: "0" }}>
                    <span
                      className="text_title_altblue"
                      style={{ fontSize: "2rem", lineHeight: "1rem" }}
                    >
                      documentos
                    </span>
                  </Grid>
                  <Grid item style={{ padding: "0", alignSelf: "baseline" }}>
                    <span
                      className="text_title_blue"
                      style={{ fontSize: "2rem", lineHeight: "1rem" }}
                    >
                      {title}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
                        style={{ color: "#06c79c", fontSize: "1.2rem" }}
                      />
                    ) : (
                      <IconMedia
                        class="circule_btn"
                        onClick={handleClick}
                        id={"upload_" + requisito.name}
                        icon={upload}
                      />
                    )}
                    <Meta
                      id={"mati_" + requisito.name}
                      flow={requisito.flow}
                      socketid={socket}
                      idUser={idUser}
                    />
                  </Col>
                  <Col>
                    <>
                      <Row>
                        <div
                          className={classlist(requisito.name)}
                          style={{ textAlign: "left" }}
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
                                  <Col>
                                    <span
                                      className="metropolisLight fz10 "
                                      style={
                                        doc.status === true
                                          ? { color: "#C6C6C6" }
                                          : { color: "#C6C6C6" }
                                      }
                                    >
                                      {doc.name}
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
                            className="metropolisReg fz10 text_disabled"
                            id={"add_" + requisito.name}
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                            onClick={handleAddMore}
                          >
                            {requisito.name === "oficialID"
                              ? null
                              : "+ agregar más documentos"}
                          </div>
                        </Col>
                        {/* <PostAdd style={{ color: '#06c79c'}} className="circule_btn" onClick={handleClick} id={"upload_" + requisito.name}/> */}
                      </Row>
                    </>
                  </Col>
                </Row>
              ))}
            {typePerson === "PM" && step === "A" && (
              <Row className="justify-content-center align-content-center">
                <Col>
                  <div
                    className="metropolisReg fz10 text_disabled"
                    id={"add_socios"}
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                    onClick={handleAddMore}
                  >
                    + agregar más socios
                  </div>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      );
    };
  
    return (
      <>
        <Banner />
        <Grid container justify="center" align="center" className="mt-2">
          <Grid
            item
            xs={11}
            md={warranty ? 3 : 5}
            lg={warranty ? 3 : 5}
            style={{ padding: "1rem" }}
          >
            <Tarjetas
              step={"A"}
              title={typePerson === "PM" ? "socios" : "personales"}
              number={1}
              user={user}
            />
          </Grid>
          <Grid
            item
            xs={11}
            md={warranty ? 3 : 5}
            lg={warranty ? 3 : 5}
            style={{ padding: "1rem" }}
          >
            <Tarjetas step={"B"} title="empresa" number={2} user={user} />
          </Grid>
  
          {warranty && (
            <Grid item xs={11} md={3} lg={3} style={{ padding: "1rem" }}>
              <Tarjetas step={"C"} title="garantía" number={3} user={user} />
            </Grid>
          )}
        </Grid>
      </>
    );
  };
  
  export default NewDoc;

  // return array.map((req) => {
  //   if(req.step !== step) {
  //     console.log(req.name, step)
  //     return null;
  //   }

  //   let tag = tags.hasOwnProperty(req.name) ? tags[req.name] : false;
    
  //   return (
  //     <div
  //       className="requirement"
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         justifyContent: "space-between",
  //         marginBottom: "1rem",
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           alignItems: "center",
  //         }}
  //       >
  //         <div
  //           style={{
  //             width: "1.5rem",  
  //             height: "1.5rem",
  //             borderRadius: "50%",
  //             backgroundColor: tag ? "#505DED" : "#E5E5E5",
  //             marginRight: "1rem",
  //           }}
  //         ></div>
  //         <span
  //           className="text_title_altblue"
  //           style={{ fontSize: "1.5rem", lineHeight: "1rem" }}
  //         >
  //           {req.description}
  //         </span>
  //       </div>
  //       <div>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           style={{
  //             backgroundColor: tag ? "#505DED" : "#E5E5E5",
  //             color: tag ? "#FFFFFF" : "#505DED",
  //             borderRadius: "1.5rem",
  //             padding: "0.5rem 1rem",
  //             fontSize: "1.5rem",
  //             lineHeight: "1rem",
  //             textTransform: "none",
  //           }}
  //           onClick={() => {
  //             setStep(req.step);
  //             setFile(req);
  //           }
  //           }
  //         >
  //           {tag ? "Subido" : "Subir"}
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // });
  