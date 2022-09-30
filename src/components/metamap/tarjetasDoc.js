import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { Grid, Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateLoader } from "../../redux/actions/loaderActions";
import upload from "../../assets/img/underline_men/documentos_banner_upload.svg";

const handleClick = (e, more) => {
  if (more === true) {
    return;
  }
  console.log(more);
  let id = e.currentTarget.id.split("_")[1];
  document.getElementById("mati_" + id).click();
};

const nameAux = (value) => {
  let nameDoc = "";
  if (value.name === undefined) {
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
  nameDoc.length > 20 && (nameDoc = nameDoc.substring(0, 20) + "...");
  return nameDoc;
};

const IconMedia = ({ length, typePerson, step, icon, id, cls }) => {
  if (length === null || length === undefined) {
    length = 0;
  }
  let iconCase =
    // step === 0 && typePerson === "PM"
    //   ? length > 1
    //     ? true
    //     : false
       length > 0 ? true : false;
  switch (iconCase) {
    case true:
      return (
        <FontAwesomeIcon
          icon={faCheck}
          id={id}
          alt="icon"
          style={{ color: "#06c79c", fontSize: "1.2rem" }}
        />
      );

    default:
      return (
        <img
          src={icon}
          id={id}
          alt="icon"
          style={{
            verticalAlign: "baseline",
          }}
          className={cls}
          onClick={handleClick}
        />
      );
  }
};

const Meta = (props) => {
  const [element, setElement] = useState(null);
  let ref = useRef();
  let accion = props.id.split("_")[1];

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (element !== null) {
      element.addEventListener("metamap:exitedSdk", ({ detail }) => {
        props.dispatch(updateLoader(false));
      });
      return () => {
        element.removeEventListener("metamap:exitedSdk", ({ detail }) => {
          props.dispatch(updateLoader(false));
        });
      };
    }
  }, [element, props]);

  const handleCl = () => {
    setTimeout(() => {
      props.dispatch(
        updateLoader(
          true,
          "estamos procesando tus documentos y en breve te daremos una respuesta"
        )
      );
    }, 1000);
  };

  return (
    <metamap-button
      id={props.id}
      clientid="62f15ad24621d7001caa5472"
      flowId={props.flow}
      color="#023473"
      metadata={JSON.stringify({
        socketId: props.socketId,
        canal: "distrito_pyme",
        userId: props.idUser,
        accion: accion,
      })}
      ref={ref} // reference to the DOM element
      style={{ display: "none" }}
      onClick={handleCl}
      debbug={false}
    />
  );
};

const TagList = ({ tag, user, step, typePerson }) => {
  return tag.map((t, index) => {
    return (
      <div
        key={t.name === undefined ? nameAux(t) + index : t.name + index}
        style={{ overflow: "hiden" }}
      >
        {step === 0 && typePerson === "PM" && (
          <span className="metropolisLight fz10 " style={{ color: "#c6c6c6" }}>
            {`socio ${tag.indexOf(t) + 1}`}
          </span>
        )}
        <span
          style={{
            color: "#c6c6c6",
            textAlign: "right",
            padding: "0.2rem 0.5rem",
          }}
          className="metropolisLight fz10 "
        >
          {t.name === undefined ? nameAux(t) : t.name}
        </span>
      </div>
    );
  });
};

const PracticalSpan = (props) => {
  const history = useHistory();
  console.log(props);
  const handleCiec = () => {
    history.push(`/informacion-comercial/${props.userID}`);
  };
  return (
    <>
      <span
        style={{
          color: "#c6c6c6",
          padding: "0.2rem 0.5rem",
          textAlign: "right",
          cursor: "pointer",
          display: "inline-block",
        }}
        id={"more_" + props.name}
        onClick={handleClick}
        className="metropolisLight fz10 mt-2"
      >
        + agregar más documentos
      </span>
      {props.name === "lastDeclarations" && (
        <span
          style={{
            color: "#c6c6c6",
            textAlign: "center",
            cursor: "pointer",
            padding: "0.2rem 0.5rem",
            display: "block",
          }}
          id={"ciec_" + props.name}
          onClick={handleCiec}
          className="metropolisLight fz10 mt-2 ciecBtn"
        >
          ¿no tienes tu CIEC? {""}
        </span>
      )}
    </>
  );
};

const Requirement = ({
  req,
  tag,
  socketId,
  user,
  typePerson,
  setShow,
  setUser,
  setLoader,
  dispatch,
}) => {
  const userID = user !== null ? user._id : null;
  return (
    <Grid
      container
      spacing={2}
      align="center"
      alignItems="center"
      style={{ flexWrap: "nowrap", marginBottom: "1rem" }}
    >
      <Grid
        item
        xs={2}
        md={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconMedia
          cls="circule_btn"
          id={"upload_" + req.name}
          icon={upload}
          step={req.step}
          length={tag.length}
          typePerson={typePerson}
        />
      </Grid>
      <Grid
        item
        style={{
          marginLeft: "1rem",
          alignSelf: "stretch",
          display: "flex",
          alignItems: "center",
          paddingBottom: "0rem",
          width: "100%",
        }}
      >
        <Grid container align="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <p
              className={
                tag.length > 0
                  ? "metropolisReg fz12 text_title"
                  : "metropolisReg fz12 text_title_alt"
              }
              style={{
                margin: "0",
                padding: "0",
                textJustify: "left",
                textAlign: "left",
                alignSelf: "stretch",
              }}
              onClick={(e) => {
                let more = tag.length > 0 ? true : false;
                handleClick(e, more);
              }}
              id={"req_" + req.name}
            >
              {req.description}
            </p>

            <Meta
              id={"mati_" + req.name}
              flow={req.flow}
              socketId={socketId}
              idUser={user !== null && user !== undefined ? user._id : null}
              setUser={setUser}
              setLoader={setLoader}
              dispatch={dispatch}
            />
          </Grid>
          {tag !== false && tag.length > 0 && (
            <Grid item xs={12} md={12}>
              <TagList
                tag={tag}
                user={user}
                step={req.step}
                typePerson={typePerson}
              />
            </Grid>
          )}
          <Grid item xs={12} md={12}>
            {tag.length > 0 ? (
              <>
                {req.name === "rfc" || req.name === "oficialID" ? (
                  user.idClient.type === "PM" ? (
                    <PracticalSpan name={req.name} userID={userID} />
                  ) : null
                ) : (
                  <PracticalSpan name={req.name} userID={userID} />
                )}
              </>
            ) : (
              <PracticalSpan name={req.name} userID={userID} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const HeaderCard = (props) => {
  return (
    <Card.Header
      style={{
        backgroundColor: "initial",
        paddingBottom: "0",
        border: "none",
      }}
    >
      <Grid
        container
        spacing={3}
        align="center"
        alignItems="center"
        style={{ flexWrap: "nowrap" }}
      >
        <Grid item xs={2} md={2}>
          <div className="outline_number coolvetica">{props.number}</div>
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
                {props.title}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card.Header>
  );
};

const BodyCard = (props) => {
  const [step, setStep] = useState(props.step);

  const $requirements = (props, more) => {
    let tags = props.tags;
    let reqPF = [
      {
        name: "oficialID",
        flow: "62f15ad24621d7001caa5471",
        description:
          " identificación oficial y comprobante de domicilio particular",
        step: 0,
      },
      {
        name: "bankStatements",
        flow: "62f197e88a9445001c6bc082",
        description: "estados de cuenta bancarios",
        step: 1,
      },
      {
        name: "others",
        flow: "62fb0cb37b0f3a001ce0cd21",
        description: "otros documentos",
        step: 1,
      },
    ];
    let $ciec = !props.ciec
      ? [
          {
            name: "lastDeclarations",
            flow: "62fae060fe2073001c8ea616",
            description: "documentación fiscal",
            step: 1,
          },
        ]
      : [];
    let reqPFAE = [
      {
        name: "proofAddress",
        flow: "62fb09fa249da5001d41ce7e",
        description: "comprobante de domicilio de la empresa o negocio",
        step: 1,
      },
      ...$ciec,
      ...reqPF,
    ];
    let reqPM = [
      {
        name: "rfc",
        description: "constancia de situación fiscal",
        flow: "62f41fce34cd3c001cbd8120",
        step: 0,
      },
      {
        name: "constitutiveAct",
        description: "acta constitutiva, asamblea y poderes",
        flow: "62f56b0f235dfd001ed2a123",
        step: 1,
      },
      ...reqPFAE,
    ];
    let reqWarranty = [
      {
        name: "guaranteeStatement",
        description: "garantía inmobiliaria",
        flow: "62fe7fc0017992001cd8b11f",
        step: 2,
      },
      {
        name: "guaranteeFixedAssets",
        description: "activo fijo como garantía",
        flow: "62fc6cb8d9d2ed001cbe392d",
        step: 2,
      },
    ];

    let arrayType =
      props.typePerson === "PF"
        ? reqPF
        : props.typePerson === "PFAE"
        ? reqPFAE
        : reqPM;
    let warranty =
      props.warranty === 1
        ? [reqWarranty[0]]
        : props.warranty === 2
        ? [reqWarranty[1]]
        : props.warranty === 3
        ? reqWarranty
        : [];

    let array = [...arrayType, ...warranty];

    let arrayPrueba = [];

    array.map((req, index) => {
      if (tags.hasOwnProperty(req.name)) {
        if (tags[req.name].length > 0) {
          arrayPrueba.push(tags[req.name]);
        }
      }
    });

    if (more) {
      return array;
    }

    return array.map((req) => {
      if (req.step !== step) {
        return null;
      }

      let tag = tags.hasOwnProperty(req.name) ? tags[req.name] : false;
      return (
        <Requirement
          key={req.name}
          req={req}
          tag={tag}
          socketId={props.socketId}
          user={props.user}
          typePerson={props.typePerson}
          setShow={props.setShow}
          setUser={props.setUser}
          setLoader={props.setLoader}
          dispatch={props.dispatch}
        />
      );
    });
  };

  useEffect(() => {
    setStep(props.step);
  }, [props.step]);

  return (
    <Card.Body
      style={{
        backgroundColor: "initial",
        paddingTop: "0",
        paddingBottom: "0",
        border: "none",
      }}
    >
      {$requirements(props, false)}
    </Card.Body>
  );
};

const TarjetaDoc = (props) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(props.initialValues);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (props.index) {
      case 0:
        props.typePerson === "PM" ? setTitle("socios") : setTitle("personales");
        break;
      case 1:
        setTitle("empresa");
        break;
      case 2:
        setTitle("garantías");
        break;
      default:
        props.typePerson === "PM" ? setTitle("socios") : setTitle("personales");
        break;
    }
  }, [props.index, props.typePerson]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("updateUser", (data) => {
        dispatch(updateLoader(false));
      });
    }
    return () => props.socket?.off("updateUser");
  }, [dispatch, props.socket]);

  useEffect(() => {
    setTags(props.initialValues);
  }, [props.initialValues]);
  return (
    <>
      <Card style={{ border: "none" }} className="h-100 shadow2 mb-5">
        <HeaderCard number={props.index + 1} title={title} />
        <BodyCard
          tags={tags}
          step={props.index}
          typePerson={props.typePerson}
          warranty={props.warranty}
          socketId={props.socketId}
          user={props.user}
          status={props.setStatus}
          ciec={props.ciec}
          setShow={props.setShow}
          setUser={props.setUser}
          setLoader={props.setLoader}
          dispatch={dispatch}
        />
      </Card>
    </>
  );
};

export default TarjetaDoc;
