import React from 'react';
import PropTypes from 'prop-types';
//
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/profile/profile.action';
import { useEffect } from 'react';
import Spinner from '../others/Spinner.component';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='container'>
      <h1 className='large text-primary'>حساب کاربری</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> {user && user.name}، خوش اومدی :)
      </p>
      {profile !== null ? <>has </> : <> no</>}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
