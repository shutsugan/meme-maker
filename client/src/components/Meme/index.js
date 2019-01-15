import React from 'react';

import './index.css';

const Meme = ({meme, clicked}) => (
  <div className="meme" onClick={_ => clicked(meme)}>
    <h3 className="meme-title">{meme.title}</h3>
    <img src={meme.image} alt={meme.title} />
  </div>
);

export default Meme;
