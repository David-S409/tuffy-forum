import { useSelector } from 'react-redux';
import LoginPage from './login/LoginPage';


function Home() {
  const user = useSelector((state: any) => state.app.user);

  return (
    <>
      {user ? (
        <h1> TUFFY FORUM {user.id} </h1>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default Home;
