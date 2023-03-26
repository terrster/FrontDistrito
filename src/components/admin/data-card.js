import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

export const ProductCard = ({ product, setOpen, ...rest }) => {
  const [datos, setDatos] = React.useState(product);

  React.useEffect(() => {
    setDatos(product);
  }, [product]);
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
    <CardContent>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {datos.name}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        user: {datos.userBuro}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        password: {datos.passwordBuro}
      </Typography>
    </CardContent>
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
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            name={datos.name}
            sx={{ ml: 2 }}
            onClick={() => setOpen(datos.name)}
          >
            Editar
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
