import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { setIsAuth, setUser } from '../../appSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <Button variant="contained" type="button" onClick={googleSSO}>
        Login
      </Button>
    </div>
  );
}
