import { styled, TextField, Typography } from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  rows: number;
}

const StyledTextField = styled(TextField)(() => ({
  marginBottom: 8,
  width: "100%",
}));

const MyTextArea = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledTextField {...field} {...props} 
            error={meta.error?.length! > 0}
            multiline />
      <Typography color="error">{meta.error}</Typography>
    </>
  );
};
export default MyTextArea;
