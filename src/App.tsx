import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import Home from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import LoginSuccess from './pages/login/LoginSuccess';
import Navbar from './components/Navigation/Navbar';
import NewQuestionForm from './pages/Question/NewQuestionForm';
import Footer from './components/Footer/footer';
import NewCourseForm from './pages/Course/NewCourseForm';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Forum from './pages/Forum/Forum';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addcourse" element={<NewCourseForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile/u/" element={<ProfilePage />} />
      <Route path="/login/success" element={<LoginSuccess />} />

      <Route path="/postquestion" element={<NewQuestionForm />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <App />
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}
