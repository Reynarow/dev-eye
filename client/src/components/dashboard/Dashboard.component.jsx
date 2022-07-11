import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

//
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/profile/profile.action';
import Spinner from '../others/Spinner.component';

import DashbordContainer from './DashbordContainer.component';
import Experience from './Experience.component';
import Education from './Education.component';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
 useEffect(() => {
  getCurrentProfile();
   
 }, [getCurrentProfile])
 
  


  return !loading && profile===null ? (
    <Spinner />
  ) : (
    <>
      <DashbordContainer profile={profile} user={user} />
      <div className='dashbord-content'>
       
         <Experience  experience={profile && profile.experience?profile.experience:null}/>
            <Education education={profile &&profile.education?profile.education:null}/>
            </div>
    </>);
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
