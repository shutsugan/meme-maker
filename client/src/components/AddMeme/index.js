import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import uniqid from 'uniqid';

import FileInput from '../FileInput';

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
  const [tcomment, setTopComment] = useState('');
  const [bcomment, setBottomComment] = useState('');

  const variables = !meme.id
    ? {title, image, tcomment, bcomment}
    : {
        id: meme.id,
        title,
        tcomment,
        bcomment,
        image: meme.image
      };

  const handleChange = ({target}, setter) => setter(target.value);

  const handleMutation = store => {
    const store_data = store.readQuery({ query: MEMES_QUERY });

    let data;
    if (meme.id) {
      data = store_data.memes.map(item => {
        console.log(item.id);
        if (item.id === meme.id) return {...item, title};
        else return item;
      });
    } else {
      data = store_data.memes.push({id, title, image, tcomment, bcomment});
    }

    store.writeQuery({query: MEMES_QUERY, data})
  }

  return (
    <Fragment>
      <h2>{action} a Meme</h2>
      <div className="add-meme">
        <input
          value={title}
          onChange={event => handleChange(event, setTitle)}
          placeholder="Your meme title here"
        />
        <input
          value={tcomment}
          onChange={event => handleChange(event, setTopComment)}
          placeholder="Top comment here"
        />
        <input
          value={bcomment}
          onChange={event => handleChange(event, setBottomComment)}
          placeholder="Bottom comment here"
        />
        <FileInput setter={setImage} />
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
