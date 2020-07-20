import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/alert/alert.action';
import { register } from '../../redux/auth/auth.action';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenicated }) => {
  useEffect(() => {
    document.title = 'ثبت نام';
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const ondHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert('پسورد ها یکسان نیستند', 'danger');
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenicated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div className='register'>
        <div className='container auth'>
          <div className='container-group'>
            <h1 className='large text-primary '>ثبت نام</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> حساب کاربری خود را ایجاد کنید
            </p>
            <form className='form' onSubmit={onHandleSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='نام خود را وارد کنید'
                  name='name'
                  value={name}
                  onChange={ondHandleChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='ایمیل'
                  name='email'
                  value={email}
                  onChange={ondHandleChange}
                />
                <small className='form-text'>
                  از ایمیل عکس دار استفاده کنید
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='رمز عبور'
                  name='password'
                  maxLength='12'
                  value={password}
                  onChange={ondHandleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='تکرار رمز عبور'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={ondHandleChange}
                  required
                />
              </div>
              <input
                type='submit'
                onSubmit={onHandleSubmit}
                className='btn btn-primary'
                value='ثبت نام'
              />
            </form>
            <p className='my-1'>
              قبلا ثبت نام کردی؟ <Link to='/login'>ورود</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.protoTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenicated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenicated: state.auth.isAuthenicated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
