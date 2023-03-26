import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import Axios from "../../utils/axios";
import { updateLoader } from "../../redux/actions/loaderActions";
import Loader from "../Loader/Loader";
import * as Yup from "yup";

export const SettingsPassword = (props) => {
  const dispatch = useDispatch();
  const { datos, handleReload } = props;
  const [values, setValues] = useState({
    name: datos.name,
    user: datos.userBuro,
    password: "",
    confirm: "",
  });
  const [valid, setValid] = useState(false);
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: values,
    validationSchema: Yup.object({
      user: Yup.string().max(255).required("el usuario es obligatorio"),
      password: Yup.string().min(8, "la contraseña debe tener al menos 8 caracteres").max(255).required("la contraseña es obligatoria"),
      confirm: Yup.string().oneOf([Yup.ref("password"), null], "las contraseñas deben ser iguales").required("favor de confirmar la contraseña"),
    }),
    onSubmit: () => {
      dispatch(updateLoader(true));
      Axios.post("/control/buro", formik.values).then((res) => {
        handleReload();
        alert("usuario actualizado");
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      dispatch(updateLoader(false));
    },
  });

  const { errors, touched } = formik;

  useEffect(() => {
    if (errors.user || errors.password || errors.confirm) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [errors]);
  
  return (
    <Container maxWidth="sm">
      <form {...props}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Loader />
        <Card
          elevation={0}
        >
          <CardHeader subheader="porfavor revisar bien antes de enviar, los cambios realizados aqui afectan directamente el servidor" title={"usuario " + "para " + datos.name}
            style={{
              textAlign: "center",
            }} />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Usuario"
              margin="normal"
              name="user"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.user}
              variant="outlined"
              autoComplete={'' + Math.random()}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user} />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="filled-adornment-password"
                fullWidth
                type={values.showPassword ? "text" : "password"}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="password"
                autoComplete={'' + Math.random()}
                error={formik.touched.password && Boolean(formik.errors.password)}
                // helperText={formik.touched.password && formik.errors.password}
                endAdornment={<InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>} />
            </FormControl>
            <TextField
              fullWidth
              label="confirmar contraseña"
              margin="normal"
              name="confirm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={values.showPassword ? "text" : "password"}
              value={formik.values.confirm}
              variant="outlined"
              autoComplete={'' + Math.random()}
              error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              helperText={formik.touched.confirm && formik.errors.confirm} />

          </CardContent>

          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button color="primary" variant="contained" type="submit" disabled={valid}>
              actualizar
            </Button>
          </Box>
        </Card>
      </form>
    </Container>
  );
};
