import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setIsAuth, setUser } from '../../appSlice';
import { Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListDivider from '@mui/joy/ListDivider';

export default function BasicMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.app);
    const profileTab = `/profile/u/${user?.userId}/UserProfile`;
    const courseTab = `/profile/u/${user?.userId}/MyCourses`;
    const questionTab = `/profile/u/${user?.userId}/MyQuestions`;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = async () => {
        localStorage.removeItem('auth');
        dispatch(setUser(null));
        dispatch(setIsAuth(false));
        navigate('/');
        location.reload();
    };
    

    return (
        <div>
        <Button
            id="basic-demo-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="plain"
            color="neutral"
            onClick={handleClick}
            sx={{ml: 1, mt: 0}}
        >
            <MenuIcon />
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            aria-labelledby="basic-demo-button"
            placement="bottom-end"
        >
            <MenuItem onClick={handleClose} component={Link} href={profileTab}>Profile</MenuItem>
            <MenuItem onClick={handleClose} component={Link} href={courseTab}>My Course</MenuItem>
            <MenuItem onClick={handleClose} component={Link} href={questionTab}>My Question</MenuItem>
            <ListDivider />
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
        </Menu>
        </div>
    );
}