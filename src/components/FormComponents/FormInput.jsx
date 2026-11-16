import Box from "@mui/material/Box";
import FormField, { fieldSx } from "./FormField";

const FormInput = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  type = "text",
  height = "48px",
  inputSx = {},
  ...props
}) => (
  <FormField label={label} htmlFor={id}>
    <Box
      component="input"
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{
        ...fieldSx,
        height,
        px: "15px",
        ...inputSx,
      }}
      {...props}
    />
  </FormField>
);

export default FormInput;
