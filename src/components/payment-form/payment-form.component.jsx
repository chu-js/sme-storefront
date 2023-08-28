import { CardElement } from "@stripe/react-stripe-js";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ErrorMessage from "../error-message/error-message.component";

const PaymentForm = ({
  disabled,
  setDisabled,
  error,
  setError,
  processing,
  succeeded,
}) => {
  const changeHandler = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div>
      <Typography variant="h3" sx={{ marginTop: "2%" }}>
        Payment
      </Typography>
      <Typography color="text.secondary" sx={{ marginBottom: "2%" }}>
        All transactions are secure and encrypted.
      </Typography>
      <Box
        sx={{
          border: "1px solid #ced4da",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <CardElement onChange={changeHandler} />
      </Box>
      {processing ? (
        <CircularProgress color="inherit" />
      ) : (
        <Button
          variant="contained"
          type="submit"
          disabled={processing || disabled || succeeded}
          sx={{ marginTop: "10px" }}
        >
          Pay now
        </Button>
      )}
      <ErrorMessage message={error ? error : null} />
    </div>
  );
};

export default PaymentForm;
