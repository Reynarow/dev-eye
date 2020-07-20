import React from 'react';
import PropTypes from 'prop-types';
//
import { connect } from 'react-redux';
import { setAlert } from '../../redux/alert/alert.action';
//
import { Route, Redirect } from 'react-router-dom';
//

const PrivateRoute = ({
  component: Component,
  setAlert,
  auth: { isAuthenicated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isAuthenicated && !loading) {
        setAlert('ابتدا وارد شوید', 'danger');
        return <Redirect to='/login' />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(PrivateRoute);
