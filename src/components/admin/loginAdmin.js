import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import { loginAdmin } from "../../redux/actions/adminActions.js";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import Axios from "../../utils/axios";
import { useHistory } from "react-router-dom";

const LoginAdmin = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { admin } = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      email: "demo@devias",
      password: "Password123",
    },
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("el usuario es obligatorio"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      dispatch(updateLoader(true));
      console.log(formik.values);
      Axios.post("/admin/login", formik.values).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          console.log(res.data.user);
            dispatch(loginAdmin(res.data.user));
            dispatch(updateLoader(false));
        } else {
            alert("Usuario o contraseña incorrectos");
        }
        });
      dispatch(updateLoader(false));
    },
  });

  useEffect(() => {
    console.log(admin);
    if(admin.user !== null){
        history.push("/admin");
      // window.location.replace("/admin/control");
    }
  }, [admin]);

  return (
    <>
      <Loader />
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                style={{
                  fontFamily: "Metropolis-Regular",
                  textAlign: "center",
                }}
              >
                Iniciar sesión
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                style={{
                  fontFamily: "Metropolis-Regular",
                  textAlign: "center",
                }}
              >
                Inicie sesión en la plataforma con las contraseñas que se le
                proporcionaron
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="usuario"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="contraseña"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                style={{
                  fontFamily: "Metropolis-Regular",
                  borderRadius: "10px",
                  borderColor: "#213970",
                  backgroundColor: "#F24C5A",
                }}
              >
                Iniciar sesión
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default LoginAdmin;
