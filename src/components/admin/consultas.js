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
  Chip,
  Input,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Axios from "../../utils/axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { indexOf } from "lodash";
import { get } from "jquery";
import { Alert, Form } from "react-bootstrap";
import { useFormik } from "formik";
import {updateSnackbar} from "../../redux/actions/snackActions";
import Snack from "../Loader/Snack";

const StyledButton = styled(Button)({
  background: "#023e8a",
  border: 0,
  borderRadius: "3rem",
  boxShadow: "0 3px 5px 2px rgba(138, 105, 255, 0.3)",
  color: "white",
  height: "2rem",
  padding: "0 30px",
});

const getDatos = async (id) => {
  const datos = await Axios.get(`/control/consultas/${id}`);
  return datos;
};

const Consulta = ({ code, setOpen, ...rest }) => {
  const [success, setSuccess] = React.useState(false);

  return (
    <Box style={{ p: 2 }}>
      <CopyToClipboard text={code}>
        <Button
          variant="contained"
          color="primary"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "3rem",
            backgroundColor: success ? "green" : "primary.main",
          }}
          onClick={() => setSuccess(true)}
        >
          <Box color="white" mr={0.5} className="fas fa-copy" /> Copy
        </Button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language="jsx"
        style={atomDark}
        showLineNumbers
        customStyle={{
          minWidth: "100%",
          minHeight: "10rem",
          maxHeight: "30rem",
          // fontSize: "1rem",
          // backgroundColor: "#fff",
          padding: "1rem 1rem 1rem 0.25rem",
          overflowY: "scroll",
          margin: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

const TableTop = ({ keys, setOpen, ...rest }) => {
  return (
    <TableHead>
      <TableRow id="tableHead">
        {keys.map((key, index) => {
          return (
            <TableCell key={"tableHead" + index} align="center">
              {key}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

const TableBottom = ({ consultas, setOpen, keys, displayData, ...rest }) => {
  let columns = keys;
  let displayOrder = {};

  keys.map((key, index) => {
    displayOrder[key] = { index: index };
  });

  function createCell(key, value, index) {
    let cell = null;
    if (typeof value === "object") {
      cell = (
        <TableCell key={key + index} align="center">
          <StyledButton
            color="primary"
            variant="contained"
            onClick={() => {
              displayData(value);
            }}
            style={{ backgroundColor: "#023473" }}
          >
            Ver
          </StyledButton>
        </TableCell>
      );
    } else if (key === "status") {
      cell = (
        <TableCell key={key + index} align="center">
          <Chip
            label={value}
            color={value === "success" ? "primary" : "secondary"}
            style={{
              minWidth: "5rem",
            }}
          />
        </TableCell>
      );
    } else {
      cell = <TableCell align="center">{value}</TableCell>;
    }
    return cell;
  }

  function emptyCell(index) {
    let cell = <TableCell key={"emptyCell" + index} align="left"></TableCell>;
    return cell;
  }

  function createRow(consulta) {
    columns.map((key, index) => {
      if (indexOf(Object.keys(consulta), key) === -1) {
        consulta[key] = "";
      }
    });

    let orden = Object.keys(consulta).sort((a, b) => {
      return displayOrder[a].index - displayOrder[b].index;
    });
    return (
      <TableRow key={consulta._id}>
        {orden.map((key, index) => {
          return createCell(key, consulta[key], index);
        })}
        {/* <TableCell align="left">
          <StyledButton
            color="primary"
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Ver
          </StyledButton>
        </TableCell> */}

        {/* <TableCell align="center">
          <StyledButton
            color="primary"
            variant="contained"
            onClick={() => {
              getDatos(consulta._id).then((res) => {
                console.log(res.data);
              });
            }}
            style={{ backgroundColor: "#023473" }}
          >
            ver datos
          </StyledButton>
        </TableCell> */}
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

const TableConsultas = ({ consultas, setOpen, displayData, ...rest }) => {
  const [keys, setKeys] = React.useState([]);

  useEffect(() => {
    let helper = [];
    consultas.map((consulta, index) => {
      if(consulta._id !== undefined){
        const { _id, ...rest } = consulta;
        consultas[index] = rest;
      }
    });
  }, [consultas]);

  useEffect(() => {
    let helper = [];
    let displayOrder = 0;
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
    keys.length > 0 && (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableTop keys={keys} />
          <TableBottom
            consultas={consultas}
            keys={keys}
            displayData={displayData}
          />
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
    )
  );
};

const FormularioConsulta = ({ setOpen, ...rest }) => {
  const dispatch = useDispatch();

  const addScore = async(values) => {
    return await Axios.post("/control/addburo", values);
  };

  const Formik = useFormik({
    initialValues: {
      email: "",
      score: "",
    },
    onSubmit: (values) => {
      dispatch(updateLoader(true));
      addScore(values).then((res) => {
        dispatch(updateLoader(false));
        if (res.status === 200) {
          console.log(res.data);
          dispatch(updateSnackbar(true, "score agregado"));
        } else {
          console.log(res);
          Alert.error("error al agregar score");
          dispatch(updateSnackbar(true, "error al agregar score"));
        }
      }).catch((err) => {
        dispatch(updateLoader(false));
        dispatch(updateSnackbar(true, "error al agregar score"));
      }
      );
    },
  });
  return (
    <>
      <Loader />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <Snack />
        <Typography color="textPrimary" gutterBottom variant="h4">
          agregar score:
        </Typography>
      </Box>
        <Form
          onSubmit={Formik.handleSubmit}
          style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "70%", margin: "auto" }}
        >
          <Input
            name="email"
            type="text"
            placeholder="email"
            required
            onChange={Formik.handleChange}
            value={Formik.values.email}
            style={{ marginBottom: "1.5rem" }}
          />
          <Input
            name="score"
            type="number"
            placeholder="score"
            required
            onChange={Formik.handleChange}
            value={Formik.values.score}
          />

          <StyledButton
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#023473", padding: "1rem", marginTop: "1rem", width: "10rem", alignSelf: "center" }}
          >
            agregar
          </StyledButton>
        </Form>
    </>
  );
};

const Consultas = () => {
  const { admin } = useSelector((state) => state.admin);
  const history = useHistory();
  const dispatch = useDispatch();

  const [consultas, setConsultas] = React.useState([]);
  const [consulta, setConsulta] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [openConsulta, setOpenConsulta] = React.useState(false);
  const [code, setCode] = React.useState(null);

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

  const displayData = (data) => {
    setCode(JSON.stringify(data, null, 2));
    setOpen(true);
  };

  const handleCloseConsulta = () => {
    setOpenConsulta(false);
  };

  return consultas.length > 0 ? (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3 }}>
        <Loader />
        <Modal
          open={open}
          onClose={handleClose}
          center
          classNames={{ modal: "codeModal" }}
        >
          <Consulta code={code} setOpen={setOpen} />
        </Modal>
        <Modal
          open={openConsulta}
          onClose={handleCloseConsulta}
          center
          classNames={{ modal: "codeModal" }}
        >
          <FormularioConsulta setOpen={setOpenConsulta} />
        </Modal>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h4">
              Consultas
            </Typography>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
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
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    consultas pendientes:
                  </Typography>

                  <StyledButton
                    color="primary"
                    variant="contained"
                    style={{ backgroundColor: "#023473" }}
                    onClick={() => setOpenConsulta(true)}
                  >
                    agregar
                  </StyledButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableConsultas
                consultas={consultas}
                setOpen={setOpen}
                displayData={displayData}
              />
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
