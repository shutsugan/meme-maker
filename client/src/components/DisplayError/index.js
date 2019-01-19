import React from 'react';

import './index.css';

const DisplayError = ({error}) => {
  console.dir(error);
  return (
    <div className={`error ${!error ? 'error--disabled' : ''}`}>
      {error.message}
    </div>
  );
}

export default DisplayError;
