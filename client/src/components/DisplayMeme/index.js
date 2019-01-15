import React from 'react';

import './index.css';

const DisplayMeme = ({meme, clicked}) => {
  if (!meme.id) return '';

  return (
    <div className="display-meme" onClick={_ => clicked({})}>
      <img
        className="display-meme__image"
        src={meme.image}
        alt={meme.title}
      />
    </div>
  );
};

export default DisplayMeme;
