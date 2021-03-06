import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

//
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/profile/profile.action';
import Spinner from '../others/Spinner.component';

import DashbordContainer from './DashbordContainer.component';

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
      <DashbordContainer profile={profile} user={user} />
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
