import React from 'react';

import './index.css';

const LoadMeme = ({loading}) => (
  <div className={`loading ${!loading ? 'loading--disabled' : ''}`}>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoadMeme;
