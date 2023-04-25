/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from 'tss-react/mui';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import ForumIcon from '@mui/icons-material/Forum';
import ListAlt from '@mui/icons-material/ListAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import * as React from 'react';
import { Typography } from '@mui/joy';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import SearchBar from './SearchBar';

import type { UserState } from '../../appSlice';
import { setIsAuth, setUser } from '../../appSlice';

const useStyles = makeStyles()(() => {
  return {
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      position: 'relative',
      backgroundImage: 'linear-gradient(to right, #00b09b, #96c93d)',
      margin: '15px 0',
    },
    headerLeft: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: 'fit-content',
      flex: 1,
    },
    headerMiddle: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    headerSearchContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#F2F2F2',
      height: 40,
      borderRadius: 20,
      padding: '0 20px',
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
    headerInboxIcon: {
      color: 'gray',
    },
    headerHelpIcon: {
      color: 'gray',
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
    },
  };
});

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuth } = useSelector((state: RootState) => state.app);
  const profileUrl = `/profile/u/#${user?.userId}`;
  const checkUser = localStorage.getItem('auth');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    if (path === '/postquestion') {
      return 1;
    }
    if (path === '/addcourse') {
      return 2;
    }
    if (path === '/forum') {
      return 3;
    }
  };
  const [value, setValue] = React.useState(currentTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.background}>
        <div className={classes.headerContainer}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center' }}
            className={classes.headerLeft}
          >
            <Link href="/" underline="none" color="inherit">
              <img
                src="http://blog.fullerton.edu/wp-content/uploads/2020/03/Tuffy-e1585180435275-150x150.png"
                alt="Tuffy"
                width="100px"
                height="100px"
              />
            </Link>
            <Link href="/" underline="none" color="inherit">
              <Typography sx={{ fontSize: 25 }}>TUFFY FORUM</Typography>
            </Link>
            <Tabs value={value} onChange={handleChange} aria-label="icon-tabs">
              <Tab label="Home" href="/" icon={<HomeIcon />} />
              <Tab label="Post" href="/postquestion" icon={<PostAddIcon />} />
              <Tab label="Courses" href="/addcourse" icon={<ListAlt />} />
              <Tab label="Forum" href="/forum" icon={<ForumIcon />} />
            </Tabs>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center' }}
            className={classes.headerMiddle}
          >
            <SearchBar />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center' }}
            className={classes.headerRight}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'center' }}
              className={classes.headerRightContainer}
            >
              <InboxIcon className={classes.headerInboxIcon} />
              <HelpIcon className={classes.headerHelpIcon} />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {isAuth ? (
                  <>
                    <Avatar
                      style={{ cursor: 'pointer' }}
                      sx={{ boxShadow: 5 }}
                      alt={user?.googleID}
                      src={user?.profileImg}
                      onClick={handleMenu}
                    />
                    <Menu
                      sx={{ mt: 0.5, ml: -0.5 }}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <Typography
                        sx={{
                          ml: 1,
                          mr: 1,
                          mb: 0.5,
                          mt: -0.2,
                          fontWeight: 'bold',
                          fontFamily: 'monospace',
                        }}
                        color="neutral"
                        variant="soft"
                      >
                        {user?.firstName}
                      </Typography>
                      <MenuItem component={Link} href={profileUrl}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={logoutUser}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Avatar style={{ cursor: 'auto' }} />
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
