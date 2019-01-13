import React, { Fragment, useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import './index.css';

const MEME_MUTATION = gql`
  mutation ($title: String!, $image: String!) {
    addMeme(
      title: $title,
      image: $image
    ) {
      id
      title
      image
    }
  }
`;

const AddMeme = _ => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const handleChange = ({target}, setter) => {
    setter(target.value);
  };

  return (
    <Fragment>
      <h2>Add a Meme</h2>
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
          mutation={MEME_MUTATION}
          variables={{title, image}}
          awaitRefetchQueries={true}>
          {addMeme => <button onClick={addMeme}>Add Meme</button>}
        </Mutation>
      </div>
    </Fragment>
  )
};

export default AddMeme;
