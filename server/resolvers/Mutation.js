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
  const userId = getUserId(context);

  // post(xDistance: Float!, yDistance: Float!, zDistance: Float!, privacy: Boolean!, description: String!height: Float! width: Float!): Post!
  return context.prisma.createPost({
    description: args.description,
    privacy: args.privacy,
    xDistance: args.xDistance,
    yDistance: args.yDistance,
    zDistance: args.zDistance,
    horRotation: args.horRotation,
    verRotation: args.verRotation,
    height: args.height,
    width: args.width,
    marker: { connect: { id: 'ck1pfjeejsoyi0b405g8vvlkk' } },
    postPostedBy: { connect: { id: userId } },
  });
}

function comment(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createComment({
    text: args.text,
    user: { connect: { id: userId } },
    post: { connect: { id: args.postId } },
  });
}

function addMarker(parent, args, context, info) {
  const userId = getUserId(context);
  // addMarker(description: String!, imageUrl: String!, longitude: Float!, latitude: Float!, height: Float! plane: String!): Marker!
  return context.prisma.createMarker({
    description: args.description,
    imageUrl: args.imageUrl,
    longitude: args.longitude,
    latitude: args.latitude,
    height: args.height,
    plane: args.plane,
    markerPostedBy: { connect: { id: userId } },
  });
}

function editPost(parent, args, context, info) {
  const userId = getUserId(context);
  // editPost(id: ID!, description: String!): Post!
  return context.prisma.updatePost({
    data: {
      description: args.description,
    },
    where: {
      id: args.id,
    },
  });
}

function deletePost(parent, args, context, info) {
  const userId = getUserId(context);
  // editPost(id: ID!, description: String!): Post!
  return context.prisma.deletePost({
    id: args.id,
  });
}

function editComment(parent, args, context, info) {
  const userId = getUserId(context);
  // editPost(id: ID!, description: String!): Post!
  return context.prisma.updateComment({
    data: {
      text: args.text,
    },
    where: {
      id: args.id,
    },
  });
}

//delete single comment by ID
function deleteComment(parent, args, context, info) {
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
  deleteComment,
};
