import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/auth/auth.action';
import GuestLink from './GuestLink.navComponent';
import Authlink from './Authlink.navComponent';

const Navbar = ({ auth: { isAuthenicated, loading }, logout }) => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i>{' '}
          <span className='hide-sm'>DevEye</span>
        </Link>
      </h1>
      {
        <Fragment>
          {isAuthenicated ? <Authlink logout={logout} /> : <GuestLink />}
        </Fragment>
      }
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
