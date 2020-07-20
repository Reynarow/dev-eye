import React, { useEffect, memo } from 'react';
import img1 from '../../../img/showcase.jpg';
import img2 from '../../../img/showcase_1.jpg';
import img3 from '../../../img/showcase_2.jpg';

import HeaderTitle from '../../others/Header-title.component';
import HeaderSlider from '../../others/Header-slider.component';

const Landing = () => {
  useEffect(() => {
    document.title = 'DevEye- شبکه برنامه نویسان';
  });
  let imgUrls = [img1, img2, img3];

  return (
    <section className='landing '>
      <HeaderSlider imageUrls={imgUrls} />
      <HeaderTitle />
    </section>
  );
};
export default memo(Landing);
