import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import ValidationErrors from "./ValidationErrors";

const TestErrors = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const baseUrl = "https://localhost:5000/api/";

  const handleNotFound = () => {
    axios.get(baseUrl + "buggy/not-found").catch((error) => console.log(error));
  };

  const handleBadRequest = () => {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((error) => console.log(error));
  };

  const handleServerError = () => {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnauthorized = () => {
    axios
      .get(baseUrl + "buggy/unauthorized")
      .catch((error) => console.log(error));
  };

  const handleBadGuid = () => {
    axios.get(baseUrl + "activity/badGuiId").catch((error) => setErrors(error));
  };

  const handleValidation = () => {
    axios.post(baseUrl + "activity", {}).catch((error) => setErrors(error));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button onClick={handleNotFound}>Not Found</Button>
        <Button onClick={handleBadRequest}>Bad Request</Button>
        <Button onClick={handleServerError}>Server Error</Button>
        <Button onClick={handleUnauthorized}>Unauthorized</Button>
        <Button onClick={handleBadGuid}>Bad Guid</Button>
        <Button onClick={handleValidation}>Validation Error</Button>
      </ButtonGroup>
      {errors.length > 0 && <ValidationErrors errors={errors} />}
    </Container>
  );
};

export default TestErrors;
