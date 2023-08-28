// Signup page

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const SignUp = () => {
  return (
    <Grid container justifyContent="center">
      <Box
        sx={{
          p: 3,
          maxWidth: "50em",
          minWidth: "30em",
        }}
      >
        <Typography variant="h2">Create your account.</Typography>
        <Typography>
          Already have an account? <Link href="/signin">Sign in.</Link>
        </Typography>
        <SignUpForm />
      </Box>
    </Grid>
  );
};

export default SignUp;
