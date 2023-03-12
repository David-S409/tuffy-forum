import { useSelector } from 'react-redux';
import LoginPage from './login/LoginPage';
import Navigation from '../components/Navigation';


function Home() {
  const user = useSelector((state: any) => state.app.user);

  return (
    <>
      <Navigation />
      {user ? (
        <h1> TUFFY FORUM {user.id} </h1>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default Home;
