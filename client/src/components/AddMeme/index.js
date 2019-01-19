import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import uniqid from 'uniqid';

import FileInput from '../FileInput';
import { handleChange } from '../Utils/inputSetter';
import {
  MEMES_QUERY,
  MEME_ADD_MUTATION
} from '../../queries/memes';

import './index.css';

const AddMeme = ({meme}) => {
  if (meme.id) return '';

  const id = uniqid();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [tcomment, setTopComment] = useState('');
  const [bcomment, setBottomComment] = useState('');

  const handleMutation = store => {
    const {memes} = store.readQuery({query: MEMES_QUERY});
    const data = memes.push({id, title, image, tcomment, bcomment});

    store.writeQuery({query: MEMES_QUERY, data})
  }

  return (
    <Fragment>
      <h2>Add a Meme</h2>
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
          mutation={MEME_ADD_MUTATION}
          variables={{title, image, tcomment, bcomment}}
          update={handleMutation}>

          {addMeme => <button onClick={addMeme}>Add Meme</button>}
        </Mutation>
      </div>
    </Fragment>
  )
};

export default AddMeme;
