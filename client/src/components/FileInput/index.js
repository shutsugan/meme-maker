import React from 'react';

import './index.css';

const FileInput = ({setter}) => {
  const encodeImage = ({target}) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', _ => setter(reader.result));
    reader.readAsDataURL(target.files[0]);
  };

  return (
    <div className="file-input">
      <input
        name="file"
        type="file"
        onChange={event => encodeImage(event)}
        accept=".jpg, .jpeg, .png"
      />
    </div>
  );
};

export default FileInput;
