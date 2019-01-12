import React, { Fragment} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Meme from '../Meme';

import './index.css';

const MEMES_QUERY = gql`
  query memesQuery {
    memes {
      id
      title
      image
    }
  }
`;

const Memes = _ => {
  return (
    <Fragment>
      <h1>Memes List</h1>
      <div className="memes">
        <Query query={MEMES_QUERY}>
          {
            ({loading, error, data}) => {
              if (loading) return <div className="loading">Loading...</div>
              if (error) return <div className="error">error {error}</div>

              return data.memes.map(meme => <Meme key={meme.id} meme={meme} />);
            }
          }
        </Query>
      </div>
    </Fragment>
  );
};

export default Memes;
