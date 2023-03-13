import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import Home from './pages/HomePage';
import NotFound from './pages/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import LoginSuccess from './pages/login/LoginSuccess';
import { Navbar } from './components/Style/Navbar';
import CourseList from './components/CourseList';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CourseList courses={[]} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/success" element={<LoginSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar />
        <App />
      </BrowserRouter>
    </Provider>
  );
}
