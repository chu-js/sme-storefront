// Signup form component to be used in signup page.

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signUpStart } from "../../store/user/user.action";

import {
  selectCurrentUser,
  selectCurrentUserError,
  selectCurrentUserIsLoading,
} from "../../store/user/user.selector";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormTextFields from "../form-text-fields/form-text-fields.component";
import ErrorMessage from "../error-message/error-message.component";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const error = useSelector(selectCurrentUserError);
  const isLoading = useSelector(selectCurrentUserIsLoading);

  const defaultFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, email, password, confirmPassword } = formFields;

  const [passwordError, setPasswordError] = useState(null);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //  Do not allow customer to create account if the passwords do not match.
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    // Reset it if user later passes this test.
    if (password === confirmPassword) {
      setPasswordError(null);
      return;
    }

    dispatch(signUpStart(email, password, firstName, lastName));

    if (!error && !isLoading && currentUser) {
      resetFormFields();
      navigate("/shop", { replace: true });
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      resetFormFields();
      navigate(-1);
    }
  }, [currentUser, navigate]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120, marginBottom: "0.5em" }}>
          <ErrorMessage message={error ? error.message : null} />
          <ErrorMessage message={passwordError ? passwordError : null} />
          <FormControl fullWidth required>
            <FormTextFields
              label="First Name"
              name="firstName"
              value={firstName}
              changeHandler={handleChange}
            />
            <FormTextFields
              label="Last Name"
              name="lastName"
              value={lastName}
              changeHandler={handleChange}
            />
            <FormTextFields
              label="Email"
              name="email"
              type="email"
              value={email}
              changeHandler={handleChange}
            />
            <FormTextFields
              label="Password"
              name="password"
              type="password"
              value={password}
              changeHandler={handleChange}
            />
            <FormTextFields
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              changeHandler={handleChange}
            />
            <Grid container justifyContent="center">
              <Button
                variant="outlined"
                type="submit"
                sx={{ width: "166px", height: "40px" }}
              >
                Sign up
              </Button>
            </Grid>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
};

export default SignUpForm;
