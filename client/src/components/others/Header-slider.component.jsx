import React, { useState, useEffect } from 'react';
import HeaderImage from '../others/Header-image.component';

const HeaderSlider = ({ imageUrls }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (index >= imageUrls.length - 1) setIndex(0);
      else setIndex(index + 1);
    }, 6000);
    return () => {
      clearInterval(myInterval);
    };
  }, [index, imageUrls]);
  return (
    <div
      className='slider'
      style={{ transform: `translateX(${index * (100 / imageUrls.length)}%` }}
    >
      {imageUrls.map((backImage, index) => (
        <HeaderImage key={index} backImage={backImage} />
      ))}
    </div>
  );
};
export default HeaderSlider;
