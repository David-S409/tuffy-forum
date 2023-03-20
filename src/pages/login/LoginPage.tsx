import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuth, setUser } from '../../appSlice';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => {
  return {
    root: {
      backgroundColor: '#3f51b5',
      padding: 'auto',
    },
  };
});



export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
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
      navigate('/');
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
    <div>
      <Button 
      startIcon={<LoginIcon />}
      variant="contained"
      onClick={googleSSO} 
      size='large' 
      fullWidth color='success'
      focusRipple
      className={classes.root}
      >
        Login
      </Button>
    </div>
  );
}

