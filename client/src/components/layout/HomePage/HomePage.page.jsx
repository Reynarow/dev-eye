import React from 'react';
import LandingPage from './Landing.component';

const HomePage = () => (
  <div style={{ overflowX: 'hidden' }}>
    <LandingPage />
    <div style={{ minHeight: '100vh' }}></div>
  </div>
);

export default HomePage;
