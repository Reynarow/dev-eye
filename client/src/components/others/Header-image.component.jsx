import React from 'react';

const HeaderImage = ({ backImage }) => (
  <div
    className='background-image'
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.7) , rgba(0,0,0,.7)), url(${backImage}) `,
    }}
  ></div>
);

export default HeaderImage;
