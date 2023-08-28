import { useDispatch } from "react-redux";

import { signOutStart } from "../../store/user/user.action";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import ErrorMessage from "../error-message/error-message.component";

const CheckoutForm = ({
  formFields,
  password,
  handleFieldChange,
  handlePasswordChange,
  currentUser,
  errorMessage,
}) => {
  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutStart());

  // Destructure the formFields passed in from checkout-user
  const {
    firstName,
    lastName,
    country,
    email,
    address,
    unitNumber,
    postalCode,
    phoneNumber,
    additionalNotes,
  } = formFields;

  // Create array of fields to loop through in the component below
  const fields = [
    { id: "firstName", label: "First Name", value: firstName },
    { id: "lastName", label: "Last Name", value: lastName },
    { id: "country", label: "Country", value: country, select: true },
    { id: "address", label: "Address", value: address },
    { id: "unitNumber", label: "Unit number (optional)", value: unitNumber },
    { id: "postalCode", label: "Postal Code", value: postalCode },
    { id: "phoneNumber", label: "Phone number", value: phoneNumber },
    { id: "email", label: "Email", value: email },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: handlePasswordChange,
    },
    {
      id: "additionalNotes",
      label: "Additional notes to Porousway",
      multiline: true,
      rows: 4,
      value: additionalNotes,
    },
  ].filter((field) => !(currentUser && field.id === "password"));

  return (
    <Box sx={{ minWidth: 120 }}>
      <ErrorMessage message={errorMessage} />
      <FormControl fullWidth>
        {!currentUser && (
          <Typography>
            Already have an account? <Link href="/signin">Login</Link>.
          </Typography>
        )}
        {currentUser && currentUser.postalCode && (
          <Typography>
            Booking for a different address?{" "}
            <Link onClick={signOutUser}>Logout</Link> and create a new account.
          </Typography>
        )}
        {fields.map((field) => (
          <TextField
            key={field.id}
            id={field.id}
            select={field.select}
            label={field.label}
            variant="standard"
            value={field.value}
            type={field.type}
            onChange={field.onChange || handleFieldChange}
            disabled={
              currentUser &&
              (["firstName", "lastName", "email"].includes(field.id) ||
                (currentUser.postalCode &&
                  !["additionalNotes", "phoneNumber"].includes(field.id)))
            }
            required={
              !currentUser &&
              field.id !== "additionalNotes" &&
              field.id !== "unitNumber"
            }
            multiline={field.multiline || false}
            rows={field.rows || 1}
            sx={{ marginTop: "3%" }}
          >
            {field.select && (
              <MenuItem key="Singapore" value="Singapore">
                Singapore
              </MenuItem>
            )}
          </TextField>
        ))}
      </FormControl>
    </Box>
  );
};

export default CheckoutForm;
