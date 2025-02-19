import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container sx={{ minHeight: "80vh", alignContent: "center", textAlign: "center"}}>
        <Typography variant='h3'>
            Not Found
        </Typography>
        <Button variant='contained' component={Link} to={"/activities"}>
            Return to Activities
        </Button>
    </Container>
  )
}

export default NotFound
