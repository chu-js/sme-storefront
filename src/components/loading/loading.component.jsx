import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => (
  <CircularProgress
    color="inherit"
    sx={{
      position: "fixed",
      top: "50%",
      left: "50%",
    }}
  />
);

export default Loading;
