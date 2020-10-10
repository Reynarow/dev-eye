import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./components/routhing/PrivateRoute.component";

//
import Alert from "./components/others/Alert.component";
import Spinner from "./components/others/Spinner.component";
//
import { loadUser } from "./redux/auth/auth.action";
import setAuthToken from "./utils/setAuthToken.utils";

import "./App.scss";

import Navbar from "./components/layout/HomePage/Navbar.component";

const HomePage = lazy(() =>
  import("./components/layout/HomePage/HomePage.page")
);
const Login = lazy(() => import("./components/auth/Login.page"));
const Register = lazy(() => import("./components/auth/Register.page"));
const Dashboard = lazy(() =>
  import("./components/dashboard/Dashboard.component")
);
const CreateProfile = lazy(() =>
  import("./components/profile-froms/CreateProfile.component")
);
const EditProfile = lazy(() =>
  import("./components/profile-froms/EditProfile.component")
);
const AddExperience = lazy(() =>
  import("./components/profile-froms/AddExperience.component")
);

const AddEducation = lazy(() =>
  import("./components/profile-froms/AddEducation.component")
);

localStorage.token && setAuthToken(localStorage.token);

const App = ({ alert, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          {alert && <Alert />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
            {/* TODO:make a notFound page <Route component={NotFound} /> */}
          </Switch>
        </Suspense>
      </Fragment>
    </Router>
  );
};
const mapStateToProps = (state) => ({
  alert: state.alert.alertObj,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
