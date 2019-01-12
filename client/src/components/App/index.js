import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

import Memes from '../Memes';

import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const App = _ => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Memes />
      </header>
    </div>
  </ApolloProvider>
);

export default App;
