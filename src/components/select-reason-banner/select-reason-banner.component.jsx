// Banner on home page for user to select reason for visiting the site. Logic of banners changed below determined by ConditionalBanners.
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { OrderButton } from "../order-button/order-button.component";

const SelectReasonBanner = ({ reason, handleChange }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        backgroundImage: `linear-gradient(
      to right,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    ), url('https://storage.googleapis.com/porousway-website.appspot.com/content/c57.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Grid
        className="select-reason-grid"
        container
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          className="select-reason-contents-grid"
          key="header"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Trusted floor overlays since 1996.
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            What are you looking for?
          </Typography>
          <Box sx={{ m: 2, minWidth: 120 }}>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel
                id="select-reason-label"
                sx={{ color: "white", fontSize: "20px" }}
              >
                Tell us
              </InputLabel>
              {/* Give user 3 reasons to choose from. */}
              <Select
                labelId="select-reason-label"
                id="select-reason"
                value={reason}
                label="Tell us"
                onChange={handleChange}
                sx={{ color: "white", backgroundColor: "#00000066" }}
              >
                <MenuItem value={"Beautify"}>Beautify</MenuItem>
                <MenuItem value={"Safety - anti slip"}>
                  Safety - anti slip
                </MenuItem>
                <MenuItem value={"Facing toilet issues"}>
                  Facing toilet issues
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <OrderButton variant="contained" href="shop">
            Buy now
          </OrderButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectReasonBanner;
