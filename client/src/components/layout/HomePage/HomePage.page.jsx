import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LandingPage from './Landing.component';
import PropTypes from 'prop-types';

const HomePage = ({isAuthenicated}) => {
 if(isAuthenicated) return <Redirect to ="/dashboard"/>
  return(
  <div style={{ overflowX: 'hidden' }}>
    <LandingPage />
    <div style={{ minHeight: '100vh' }}></div>
  </div>
  )};
HomePage.prototype={
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) =>({
  isAuthenicated:state.auth.isAuthenicated
})


export default connect(mapStateToProps) (HomePage);
