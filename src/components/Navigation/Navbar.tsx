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
import SvgIcon from '@mui/material/SvgIcon';
import ListAlt from '@mui/icons-material/ListAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import * as React from 'react';
import { Typography } from '@mui/joy';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { setIsAuth, setUser } from '../../appSlice';
import type { UserState } from '../../appSlice';
import { useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';



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
  const [users, setUsers] = useState<UserState>({
    app: '',
    id: 0,
    firstName: '',
    lastName: '',
    googleId: '',
    email: '',
    profileImg: '',
  });
  const checkUser = localStorage.getItem('auth');
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  
  const getLoginInfo = async () => {
    axios.get<UserState>('http://localhost:8080/api/v1/auth/user', { withCredentials: true })
    .then(({data}) => {
      setUsers(data);
    })
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
    let path = window.location.pathname;
    if (path === '/') { return 0 }
    else if (path === '/post') { return 1 }
    else if (path === '/courses') { return 2 }
  }
  const [value, setValue] = React.useState(currentTab());
    

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
  };

  return (
    <><div className={classes.background}>
      <div className={classes.headerContainer}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} className={classes.headerLeft}>
          <Link href="/" underline="none" color="inherit">
            <img
              src="http://blog.fullerton.edu/wp-content/uploads/2020/03/Tuffy-e1585180435275-150x150.png"
              alt='Tuffy'
              width='100px'
              height='100px' />
          </Link>
          <Typography>
            TUFFY FORUM
          </Typography>
          <Tabs value={value} onChange={handleChange} aria-label='icon-tabs'>
            <Tab label="Home" href="/" icon={<HomeIcon />} />
            <Tab label="Post" href="/post" icon={<PostAddIcon />} />
            <Tab label="Courses" href="/courses" icon={<ListAlt />} />
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} className={classes.headerMiddle}>
          <Box className={classes.headerSearchContainer}>
            <SearchIcon className={classes.headerSearchIcon} />
            <TextField
              className={classes.headerSearchInput}
              placeholder="Search..."
              variant="standard"
              inputProps={{ 'aria-label': 'search' }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} className={classes.headerRight}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }} className={classes.headerRightContainer}>
            {window.innerWidth < 768 && <SearchIcon className={classes.headerSearchIcon} />}

            <InboxIcon className={classes.headerInboxIcon} />
            <HelpIcon className={classes.headerHelpIcon} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {checkUser ? (
                <><Avatar
                  style={{ cursor: 'pointer'}}
                  sx={{boxShadow: 5}}
                  src={users.profileImg}
                  alt={users.googleId} 
                  onClick={handleMenu}
                  >
                  </Avatar>
                  <Menu
                    sx={{mt: .5, ml: -.5}}
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
                    <Typography sx={{ml: 1, mr: 1, mb: 0.5, mt: -0.2, fontWeight: 'bold', fontFamily: 'monospace'}}
                    color="neutral"
                    variant="soft"
                    > 
                      {users.firstName} 
                    </Typography>
                    <MenuItem component={Link} href="/profile">Profile</MenuItem>
                    <MenuItem onClick={logoutUser}>Logout</MenuItem>
                  </Menu>
                  </>
                ) : ( 
                  <Avatar
                  style={{ cursor: 'auto' }} />
                )}
              </Box>
          </Box>
        </Box>
      </div>
    </div><div className="spacer"></div></>
  );
}
