import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';

import Meme from '../Meme';
import AddMeme from '../AddMeme';
import DisplayMeme from '../DisplayMeme';
import { MEMES_QUERY } from '../../queries/memes';

import './index.css';

const Memes = _ => {
  const [meme, setMeme] = useState({});
  const handleMeme = meme => setMeme(meme);

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
            {
              ({loading, error, data}) => {
                if (loading) return <div className="loading">Loading...</div>
                if (error) return <div className="error">error {error}</div>

                return data.memes.map(meme => (
                  <Meme
                    key={meme.id}
                    meme={meme}
                    clicked={handleMeme}
                  />
                ));
              }
            }
          </Query>
        </div>
      </div>
    </Fragment>
  );
};

export default Memes;
