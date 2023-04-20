import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LinearBar from './styles';

function NotFound() {
  return (
    <Box alignItems="center" sx={{ width: 'auto', height: 'auto' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" gutterBottom paragraph>
          404 Not Found
        </Typography>
      </Container>
      <LinearBar />
      <Container maxWidth="xl">
        <Typography variant="h6" align="center" gutterBottom paragraph>
          <Link href="/">Go Home</Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default NotFound;
