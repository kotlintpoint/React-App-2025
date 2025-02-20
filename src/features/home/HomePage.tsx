import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  return (
    <Container sx={{ textAlign: "center" }}>
      <ToastContainer position="top-right" />
      <h1>Home Page...</h1>
      <Button component={Link} to={"/login"} variant="contained">
        Login Here...
      </Button>
    </Container>
  );
};

export default HomePage;
