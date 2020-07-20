import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

//
import { connect } from 'react-redux';
import { login } from '../../redux/auth/auth.action';
//
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenicated, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'ورود کاربر';
  });

  const { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };
  // Redirect if logged in
  if (isAuthenicated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <>
      <div className='login'>
        <div className='container auth'>
          <div className='container-group'>
            <h1 className='large text-primary '>ورود کاربر</h1>
            <p className='lead'>
              <i className='fas fa-user'></i>
              <span style={{ paddingRight: '5px' }}>
                به حساب کاربری خود وارد شوید
              </span>
            </p>
            <form className='form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='ایمیل'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  required
                  title='ایمیل'
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='رمز عبور'
                  name='password'
                  minLength='6'
                  maxLength='12'
                  value={password}
                  onChange={handleChange}
                  required
                  title='رمز عبور'
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                {loading ? <span className='spinner'></span> : 'ورود'}
              </button>
            </form>
            <p className='my-1'>
              حساب کاربری نداری؟ <Link to='/register'>ثبت نام</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenicated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenicated: state.auth.isAuthenicated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { login })(Login);
