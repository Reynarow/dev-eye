import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = ({ alert }) => {

  return <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>;
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert.alertObj,
});

export default connect(mapStateToProps)(Alert);
