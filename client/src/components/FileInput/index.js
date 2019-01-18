import React from 'react';

import './index.css';

const FileInput = ({setter}) => {
  const encodeImage = ({target}) => {
    const file = target.files[0];
    const reader = new FileReader();
    reader.addEventListener('loadend', _ => setter(reader.result));
    reader.readAsDataURL(file);
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
