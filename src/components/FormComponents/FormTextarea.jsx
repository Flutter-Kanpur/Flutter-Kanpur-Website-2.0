import Box from "@mui/material/Box";
import FormField, { fieldSx } from "./FormField";

const FormTextarea = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  height = "145px",
  textareaSx = {},
  ...props
}) => (
  <FormField label={label} htmlFor={id}>
    <Box
      component="textarea"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{
        ...fieldSx,
        height,
        minHeight: height,
        p: "11px 15px",
        lineHeight: "24px",
        resize: "vertical",
        ...textareaSx,
      }}
      {...props}
    />
  </FormField>
);

export default FormTextarea;
