import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import uniqid from 'uniqid';

import {
  MEMES_QUERY,
  MEME_ADD_MUTATION,
  MEME_UPDATE_MUTATION
} from '../../queries/memes';

import './index.css';


const AddMeme = ({meme}) => {
  const action = !meme.id ? 'Add' : 'Update';
  const mutation = !meme.id ? MEME_ADD_MUTATION : MEME_UPDATE_MUTATION;

  const id = uniqid();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const variables = !meme.id
    ? {title, image}
    : {id: meme.id, title, image: meme.image};

  const handleChange = ({target}, setter) => {
    setter(target.value);
  };

  const handleMutation = store => {
    const store_data = store.readQuery({ query: MEMES_QUERY });

    let data;
    if (meme.id) {
      data = store_data.memes.map(item => {
        if (item.id === meme.id) return {...item, title};
        else return item;
      });
    } else {
      data = store_data.memes.push({id, title, image});
    }

    store.writeQuery({query: MEMES_QUERY, data})
  }

  return (
    <Fragment>
      <h2>{action} a Meme</h2>
      <div className="add-meme">
        <input
          name="title"
          value={title}
          onChange={event => handleChange(event, setTitle)}
          placeholder="Your meme title here"
        />
        <input
          name="image"
          value={image}
          onChange={event => handleChange(event, setImage)}
          placeholder="meme Image"
        />
        <Mutation
          mutation={mutation}
          variables={variables}
          update={handleMutation}>

          {addMeme => <button onClick={addMeme}>{action} Meme</button>}
        </Mutation>
      </div>
    </Fragment>
  )
};

export default AddMeme;
