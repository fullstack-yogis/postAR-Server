const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');

async function signup(parent, args, context, info) {

  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {

  const user = await context.prisma.user({ email: args.email });

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

function post(parent, args, context, info) {
  // console.log('context-----------', context)
  const userId = getUserId(context);

  // post(xDistance: Float!, yDistance: Float!, zDistance: Float!, privacy: Boolean!, description: String!): Post!
  return context.prisma.createPost({
    description: args.description,
    privacy: args.privacy,
    xDistance: args.xDistance,
    yDistance: args.yDistance,
    zDistance: args.zDistance,
    marker: { connect: { id: 'ck1l5gdahczar0b40frop08ju' } },
    postPostedBy: { connect: { id: userId } },

  });
}

async function comment(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createComment({
    text: args.text,
    user: { connect: { id: userId } },
    post: { connect: { id: args.postId } },
  });
}

async function addMarker(parent, args, context, info) {
  const userId = getUserId(context);
  // addMarker(description: String!, imageUrl: String!, longitude: Float!, latitude: Float!, height: Float!): Marker!
  return context.prisma.createMarker({
    description: args.description,
    imageUrl: args.imageUrl,
    longitude: args.longitude,
    latitude: args.latitude,
    height: args.height,
    markerPostedBy: { connect: { id: userId } },
  });
}

async function editPost(parent, args, context, info) {
  const userId = getUserId(context);
  // editPost(id: ID!, description: String!): Post!
  return context.prisma.updatePost({
    data: {
      description: args.description,
    },
    where: {
      id: args.id,
    }
  });
}

async function deletePost(parent, args, context, info) {
  const userId = getUserId(context);
  // editPost(id: ID!, description: String!): Post!
  return context.prisma.deletePost({
      id: args.id,
  });
}

async function editComment(parent, args, context, info) {
  const userId = getUserId(context);
  // editPost(id: ID!, description: String!): Post!
  return context.prisma.updateComment({
    data: {
      text: args.text,
    },
    where: {
      id: args.id,
    }
  });
}

async function deleteComment(parent, args, context, info) {
  const userId = getUserId(context);
  // editPost(id: ID!, description: String!): Post!
  return context.prisma.deleteComment({
      id: args.id,
  });
}

module.exports = {
  signup,
  login,
  post,
  comment,
  addMarker,
  editPost,
  deletePost,
  editComment,
  deleteComment
};
