import { MenuItem, styled, TextField, Typography } from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean
  rows?: number;
  select?: boolean;
  options?: { text: string, value: string}[]
}

const StyledTextField = styled(TextField)(() => ({
  marginBottom: 8,
  width: "100%",
}));

const MyTextInput = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledTextField {...field} {...props} error={meta.touched && meta.error?.length! > 0}>
         {props.select && props.options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
      </StyledTextField>
      {meta.touched && <Typography color="error">{meta.error}</Typography>}
    </>
  );
};
export default MyTextInput;
