import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LinearBar from './styles';
import Box from '@mui/material/Box';
import { sizing } from '@mui/system';

function NotFound() {
  return (
    <>
    
      <Box alignItems='center' sx={{ padding: 25, width: 'auto', height: 'auto'}}>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" gutterBottom paragraph>
          404 Not Found
        </Typography>
      </Container>
      <LinearBar />
      <Container maxWidth="xl">
        <Typography variant="h6" align="center" gutterBottom paragraph>
        <Link href="/">
          Go Home
        </Link>
        </Typography>
      </Container>
      </Box>
    </>
  );
}

export default NotFound;
