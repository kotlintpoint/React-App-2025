import { styled, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
interface Props {
  name: string;
  label: string;
}

const StyledDatePicker = styled(DatePicker)(() => ({
  marginBottom: 8,
  width: "100%",
}));

const MyDatePicker = (props: Props) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <StyledDatePicker
        {...field}
        {...props}
        value={new Date(field.value)}
        format="dd-MMM-yyyy"
        onChange={(value) => {
          setFieldValue(field.name, value?.toISOString());
        }}
      />
      {meta.touched && <Typography color="error">{meta.error}</Typography>}
    </>
  );
};
export default MyDatePicker;
