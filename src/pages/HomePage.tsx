import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state: any) => state.app.user);
  return <h1>Hello World {user.id}</h1>;
}

export default Home;
