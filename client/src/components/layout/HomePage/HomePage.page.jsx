import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './Landing.component';
import PropTypes from 'prop-types';

const HomePage = () => {

  return(
  <div style={{ overflowX: 'hidden' }}>
    <LandingPage />
    <div style={{ minHeight: '100vh' }}> <h1> خوش اومدی!</h1></div>
  </div>
  )};
HomePage.prototype={
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) =>({
  isAuthenicated:state.auth.isAuthenicated
})


export default connect(mapStateToProps) (HomePage);
