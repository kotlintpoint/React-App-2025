import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../app/stores/hooks";

const HomePage = () => {
  const { user } = useAppSelector(state => state.user); 
  return (
    <Container sx={{ textAlign: "center" }}>
      <ToastContainer position="top-right" />
      <h1>Home Page...</h1>
      {
        user ? (    
          <Button component={Link} to={"/activities"} variant="contained">
            Go To Activities...
          </Button>
        ) : (
          <Button component={Link} to={"/login"} variant="contained">
            Login Here...
          </Button>
        )
      }
      
    </Container>
  );
};

export default HomePage;
