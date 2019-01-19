import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';

import { handleChange } from '../Utils/inputSetter';
import {
  MEMES_QUERY,
  MEME_UPDATE_MUTATION
} from '../../queries/memes';

import './index.css';

const UpdateMeme = ({meme}) => {
  if (!meme.id) return '';

  const [title, setTitle] = useState(meme.title);
  const [tcomment, setTopComment] = useState(meme.tcomment);
  const [bcomment, setBottomComment] = useState(meme.bcomment);

  const variables = {
    id: meme.id,
    title,
    tcomment,
    bcomment,
    image: meme.image
  };

  const handleMutation = store => {
    const store_data = store.readQuery({query: MEMES_QUERY});
    const data = store_data.memes.map(item => {
      if (item.id === meme.id) return {...item, title};
      else return item;
    })

    store.writeQuery({query: MEMES_QUERY, data});
  };

  return (
    <Fragment>
      <h2>Update the Meme</h2>
      <div className="add-meme">
        <input
          value={title}
          onChange={event => handleChange(event, setTitle)}
        />
        <input
          value={tcomment}
          onChange={event => handleChange(event, setTopComment)}
        />
        <input
          value={bcomment}
          onChange={event => handleChange(event, setBottomComment)}
        />
        <Mutation
          mutation={MEME_UPDATE_MUTATION}
          variables={variables}
          update={handleMutation}>

          {updateMeme => <button onClick={updateMeme}>Update Meme</button>}
        </Mutation>
      </div>
    </Fragment>
  )
};

export default UpdateMeme;
