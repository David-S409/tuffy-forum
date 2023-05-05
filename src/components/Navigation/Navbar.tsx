import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../../appSlice';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import {
  Tabs,
  Tab,
  Link,
  Box,
  Avatar,
} from '@mui/material';
import { Typography } from '@mui/joy';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import ListAlt from '@mui/icons-material/ListAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from 'axios';
import SearchBar from './SearchBar';
import Dashboard from './Dashboard';

const useStyles = makeStyles()(() => {
  return {
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      position: 'relative',
      backgroundImage: 'linear-gradient(to right, #00b09b, #96c93d)',
      margin: '15px 0',
      width: 'auto',
    },
    headerLeft: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: 'fit-content',
      flexBasis: 'fit-content',
      paddingRight: '20px',
    },
    headerMiddle: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      width: 'fit-content',
    },
    headerRight: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: "column",
      flex: 1,
      width: 'fit-content',
      paddingLeft: '20px',
    },
    headerSearchContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#F2F2F2',
      height: 40,
      borderRadius: 20,
      padding: '0 20px',
      width: 'fit-content',
    },
    headerSearchIcon: {
      color: 'gray',
    },
    headerSearchInput: {
      flex: 1,
      marginLeft: 10,
    },
    headerRightContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flex: 1,
    },
    headerMenuIcon: {
      color: 'gray',
    },
    background: {
      zIndex: 100,
      top: 0,
      padding: '0px 24px',
      height: 'auto',
      boxSizing: 'border-box',
      backgroundImage: 'linear-gradient(to right, #00b09b, #96c93d)',
      borderBottom: '1px solid #e8e8e8',
      position: 'fixed',
      width: 'auto',
      margin: 'auto',
      overflow: 'auto',
      right: 0,
      left: 0,
    },
    menuFont: {
      display: 'flex',
      alignItems: 'center',
      width: 'auto',
    },
  };
});

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuth } = useSelector((state: RootState) => state.app);

  const checkUser = localStorage.getItem('auth');

  const getLoginInfo = async () => {
    await axios
      .get('http://localhost:8080/api/v1/auth/user', { withCredentials: true })
      .then((response) => {
        dispatch(setIsAuth(true));
        dispatch(setUser(response.data));
      });
  };

  useEffect(() => {
    if (checkUser) {
      getLoginInfo();
    }
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem('auth');
    dispatch(setUser(null));
    dispatch(setIsAuth(false));
    navigate('/');
    location.reload();
  };

  const { classes } = useStyles();

  const currentTab = () => {
    const path = window.location.pathname;

    if (path === '/') {
      return 0;
    }
    if (path === '/postquestion' || path === '/question/?') {
      return 1;
    }
    if (path === '/addcourse') {
      return 2;
    }
    if (path === '/forum') {
      return 3;
    }
  };

  const [value, setValue] = useState(currentTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.background}>
        <div className={classes.headerContainer}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
            }}
            className={classes.headerLeft}
          >
            <Link href="/" underline="none" color="inherit">
              <img
                src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/5616.png"
                alt="Tuffy"
                width="125px"
                height="125px"
              />
            </Link>
            <Link href="/" underline="none" color="inherit">
              <Typography
                sx={{
                  fontSize: 30,
                  padding: '16px',
                  fontFamily: 'monospace',
                  color: 'lightblue',
                  fontStyle: 'oblique',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px #000000',
                }}
              >
                TUFFY FORUM
              </Typography>
            </Link>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon-tabs"
              sx={{ width: '100%' }}
            >
              <Tab label="Home" href="/" icon={<HomeIcon />} />
              <Tab label="Post" href="/postquestion" icon={<PostAddIcon />} />
              <Tab label="Courses" href="/addcourse" icon={<ListAlt />} />
              <Tab label="Forum" href="/forum" icon={<ForumIcon />} />
            </Tabs>
          </Box>
          <Box
            sx={{
              display: 'auto',
              justifyContent: 'center',
              width: 'fit-content',
            }}
            className={classes.headerMiddle}
          >
            <SearchBar />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
            }}
            className={classes.headerRight}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignContent:'flex-end' }}
              className={classes.headerRightContainer}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {isAuth ? (
                  <>
                  <Dashboard />
                    <Avatar
                      style={{ cursor: 'default' }}
                      sx={{ boxShadow: 5, ml: 2 }}
                      alt={user?.googleID}
                      src={user?.profileImg}
                      />
                  </>
                ) : (
                  <Avatar style={{ cursor: 'default' }} />
                )}
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      <div className="spacer" />
    </>
  );
}
