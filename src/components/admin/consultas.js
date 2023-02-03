import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import Modal from "react-responsive-modal";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@material-ui/core";
import Axios from "../../utils/axios";
import { indexOf } from "lodash";
import { get } from "jquery";

const Consulta = ({ consulta, setOpen, ...rest }) => {
  const [datos, setDatos] = React.useState(consulta);

  React.useEffect(() => {
    setDatos(consulta);
  }, [consulta]);
  return (
    <Card
      elevation={5}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1rem",
      }}
      {...rest}
    >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {Object.keys(datos).map((key, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="left">{key}</TableCell>
                <TableCell align="left">{datos[key]}</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
      <Box sx={{ flexGrow: 1 }} />
      {/* <Divider /> */}
      <Box style={{ p: 2 }}>
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {/* <Grid
                item
                sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                }}
            >
                <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
                >
                Updated 2hr ago
                </Typography>
            </Grid> */}
        </Grid>
      </Box>
    </Card>
  );
};

const TableTop = ({ keys, setOpen, ...rest }) => {
  return (
    <TableHead>
      <TableRow id="tableHead">
        {keys.map((key, index) => {
          return (
            <TableCell key={"tableHead" + index} align="left">
              {key}
            </TableCell>
          );
        })}
        <TableCell align="left">Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
};

const TableBottom = ({ consultas, setOpen, keys, ...rest }) => {
  let columns = keys;
  function createCell(key, value, index) {
    let cell = null;
    if (typeof value === "object") {
      value = JSON.stringify(value);
      cell =
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Ver
        </Button>
    } else {
        cell = <TableCell align="left">{value}</TableCell>;
    }
    return cell;
    
  }

  function emptyCell (index) {
      let cell = <TableCell key={"emptyCell" + index} align="left"></TableCell>
        return cell;
  }


  function createRow(consulta) {
    return (
      <TableRow key={consulta._id}>
        {Object.keys(consulta).map((key, index) => {
          return createCell(key, consulta[key], index);
        })}
        <TableCell align="left">
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Ver
          </Button>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <TableBody>
      {consultas.map((consulta, index) => {
        return createRow(consulta);
      })}
    </TableBody>
  );
};

const TableConsultas = ({ consultas, setOpen, ...rest }) => {
  const [keys, setKeys] = React.useState([]);

  useEffect(() => {
    let helper = [];
    if (consultas.length > 0) {
      consultas.map((consulta, index) => {
        Object.keys(consulta).map((key, index) => {
          if (indexOf(helper, key) === -1) helper.push(key);
        });
      });
      setKeys(helper);
    }
  }, [consultas]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableTop keys={keys} />
        <TableBottom consultas={consultas} keys={keys} />
        {/* <TableBody>
          {consultas.map((consulta, index) => {
            return (
              <TableRow key={index}>
                {Object.keys(consulta).map((key, index) => {
                  return <TableCell align="left">{consulta[key]}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
};

const Consultas = () => {
  const { admin } = useSelector((state) => state.admin);
  const history = useHistory();
  const dispatch = useDispatch();

  const [consultas, setConsultas] = React.useState([]);
  const [consulta, setConsulta] = React.useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (consultas.length > 0) {
      dispatch(updateLoader(false));
    } else {
      dispatch(updateLoader(true));
    }
  }, [consultas]);

  useEffect(() => {
    Axios.get("/control/consultas")
      .then((res) => {
        setConsultas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleConsulta = (consulta) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return consultas.length > 0 ? (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3 }}>
        <Loader />
        {/* <Modal open={open} onClose={handleClose} center>
        <Consulta consulta={consulta} setOpen={setOpen} />
      </Modal> */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h4">
              Consultas
            </Typography>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    consultas realizadas:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
                  <Typography color="textSecondary" variant="body1">
                    {consultas.length}
                  </Typography>
                </Box>
                <Divider />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableConsultas consultas={consultas} setOpen={setOpen} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  ) : (
    <Loader />
  );
};

export default Consultas;
