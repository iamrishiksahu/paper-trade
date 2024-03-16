import './App.css';
import LoginComponent from './components/auth/Login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignupCompnent from './components/auth/Singup';
import ForgotPassowrd from './components/auth/ForgotPassword';
import Landing from './components/Landing'
import Dashboard from './components/dashboard/Dashboard';
import Positions from './components/dashboard/Positions';
import Overview from './components/dashboard/Overview';
import Funds from './components/dashboard/Funds';
import Orders from './components/dashboard/Orders';
import { useState } from 'react';
import NoInternetConnection from './components/NoInternet';
import RequireAuth from './components/RequireAuth';
import appTheme from './AppTheme';
import { ThemeProvider } from '@mui/material';
import PersistLogin from './components/PersistLogin';
import store from './app/store';
import { Provider } from 'react-redux';


function App() {

  return (

    <ThemeProvider theme={appTheme}>
      <NoInternetConnection>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>

              <Route path='/signup' element={<SignupCompnent />} />
              <Route path='/forgotpassword' element={<ForgotPassowrd />} />
              <Route element={<PersistLogin />}>
              <Route exact path='/' element={<Landing />} />
                <Route path='/login' element={<LoginComponent />} />
                <Route element={<RequireAuth />}>
                  <Route path='/dashboard' element={<Dashboard />}>
                    <Route exact path='/dashboard/' element={<Overview />} />
                    <Route path='/dashboard/positions' element={<Positions />} />
                    <Route path='/dashboard/funds' element={<Funds />} />
                    <Route path='/dashboard/orders' element={<Orders />} />
                  </Route>
                </Route>

                <Route element={<RequireAuth />}>
                  <Route path='/test' element={<Orders />} />
                </Route>
              </Route>

              {/**Catch all routes */}
              <Route path='*' element={<p>404 Not found!</p>} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </NoInternetConnection>
    </ThemeProvider>



  );
}

export default App;
