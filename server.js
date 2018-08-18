const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

require('dotenv').config({ path: 'variables.env' });

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initializes application
const app = express();

// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User,
    },
  }),
);

const PORT = process.env.port || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
