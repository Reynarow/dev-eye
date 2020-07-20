import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './components/routhing/PrivateRoute.component';

//
import Alert from './components/others/Alert.component'
import Spinner from './components/others/Spinner.component'
//
import { loadUser } from './redux/auth/auth.action';
import setAuthToken from './utils/setAuthToken.utils';






import './App.scss';



import Navbar from './components/layout/HomePage/Navbar.component';


const HomePage = lazy(() => (import('./components/layout/HomePage/HomePage.page')));
const Login = lazy(() => (import('./components/auth/Login.page')));
const Register = lazy(() => (import('./components/auth/Register.page')));
const Dashboard = lazy(() => (import('./components/dashboard/Dashboard.component')));

localStorage.token && setAuthToken(localStorage.token)

const App = ({ alert, loadUser }) => {

  useEffect(() => {
    loadUser()

  }, [loadUser])
  return (
    <Router>
      <Fragment>
        <Navbar />

        <Suspense fallback={<Spinner />}>
          {alert && <Alert />}
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
        </Suspense>
      </Fragment >

    </Router >

  )
};
const mapStateToProps = (state) => ({
  alert: state.alert.alertObj,
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
