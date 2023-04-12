import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import Home from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import LoginSuccess from './pages/login/LoginSuccess';
import Navbar from './components/Navigation/Navbar';
import { NewQuestionForm } from './pages/Question/NewQuestionForm';
import Footer from './components/Footer/footer';
import NewCourseForm from './pages/Course/CoursesPage';
import ProfilePage from './pages/Profile/ProfilePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<NewCourseForm courses={[]} onSubmit={function (courseName: string): void {
        throw new Error('Function not implemented.');
      } } />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile/u/" element={<ProfilePage />} />
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
        <div className="container">
          <Navbar />
          <App />
        </div> 
        <Footer />       
      </BrowserRouter>
    </Provider>
  );
}
