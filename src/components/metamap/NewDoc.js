import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLoader } from "../../redux/actions/loaderActions";
import { ToastContainer } from "react-toastify";
// import {AltLoader} from "../Loader/altLoader";
import Loader from "../Loader/Loader";
import "./newdoc.css";
import bannerweb from "../../assets/img/carousel/documentos_banner.png";
import bannermovil from "../../assets/img/carousel/documentos_banner_mob.png";
import io from "socket.io-client";
import { Grid } from "@material-ui/core";
import TarjetaDoc from "./tarjetasDoc";
import DocumentsModal from "../Appliance/DocumentsModal";
import PopUp from "../../forms/PopUp";
import Axios from "../../utils/axios";
import { execToast } from "../../utils/ToastUtils";
import { updateToast } from "../../redux/actions/appActions";

const Banner = () => {
  const [banner, setBanner] = useState(bannerweb);
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

const NewDoc = () => {
  const [socket, setSocket] = useState(null);
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const [typePerson, setTypePerson] = useState("");
  const [warranty, setWarranty] = useState("");
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
  const [status, setStatus] = useState(false);
  const [ciec, setCiec] = useState(false);
  const [show, setShow] = useState(true);
  const [socketId, setSocketId] = useState(null);
  const [idClient, setIdClient] = useState(null);
  const [docID, setDocID] = useState(null);
  const [loader, setLoader] = useState(null);
  const history = useHistory();
  const toast = useSelector((state) => state.app.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    const $user = JSON.parse(sessionStorage.getItem("user"));
    if ($user) {
      setUser($user);
      setIdClient($user.idClient);
      setTypePerson($user.idClient.type);
      let $ciec = $user.idClient.appliance[0].idComercialInfo.ciec;
      $ciec ? setCiec(true) : setCiec(false);
      let $warranty = parseInt(
        $user.idClient.appliance[0].idComercialInfo.warranty
      );
      $warranty === 4 ? setWarranty(null) : setWarranty($warranty);
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
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
        } else if (key === "status") {
          setStatus(user.idClient.appliance[0].idDocuments[key]);
        }
      }
      setStatus(user.idClient.appliance[0].idDocuments.status);
      setDocID(user.idClient.appliance[0].idDocuments._id);
    }
  }, [user, initialValues]);

  useEffect(() => {
    let idU = user ? user.idClient._id : null;
    const newSocket =
      idU &&
      io.connect(process.env.REACT_APP_BACKEND, {
        transports: ["websocket"],
        autoConnect: true,
        forceNew: true,
        query: {
          idU: idU,
        },
      });
    newSocket && setSocket(newSocket);
    newSocket && setUid(idU);
    newSocket &&
      newSocket.on("connect", () => {
        console.log("conectado");
        setSocketId(newSocket.id);
      });
    return () => {
      newSocket && newSocket.connect();
    };
  }, [setSocket, user]);

  useEffect(() => {
    const updateInitialValues = (name, value) => {
      for (let i = 0; i < value.length; i++) {
        if (initialValues[name] !== undefined) {
          if (initialValues[name].length > 0) {
            if (initialValues[name].indexOf(value[i]) === -1) {
              initialValues[name].push(value[i]);
            }
          } else {
            initialValues[name].push(value[i]);
          }
        }
      }
      setValues({ ...initialValues });
    };
    const updateUser = () => {
      const $user = JSON.parse(sessionStorage.getItem("user"));
      setUser($user);
    };
    if (socket) {
      socket.on("updateUser", (data) => {
        let { documentUpdate, userUpdate } = data;
        for (const key in documentUpdate) {
          if (
            documentUpdate.hasOwnProperty(key) &&
            key !== "__v" &&
            key !== "_id"
          ) {
            updateInitialValues(key, documentUpdate[key]);
          } else if (key === "status") {
            setStatus(documentUpdate[key]);
          }
        }
        sessionStorage.setItem("user", JSON.stringify(userUpdate));
        updateUser();
        dispatch(updateLoader(false));
      });
    }
  }, [socket, dispatch, setValues, initialValues]);

  useEffect(() => {
    if (socket) {
      socket.on("doc_error", (data) => {
        console.log(data);
        alert(data);
      });
    }
    return () => socket?.off("doc_error");
  }, [socket, uid]);

  const btnclass = (st) => {
    if (st) {
      return "w-100 btn_doc fz16 bluePrimary btn btn-primary";
    } else {
      return "w-100 btn_doc_disabled fz16 bluePrimary btn btn-primary";
    }
  };

  const updateStatus = async (status) => {
    dispatch(updateLoader(true, "estamos actualizando el estado de tus documentos"));
    let data = {
      status: status,
      metadata: {
        uid: user._id,
        socketId: socketId,
        docID: docID,
      },
    };
    await Axios.post(`api/meta/update`, data).then((res) => {
      if (res.data.user) {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        dispatch(updateLoader(false));
      } else {
        alert ("Error al actualizar el estado del documento");
        dispatch(updateLoader(false));
      }
    });
    // dispatch(updateLoader(false));
  };

  useEffect(() => {
    if (typePerson && user) {
      let minreq = minRequired(typePerson);
      let $warranty = ["guaranteeStatement", "guaranteeFixedAssets"];
      let reqCiec = ciec ? [] : ["lastDeclarations"];
      let reqWarranty =
        warranty === 1
          ? [$warranty[0]]
          : warranty === 2
          ? [$warranty[1]]
          : warranty === 3
          ? $warranty
          : [];
      let req = [...minreq, ...reqCiec, ...reqWarranty];
      let $status = true;
      for (let i = 0; i < req.length; i++) {
        if (initialValues.hasOwnProperty(req[i])) {
          if (initialValues[req[i]].length === 0) {
            $status = false;
            break;
          }
        }
      }
      setStatus($status);
    }
  }, [user, status, ciec, warranty, typePerson, initialValues, socketId]);

  useEffect(() => {
    if (user) {
      if (status) {
        if (user.idClient.appliance[0].idDocuments._id && user.idClient.appliance[0].idDocuments.status === false) {
          updateStatus(true);
        }
      }
    }
  }, [status, user, uid, socket, docID]);

  const minRequired = (key) => {
    switch (key) {
      case "PF":
        return [
          "oficialID",
          "proofAddressMainFounders",
          "bankStatements",
        ];
      case "PFAE":
        return [
          "oficialID",
          "proofAddress",
          "proofAddressMainFounders",
          "bankStatements",
        ];
      case "PM":
        return [
          "oficialID",
          "rfc",
          "proofAddress",
          "proofAddressMainFounders",
          "bankStatements",
          "constitutiveAct",
        ];
      default:
        return [];
    }
  };
  const handleUpload = async () => {
    dispatch(updateLoader(true));
    
    if (
      JSON.parse(sessionStorage.getItem("user")).idClient.appliance[0]
        .idDocuments.status === true &&
      idClient.appliance.length > 0 &&
      status === true
    ) {
      const appliance = idClient.appliance[idClient.appliance.length - 1];
      
      const applianceRequest = await Axios.put(
        `api/appliance/${appliance._id}`,
        { status: true }
      );
      if (!applianceRequest.data.hasOwnProperty("error")) {
        sessionStorage.setItem(
          "user",
          JSON.stringify(applianceRequest.data.user)
        );
        setUser(JSON.parse(sessionStorage.getItem("user")));
      }
      history.push("/credito/solicitud/" + appliance._id);

    } else {
      history.push("/credito");
    }
    dispatch(updateLoader(false));
  };

  const handleBack = async () => {
    dispatch(updateLoader(true, 
      "estamos actualizando el estado de tus documentos"));
    await Axios.get(`api/meta/data`).then((res) => {
      console.log(res.data);
    });
    dispatch(updateLoader(false));
  };

  return (
    <>
      <ToastContainer />
      <Loader />
      <Banner />
      <DocumentsModal />
      {typePerson !== "PF" && !ciec && (
        <PopUp
          show={show}
          setShow={(value) => setShow(value)}
          isDocuments={true}
        />
      )}
      <Grid container justify="center" align="center" className="mt-2">
        {Array.from(Array(warranty ? 3 : 2)).map((_, index) => (
          <Grid
            item
            xs={11}
            md={warranty ? 3 : 5}
            lg={warranty ? 3 : 5}
            style={{ padding: "1rem" }}
            key={index}
          >
            <TarjetaDoc
              index={index}
              typePerson={typePerson}
              initialValues={initialValues}
              setValues={setValues}
              setStatus={setStatus}
              socket={socket}
              socketId={socketId}
              uid={uid}
              warranty={warranty}
              user={user}
              setUser={setUser}
              ciec={ciec}
              setShow={setShow}
              setLoader={setLoader}
            />
          </Grid>
        ))}
        <Grid item xs={11} md={5} lg={5} style={{ padding: "1rem" }}>
          <Button className={btnclass(status)} onClick={handleUpload}>
            {status ? "enviar solicitud" : "faltan documentos por subir"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NewDoc;
