import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import Home from './pages/HomePage';
import NotFound from './pages/NotFound/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import LoginSuccess from './pages/login/LoginSuccess';
import { Navbar } from './components/Navigation/Navbar';
import CourseList from './pages/Course/CourseList';
import { NewQuestionForm } from './pages/Question/NewQuestionForm';
import Footer from './Footer/footer';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CourseList courses={[]} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/success" element={<LoginSuccess />} />
      <Route path="/post" element={<NewQuestionForm />} />
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
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}
