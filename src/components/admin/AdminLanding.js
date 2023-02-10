import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
    let  { admin } = useSelector((state) => state.admin);
    const history = useHistory();

    const handleSettings = () => {
        history.push("/admin/control");
    };

    const handleOwners = () => {
        history.push("/admin/owners");
    };

    const handleConsultas = () => {
        history.push("/admin/consultas");
    };

        if (!admin) {
            admin = {
                name: "Admin",
                email: "admin@admin.admin",
            }
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
                            Bienvenido {admin.name}
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
                                        {admin.name}
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
                                        {admin.email}
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
                                        {admin.name}
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
                                        {admin.email}
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
                                        {admin.name}
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
                                        {admin.email}
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