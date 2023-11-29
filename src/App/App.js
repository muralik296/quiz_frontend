import styles from './App.module.css';
import UserRegistration from '../components/UserRegistrationForm/form';
import NavBar from '../components/NavBar';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import LoginComponent from '../components/Login';

function App() {
  return (
    <>
      <BrowserRouter>

        <NavBar />
        <Routes>

          <Route path='/' element={
            <>
              <div className="row">
                <div className='col-md-12'>
                  <UserRegistration />
                </div>
              </div>
            </>
          }>

          </Route>

          <Route path='/login' element={
            <>
              <div className="row">
                <div className='col-md-12'>
                  <LoginComponent />
                </div>
              </div>
            </>
          }>

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
