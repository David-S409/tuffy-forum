import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';

function NotFound() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          404 Not Found
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
        <Link href="/">
          Go Home
        </Link>
        </Typography>
      </Container>
    </>
  );
}

export default NotFound;
