import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { OrderButton } from "../order-button/order-button.component";

const Banner = ({ title, shortform, url, related_material, cartable }) => {
  const navigate = useNavigate();

  const handleClick = (material) => {
    navigate("/shop", {
      state: {
        pebbleFloorFilter: material.toLowerCase().includes("pebble"),
        pebbleWallFilter: material.toLowerCase().includes("pebble"),
        flakeWallFilter: material.toLowerCase().includes("flake"),
        lasticFloorFilter: material.toLowerCase().includes("lastic"),
        lasticWallFilter: material.toLowerCase().includes("lastic"),
      },
    });
  };

  return (
    <Box
      onClick={() => handleClick(related_material)}
      sx={{
        position: "relative",
        flexGrow: 1,
        height: "100vh",
        backgroundImage: `linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    ), url('${url}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        cursor: "pointer",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          pl: "15%",
          top: "30%",
          textAlign: "center",
          display: "block",
          height: "100%",
          alignItems: "center",
          "@media screen and (max-width: 900px)": {
            pl: "0%",
            top: "15%",
          },
        }}
      >
        <Grid
          key="header-left"
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Grid>

        <Grid
          key="header-right"
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: "center", padding: "100px 5px 5px" }}
          >
            {title}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", padding: "5px" }}>
            {shortform}
          </Typography>
          {cartable ? (
            <OrderButton variant="contained" href="shop">
              Buy now
            </OrderButton>
          ) : (
            <Button
              variant="contained"
              href="contact"
              sx={{ margin: "10px", borderRadius: "980px" }}
            >
              Contact Us
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Typography that is fixed to the bottom right of Grid banner container with a background image */}
      {related_material != "" && (
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: "#fff",
            padding: "5px",
          }}
        >
          You saw it here: {related_material}
        </Typography>
      )}
    </Box>
  );
};

export default Banner;
