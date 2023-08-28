// Signin page

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const SignIn = () => {
  return (
    <Grid container justifyContent="center">
      <Box
        sx={{
          p: 3,
          maxWidth: "50em",
          minWidth: "30em",
        }}
      >
        <Typography variant="h2">Sign in.</Typography>
        <Typography>Sign in for faster checkout.</Typography>
        <SignInForm />
        <Box
          sx={{
            margin: "1em 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>
            Don't have an account? <Link href="/signup">Create yours now.</Link>
          </Typography>
        </Box>
      </Box>{" "}
    </Grid>
  );
};

export default SignIn;
