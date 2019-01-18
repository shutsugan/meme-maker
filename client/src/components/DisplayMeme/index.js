import React, { useEffect } from 'react';

import './index.css';

const DisplayMeme = ({meme, clicked}) => {
  if (!meme.id) return '';

  let image = null;
  let canvas = null;
  let button = null;

  useEffect(_ => {
    createMeme(image, canvas, button);
  });

  const createMeme = (image, canvas, button) => {
    const context = canvas.getContext('2d');

    setCanvasDimension(canvas, image);
    addComment(context, image, canvas, meme);

    const download_image = canvas.toDataURL('image/jpeg')
      .replace("image/png", "image/octet-stream");

    button.setAttribute("href", download_image);
  };

  const setCanvasDimension = (canvas, image) => {
    canvas.crossOrigin = "Anonymous";
    canvas.width = image.width / 2;
    canvas.height = image.height / 2;
  }

  const addComment = (context, image, canvas, comment) => {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.font = 'bold 26pt Arial';
    context.fillStyle = 'white';
    context.shadowColor="black";
    context.shadowBlur=7;
    context.lineWidth=5;
    context.fillText(comment.tcomment.toUpperCase(), 16, 40);
    context.fillText(comment.bcomment.toUpperCase(), 16, canvas.height - 20);
  };

  return (
    <div className="display-meme" onClick={_ => clicked({})}>
      <a
        ref={node => button = node}
        className="display-meme__download"
        download={meme.title}>

        Download
      </a>
      <img
        ref={node => image = node}
        className="display-meme__image--hidden"
        src={meme.image}
        alt={meme.title}
      />
      <canvas
        className="display-meme__canvas"
        className="canvas" ref={node => canvas = node}
      />
    </div>
  );
};

export default DisplayMeme;
