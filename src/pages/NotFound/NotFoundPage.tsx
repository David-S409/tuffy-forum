import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import LinearBar from './styles';

function NotFound() {
  return (
    <Box alignItems="center" sx={{ width: 'auto', height: 'auto' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom paragraph>
          404 Not Found
        </Typography>
      </Container>
      <LinearBar />
      <Container maxWidth="md">
        <Typography variant="h6" align="center" gutterBottom paragraph>
          <Link href="/">
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: '16px', marginTop: '32px' }}
            >
              <strong>Go Home</strong>
            </Button>
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default NotFound;
