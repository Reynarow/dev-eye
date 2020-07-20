import React from 'react';
import { Link } from 'react-router-dom';

const HeaderTitle = () => (
  <div className='landing-inner'>
    <h1 className='x-large animate__animated animate__fadeInLeftBig'>
      شبکه برنامه نویسان
    </h1>
    <p className='lead animate__animated animate__fadeInRightBig'>
      با ساخت پروفایل خود، با همکاران و دوستانتان آشنا شوید
    </p>
    <div className='buttons animate__animated  animate__fadeInUp'>
      <Link to='/register' role='button' className='btn btn-primary'>
        ثبت نام
      </Link>
      <Link to='/login' role='button' className='btn btn-light '>
        ورود
      </Link>
    </div>
  </div>
);

export default HeaderTitle;
