import React from 'react';

import Button from './Button.component';

const HeaderTitle = () => (
  <div className='landing-inner'>
    <h1 className='x-large animate__animated animate__fadeInLeftBig'>
      شبکه برنامه نویسان
    </h1>
    <p className='lead animate__animated animate__fadeInRightBig'>
      با ساخت پروفایل خود، با همکاران و دوستانتان آشنا شوید
    </p>
    <div className='buttons animate__animated  animate__fadeInUp'>
      <Button link to='/register' color='primary'>
        ثبت نام
      </Button>
      <Button link to='/login' className='light'>
        ورود
      </Button>
    </div>
  </div>
);

export default HeaderTitle;
