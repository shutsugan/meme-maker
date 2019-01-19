import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';

import Meme from '../Meme';
import AddMeme from '../AddMeme';
import DisplayMeme from '../DisplayMeme';
import LoadMeme from '../LoadMeme';
import DisplayError from '../DisplayError';
import { MEMES_QUERY } from '../../queries/memes';

import './index.css';

const Memes = _ => {
  const [meme, setMeme] = useState({});
  const handleMeme = meme => setMeme(meme);

  const getMemes = (loading, error, data) => {
    if (loading) return <LoadMeme loading={loading} />
    if (error) return <DisplayError error={error} />

    return data.memes.map(meme => (
      <Meme key={meme.id} meme={meme} clicked={handleMeme} />
    ));
  }

  return (
    <Fragment>
      <div className="memes memes__updater">
        <AddMeme meme={meme} />
        <DisplayMeme meme={meme} clicked={handleMeme} />
      </div>
      <div className="memes">
        <h2>Memes List</h2>
        <div className="memes__list">
          <Query query={MEMES_QUERY}>
            {({loading, error, data}) => getMemes(loading, error, data)}
          </Query>
        </div>
      </div>
    </Fragment>
  );
};

export default Memes;
