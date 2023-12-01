import styles from './App.module.css';
import UserRegistration from '../components/UserRegistrationForm/form';
import NavBar from '../components/NavBar';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import LoginComponent from '../components/Login';
import AboutPage from '../components/About';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../components/NotFound';
import TeacherView from '../components/TeacherView';
import CreateQuiz from '../components/TeacherView/CreateQuiz';
import ManageQuiz from '../components/TeacherView/ManageQuiz';
import StudentView from '../components/StudentView';

function App() {
  return (
    <>
      <BrowserRouter>

        <NavBar />

        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={
            <LoginComponent />
          } />

          <Route path='/register' element={<UserRegistration />} />

          <Route path='/' element={
            <AboutPage />
          } />

          <Route exact element={<ProtectedRoute />}>

            {/* TeacherView routes */}

            <Route path="/teacherView" element={<TeacherView />} />
            <Route path="/createQuiz" element={<CreateQuiz />} />
            <Route path="/manageQuiz" element={<ManageQuiz />} />

            {/* TODO: StudentView routes */}
            <Route path="/studentView" element={<StudentView />} />

            <Route path='*' element={<NotFound />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
