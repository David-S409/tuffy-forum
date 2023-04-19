import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.app);
  return (
    <h1>
      Name: {user?.firstName} {user?.lastName}
      <br />
      Email: {user?.email}
    </h1>
  );
}
