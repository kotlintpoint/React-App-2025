import { Button, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from "yup";
import { useAppDispatch, } from "../../app/stores/hooks";
import { userLogin } from "../../app/stores/userSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
    const [error, setError] = useState("");
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
            dispatch(userLogin(values))
            .then((result) => {
                if(result.error){
                    setError(result.error.message)
                }
            })
        }}
      >
        {({ isSubmitting, dirty, isValid, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <MyTextInput name="email" label="Email" />
            <MyTextInput name="password" label="Password" type="password" />
            {error && <Typography color="error">Email or Password Invalid.</Typography>}
            <Typography>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Submit
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                //   component={Link}
                //   to={id ? `/activities/${id}` : "/activities"}
                // onClick={() => dispatch(handleFormClose())}
              >
                Cancel
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
