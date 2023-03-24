import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Paper,
  withStyles,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@material-ui/core";
import Axios from "../../utils/axios";
import { findDOMNode } from 'react-dom';

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [array, setArray] = useState("owners");
  const [type, setType] = useState("");
  const [options, setOptions] = useState([]);
  const [brokerActivo, setBrokerActivo] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if(user === null){
      window.location.replace("/login");
    }
    if(user.access !== "ADMIN"){
      window.location.replace("/login");
    }
  }, [user]);

  const inner = useRef(null);
  const ref = (node) => {
    node = findDOMNode(node);
    if (node) {
      inner.current = node.querySelector('li');
    }
  };

  useEffect(() => {
    Axios.get("/owners").then((response) => {
      setOwners(response.data.response);
    });
  }, []);

  useEffect(() => {
    setOptions([
      {
        value: "ownerId",
        label: "ID",
      },
      {
        value: "firstName",
        label: "Nombre",
      },
      {
        value: "lastName",
        label: "Apellido",
      },
      {
        value: "email",
        label: "Email",
      },
    ]);
    if(owners){
      let count = 0;
      owners.map((owner) => {
        if(owner.isActive){
          count++;
        }
      })
      setBrokerActivo(count);
    }
  }, [owners]);

  const paperStyle = {
    padding: 20,
    minHeight: "50vh",
    maxHeight: "70vh",
    width: "100%",
    margin: "auto",
    overflow: "auto",
  };

  const TableCellStyle = withStyles({
    root: {
      //   borderBottom: "none",
      fontFamily: "Metropolis-Regular",
      fontSize: "14px",
      color: "#000000",
      textAlign: "center",
    },
  })(TableCell);

  const TableBodyStyle = withStyles({
    root: {
      overflow: "auto",
      maxHeight: "100%",
    },
  })(TableBody);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    if (value === "" || value === " " || value === null) {
      setIsSearching(false);
      setSearch([]);
      setArray("owners");
    }
    setIsSearching(true);
    setArray("search");
    result = owners.filter((data) => {
      if (type !== "ownerId") {
        return data[type].toLowerCase().search(value) !== -1;
      } else {
        return data[type].toString().search(value) !== -1;
      }
    });
    setSearch(result);
  };

  const tableContainer = (typ) => {
    let mapeo = [];
    if (typ === "owners") {
      mapeo = owners;
    } else {
      mapeo = search;
    }
    return (
      <>
        {mapeo.map((owner) => (
          
          <TableRow key={owner.ownerId}>
            <TableCellStyle>{owner.ownerId}</TableCellStyle>
            <TableCellStyle>{owner.firstName}</TableCellStyle>
            <TableCellStyle>{owner.lastName}</TableCellStyle>
            <TableCellStyle>{owner.email}</TableCellStyle>
            <TableCellStyle>
              <button
                style={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "1rem",
                  padding: "5px",
                  width: "100%",
                  fontFamily: "Metropolis-Regular",
                  fontSize: "14px",
                }}
              >
                Editar
              </button>
            </TableCellStyle>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper
            elevation={10}
            style={{
              padding: 2,
              height: "10vh",
              width: "100%",
              margin: "auto",
            }}
          >
            <Grid container align="center" direction="row">
              <Grid item xs={6} sm={6} md={6}>
                <div
                  className="title-dp fz24 fw500 mb-1 text-center mt-2"
                  style={{ color: "#213970" }}
                >
                  <span style={{ color: "#EF4E5B" }}> ingresa </span> al
                  propietario
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <Input
                  type="text"
                  placeholder="ownerid"
                  sx={{ width: "90%" }}
                  style={{ marginTop: "10px" }}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                />

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="filter"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  style={{ marginTop: "10px" }}
                >
                  {options !== undefined && options.length > 0
                    ? options.map((option) => (
                        <MenuItem 
                          value={option.value}
                          key={option.value}
                          innerRef={ref}
                          >{option.label}
                          </MenuItem>
                      ))
                    : null}
                </Select>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <div
                className="title-dp fz42 fw500 mb-1 text-center mt-2"
                style={{
                  color: "#213970",
                }}
              >
                propietarios
              </div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {options !== undefined && options.length > 0
                        ? options.map((option) => (
                            <TableCellStyle
                              key={option.value}
                            >
                              {option.label}
                            </TableCellStyle>
                            
                          ))
                        : null}
                        <TableCellStyle>Acciones</TableCellStyle>
                    </TableRow>
                  </TableHead>
                  <TableBodyStyle>{tableContainer(array)}</TableBodyStyle>
                </Table>
              </TableContainer>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Owners;
