import React from 'react';
import { Link } from 'react-router-dom';
const Authlink = ({ logout }) => {
  return (
    <ul>
      <li>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt'></i> خروج
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user-alt'></i> حساب کاربری
        </Link>
      </li>
    </ul>
  );
};

export default Authlink;
