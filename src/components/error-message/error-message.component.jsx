import React from "react";
import Alert from "@mui/material/Alert";

const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return <Alert severity="error" sx={{margin: "1em 0"}}>{message}</Alert>;
};

export default ErrorMessage;
