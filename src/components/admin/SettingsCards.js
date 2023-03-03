import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography
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

  const { admin } = useSelector((state) => state);

  useEffect(() => {
    if(admin.user === null){
      window.location.replace("/login");
    }
  }, [admin]);

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

  const handleReload = () => {
    setReload(!reload);
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
        </Container>
      </Box>
}
    </>
    )
};
export default SettingsCards;
