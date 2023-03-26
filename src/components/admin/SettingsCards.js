import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography, 
  Switch,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
} from "@material-ui/core";
import {ProductCard} from "./data-card";
import Modal from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/axios";
import { updateLoader } from "../../redux/actions/loaderActions";
import Loader from "../Loader/Loader";
import { SettingsPassword } from "./SettingsPassword";

const SettingsCards = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [datos, setDatos] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [unykoo, setUnykoo] = useState(false);
  const [ciec, setCiec] = useState("");

  const { admin } = useSelector((state) => state);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if(user === null){
      window.location.replace("/login");
    }
    if(user.access !== "ADMIN"){
      window.location.replace("/login");
    }
  }, [user]);

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleChange = (name) => {
    products.map((product) => {
      if (product.name === name) {
        setDatos(product);
      }
    });
    setOpen(true);
  };

  useEffect(() => {
    dispatch(updateLoader(true));
    if(data.length > 0){
      setProducts(data);
      dispatch(updateLoader(false));
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    console.log("reload");
    Axios.get("/control/buro").then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [reload]);

  useEffect(() => {
    Axios.get("/control/buro/unykoo").then((res) => {
      setUnykoo(res.data.unykoo);
    }).catch((err) => {
      console.log(err);
    });
  }, [reload]);

  useEffect(() => {
    Axios.post("/control/ciec").then((res) => {
      console.log(res);
      setCiec(res.data.passwordBuro);
    }).catch((err) => {
      console.log(err);
    });
  }, [reload]);



  const handleReload = () => {
    setReload(!reload);
  };

  const handleCiec = () => {
    console.log(ciec);
    setDatos({
      name: "ciec",
      userBuro: "dpyme",
      passwordBuro: ciec,
    });
    setOpen(true);
  };

  const handleUnykoo = () => {
    dispatch(updateLoader(true));
    Axios.post("/control/unykoo", { update: !unykoo }).then((res) => {
      console.log(res);
      let data = res.data;
      setUnykoo(data.unykoo);
      alert("Se ha actualizado correctamente");
      dispatch(updateLoader(false));
    }).catch((err) => {
      console.log(err);
      alert("Ha ocurrido un error");
      dispatch(updateLoader(false));
    });
  };


  return(
    <>
    {
    data.length <= 0 ? <Loader /> :

    <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Loader />
        <Modal open={open} onClose={onCloseModal} center classNames={{ modal: "customModal" }}>
          <SettingsPassword datos={datos} handleReload={handleReload}/>
        </Modal>
        <Container maxWidth="lg">
  
                  <div
                    className="title-dp fz42 fw500 mb-1 text-center mt-2"
                    style={{ color: "#213970" }}
                  >
                    <span style={{ color: "#EF4E5B" }}> Usuarios </span> para buro
                  </div>
                  <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                  style={{
                    fontFamily: "Metropolis-Regular",
                    textAlign: "center",
                  }}
                  className="mb-4"
                >
                  selecciona el usuario que deseas editar
                </Typography>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product._id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} setOpen={handleChange} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ pt: 3 }}>
          <div
                    className="title-dp fz42 fw500 mb-1 text-center mt-2"
                    style={{ color: "#213970" }}
                  >
                    <span style={{ color: "#EF4E5B" }}> consulta </span> de buro y ciec
                  </div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                  <Card
                  elevation={5}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "1rem",
                  }}>
                    <CardHeader
                      title="consulta de buro"
                    />
                    <Divider />
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                    <h4 className="mb-0 font-weight-bold">{unykoo ? "Desactivada" : "Activada"}</h4>

                        <Switch
                          checked={!unykoo}
                          onChange={handleUnykoo}
                          name="checkedB"
                          color="primary"
                        />

                        
                    </CardContent>
                  </Card>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                  <Card
                  elevation={5}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "1rem",
                  }}>
                    <CardHeader
                      title="contraseña ciec"
                    />
                    <Divider />
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4 className="mb-0 font-weight-bold">{ciec}</h4>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleCiec()}
                      >
                        Actualizar
                      </Button>

                    </CardContent>
                  </Card>
                </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
}
    </>
    )
};
export default SettingsCards;
