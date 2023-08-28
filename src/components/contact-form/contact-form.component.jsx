import { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormTextFields from "../form-text-fields/form-text-fields.component";
import ErrorMessage from "../error-message/error-message.component";

const ContactForm = () => {
  const defaultFormFields = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, phoneNumber, message } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        "", // Removed: API endpoint for Firebase function
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phoneNumber,
            message,
          }),
        }
      );
      resetFormFields();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ minWidth: 120, marginBottom: "0.5em" }}>
        <ErrorMessage message={error ? error.message : null} />
        <FormControl fullWidth required>
          <FormTextFields
            label="Name"
            name="name"
            value={name}
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
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={phoneNumber}
            changeHandler={handleChange}
          />
          <FormTextFields
            label="Message"
            name="message"
            type="text"
            multiline={true}
            value={message}
            changeHandler={handleChange}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </FormControl>
      </Box>
    </form>
  );
};

export default ContactForm;
