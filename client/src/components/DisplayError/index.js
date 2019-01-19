import React from 'react';

import './index.css';

const DisplayError = ({error}) => (
  <div className={`error ${!error ? 'error--disabled' : ''}`}>
    {error.message}
  </div>
);

export default DisplayError;
