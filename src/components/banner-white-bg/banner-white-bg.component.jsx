import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { OrderButton } from "../order-button/order-button.component";

const BannerWhiteBackground = ({
  title,
  shortform,
  url,
  related_material,
  cartable,
}) => {
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
    <>
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          margin: "5%",
        }}
      >
        {/* This Grid contains the 2 Grids on the left and right. */}
        <Grid container direction="row">
          {/* Grid 1 on the left for photo. */}
          <Grid
            key="grid-left"
            sx={{ padding: "20px" }}
            item
            xs={12}
            sm={12}
            md={6}
          >
            <Box
              onClick={() => handleClick(related_material)}
              sx={{
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img src={url} style={{ width: "100%" }} alt={title} />
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
          </Grid>

          {/* Grid 2 on the right for text. */}
          <Grid
            key="grid-right"
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <Typography
              variant="h3"
              sx={{ textAlign: "center", padding: "5px" }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", padding: "5px" }}
            >
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
      </Box>
    </>
  );
};

export default BannerWhiteBackground;
