// Text field used in signin / signup form.

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const FormTextFields = ({ label, name, type, value, multiline, changeHandler }) => {
  return (
    <Box sx={{ minWidth: 120, margin: "1em 0" }}>
      <TextField
        required
        fullWidth
        label={label}
        id={label}
        name={name}
        type={type}
        value={value}
        multiline={multiline || false}
        onChange={changeHandler}
      />
    </Box>
  );
};

export default FormTextFields;
