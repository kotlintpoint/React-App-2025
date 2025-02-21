import { Container, Typography } from '@mui/material'
import { useAppSelector } from '../../app/stores/hooks'

function ServerErrors() {
  const { error } = useAppSelector(state => state.error);
  return (
    <Container>
        <Typography variant='h2' color='error'>Server Error</Typography>
        <Typography variant='h4' color='error'>{error?.message}</Typography>
        <Typography>{error?.details}</Typography>
    </Container>
  )
}

export default ServerErrors
