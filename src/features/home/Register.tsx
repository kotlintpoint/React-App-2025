import { useState } from "react";
import * as Yup from "yup";
import { Button, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import MyTextInput from "../../app/common/form/MyTextInput";
import { useAppDispatch } from "../../app/stores/hooks";
import { userRegister } from "../../app/stores/userSlice";


interface Response {
  error : {
    message: string
  }
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setError] = useState([]);
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    displayName: Yup.string().required("Required"),
    userName: Yup.string().required("Required"),
    bio: Yup.string().required("Required"),
  });
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Typography variant="h5" color="primary">
        Registration Form
      </Typography>

      <Formik
        enableReinitialize
        initialValues={{ email: "", password: "", displayName: "", userName: "", bio: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setError([]);
          dispatch(userRegister(values)).then((result) => {
            const response = result as Response;
            if(response.error.message === "Rejected"){
              setError(result.payload as []);  
            }
            else if (result.payload) {
              navigate("/activities");
            }
          });
        }}
      >
        {({ isSubmitting, dirty, isValid, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <MyTextInput name="email" label="Email" />
            <MyTextInput name="password" label="Password" type="password" />
            <MyTextInput name="userName" label="User Name" />
            <MyTextInput name="displayName" label="Display Name" />
            <MyTextInput name="bio" label="Bio" multiline rows={3} />
            {errors && (
              errors.map((error: string) => (
                <Typography key={error} color="error">{error}</Typography>
              ))
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
              <Button variant="outlined" component={Link} to={"/login"}>
                Sign In
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
