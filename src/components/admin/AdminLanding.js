import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginAdmin } from "../../redux/actions/adminActions.js";
import Loader from "../Loader/Loader";
import { updateLoader } from "../../redux/actions/loaderActions";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
    Button,
    Container,
} from "@material-ui/core";


const AdminLanding = () => {
    const [admin, setAdmin] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if(user === null){
            window.location.replace("/login");
          }
          if(user.access !== "ADMIN"){
            window.location.replace("/login");
        }
        if(admin === null || admin === undefined){
        dispatch(loginAdmin(user));
        setAdmin(user);
        }
    }, [admin]);

    const handleSettings = () => {
        history.push("/admin/control");
    };

    const handleOwners = () => {
        history.push("/admin/owners");
    };

    const handleConsultas = () => {
        history.push("/admin/consultas");
    };

    useEffect(() => {
        if(admin === null || admin === undefined){
            dispatch(updateLoader(true));
        } else {
            dispatch(updateLoader(false));
        }
        console.log(admin);
    }, [admin]);

    if(admin === null || admin === undefined){
        return (
            <Loader />
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ pt: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            gutterBottom
                            variant="h4"
                        >
                            Bienvenido {admin.email}
                        </Typography>
                    </Grid>
                    <Grid item lg={4} sm={6} xl={4} xs={12}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        pb: 3,
                                    }}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                    >
                                        configuración
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Configuración de la plataforma
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={handleSettings}
                                        >
                                            Configuración
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item lg={4} sm={6} xl={4} xs={12}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        pb: 3,
                                    }}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                    >
                                        Brokers
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Administración de brokers
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={handleOwners}
                                        >
                                            Dueños
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item lg={4} sm={6} xl={4} xs={12}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        pb: 3,
                                    }}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant="h4"
                                    >
                                        Consultas
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Consultas de usuarios
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={handleConsultas}
                                        >
                                            Consultas
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
    
}

export default AdminLanding;