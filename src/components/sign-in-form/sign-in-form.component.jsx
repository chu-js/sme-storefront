// Signin form component to be used in signin page.
// Documentation for Google Sign In: https://developers.google.com/identity/branding-guidelines
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import {
  selectCurrentUser,
  selectCurrentUserError,
  selectCurrentUserIsLoading,
} from "../../store/user/user.selector";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormTextFields from "../form-text-fields/form-text-fields.component";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import GoogleSignIn from "../../media/btn_google_signin_dark_normal_web@2x.png";

import ErrorMessage from "../error-message/error-message.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const error = useSelector(selectCurrentUserError);
  const isLoading = useSelector(selectCurrentUserIsLoading);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(emailSignInStart(email, password));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    if (currentUser && !error && !isLoading) {
      resetFormFields();
      navigate(-1);
    }
  }, [currentUser, error, isLoading, navigate]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120, marginBottom: "0.5em" }}>
          <ErrorMessage message={error ? error.message : null} />
          <FormControl fullWidth required>
            {["Email", "Password"].map((label) => (
              <FormTextFields
                key={label}
                label={label}
                name={label.toLowerCase()}
                type={label.toLowerCase()}
                value={label.toLowerCase() === "email" ? email : password}
                changeHandler={handleChange}
              />
            ))}

            {/* Grid for buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} container justifyContent="center">
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ width: "166px", height: "40px" }}
                >
                  Sign in
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} container justifyContent="center">
                <div
                  role="button"
                  onClick={signInWithGoogle}
                  tabIndex="0"
                  style={{
                    cursor: "pointer",
                    backgroundImage: `url(${GoogleSignIn})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "42px",
                  }}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
};

export default SignInForm;
