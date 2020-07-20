import React from 'react';
import { Link } from 'react-router-dom';

const GuestLink = () => {
  return (
    <ul>
      <li>
        <Link to='/register'>ثبت نام</Link>
      </li>
      <li>
        <Link to='/login'>ورود</Link>
      </li>
      <li>
        <Link to='!#'>برنامه نویسان</Link>
      </li>
    </ul>
  );
};

export default GuestLink;
