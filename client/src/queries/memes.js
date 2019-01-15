import gql from 'graphql-tag';

export const MEMES_QUERY = gql`
  query memesQuery {
    memes {
      id
      title
      image
    }
  }
`;

export const MEME_ADD_MUTATION = gql`
  mutation ($title: String!, $image: String!) {
    addMeme(
      title: $title,
      image: $image
    ) {
      title
      image
    }
  }
`;

export const MEME_UPDATE_MUTATION = gql`
  mutation ($id: ID!, $title: String!, $image: String!) {
    updateMeme(
      id: $id,
      title: $title,
      image: $image
    ) {
      id
      title
      image
    }
  }
`;
