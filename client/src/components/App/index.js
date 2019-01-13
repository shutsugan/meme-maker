import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

import Memes from '../Memes';
import AddMeme from '../AddMeme';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const App = _ => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <AddMeme />
        <Memes />
      </header>
    </div>
  </ApolloProvider>
);

export default App;
