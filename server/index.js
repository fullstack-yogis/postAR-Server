const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Subscription = require('./resolvers/Subscription');
const Comment = require('./resolvers/Comment');
if (process.env.NODE_ENV !== 'production') require('../secrets');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

const server = new GraphQLServer({
  typeDefs: 'server/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on port 4000`));
