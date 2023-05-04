/* eslint-disable no-restricted-globals */
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { makeStyles } from 'tss-react/mui';
import { Box } from '@mui/material';
import { setIsAuth, setUser } from '../../appSlice';
import { RootState } from '../../store';

const useStyles = makeStyles()(() => {
  return {
    root: {
      padding: 'auto',
    },
  };
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { isAuth } = useSelector((state: RootState) => state.app);
  const logoutUser = async () => {
    localStorage.removeItem('auth');
    dispatch(setUser(null));
    dispatch(setIsAuth(false));
    location.reload();
  };

  const fetchAuthUser = async () => {
    const response = await axios
      .get('http://localhost:8080/api/v1/auth/user', { withCredentials: true })
      .catch((err) => {
        console.error('Not properly authed', err);
        dispatch(setIsAuth(false));
        dispatch(setUser(null));
      });

    if (response && response.data) {
      dispatch(setIsAuth(true));
      dispatch(setUser(response.data));
      localStorage.setItem('auth', JSON.stringify(setIsAuth(true)));
      if (response.data.isOnboard) {
        navigate('/');
        location.reload();
      } else {
        navigate('/onboarding');
      }
    }
  };
  const googleSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const googleLoginUrl = 'http://localhost:8080/api/v1/login/google';
    const newWindow = window.open(
      googleLoginUrl,
      '_blank',
      'width=500,height=600'
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log('authed');
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
  return (
    <Box marginTop={37}>
      {isAuth ? (
        <Button
          onClick={logoutUser}
          href="/"
          variant="contained"
          size="large"
          color="secondary"
          focusRipple
          className={classes.root}
        >
          Logout
        </Button>
      ) : (
        <Button
          startIcon={<LoginIcon />}
          variant="contained"
          onClick={googleSSO}
          size="large"
          color="success"
          focusRipple
          className={classes.root}
        >
          Login
        </Button>
      )}
    </Box>
  );
}
