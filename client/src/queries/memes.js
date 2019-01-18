import gql from 'graphql-tag';

export const MEMES_QUERY = gql`
  query memesQuery {
    memes {
      id
      title
      image
      tcomment
      bcomment
    }
  }
`;

export const MEME_ADD_MUTATION = gql`
  mutation (
    $title: String!,
    $image: String!,
    $tcomment: String!,
    $bcomment: String!
  ) {
    addMeme(
      title: $title,
      image: $image,
      tcomment: $tcomment,
      bcomment: $bcomment
    ) {
      title
      image
      tcomment
      bcomment
    }
  }
`;

export const MEME_UPDATE_MUTATION = gql`
  mutation (
    $id: ID!,
    $title: String!,
    $image: String!
    $tcomment: String!,
    $bcomment: String!
  ) {
    updateMeme(
      id: $id,
      title: $title,
      image: $image,
      tcomment: $tcomment,
      bcomment: $bcomment
    ) {
      id
      title
      image
      tcomment
      bcomment
    }
  }
`;
