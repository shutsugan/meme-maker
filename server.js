const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');

const schema = require('./schema');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(port, _ => console.log('Server running...'));
