import { useState } from "react";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import MyTextInput from "../../app/common/form/MyTextInput";
import { useAppDispatch } from "../../app/stores/hooks";
import { userLogin } from "../../app/stores/userSlice";

interface Response {
  error : {
    message: string
  }
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  let from = location.state?.from?.pathname || "/activities";
 
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  return (
    <Container style={{ minHeight: "100vh", maxWidth: 345 }}>
      <Typography variant="h5" color="primary">
        Login Form
      </Typography>

      <Formik
        enableReinitialize
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setError("");
          dispatch(userLogin(values)).then((result) => {
            const response = result as Response;
            if (response?.error?.message === "Rejected") {
              setError("Email or Password Invalid.");
            }
            else if (result.payload) {
              navigate(from,  { replace: true });
            }
          });
        }}
      >
        {({ isSubmitting, dirty, isValid, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <MyTextInput name="email" label="Email" />
            <MyTextInput name="password" label="Password" type="password" />
            {error && (
              <Typography color="error">{error}</Typography>
            )}
            <Typography>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Submit
              </Button>
              &nbsp;
              <Button variant="outlined" component={Link} to={"/register"}>
                Sign Up
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
