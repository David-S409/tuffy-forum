import { RootState } from '../../store';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.app);
    return (
    <h1>
        Name: {user?.firstName} {user?.lastName}<br></br>
        Email: {user?.email}
    </h1> 
    )
}
