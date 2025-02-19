import { Container, Typography } from "@mui/material";

interface Props {
  errors: string[];
}
function ValidationErrors({ errors }: Props) {
  return (
    <Container
      sx={{
        padding: 1,
        marginTop: 4,
        border: "solid red 1px",
      }}
    >
      {errors.map((error: string) => (
        <Typography color="error" key={error}>
          {error}
        </Typography>
      ))}
    </Container>
  );
}

export default ValidationErrors;
