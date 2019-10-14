const { getUserId } = require('../utils');

function newPostSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.post({ mutation_in: ['CREATED'] }).node()
}

const newPost = {
  subscribe: newPostSubscribe,
  resolve: payload => {
    // const userId = getUserId(context);

    if (payload.privacy === false) {
      // console.log('getting the payload', payload)
      return payload
    } else {
      // console.log('not getting the payload')
      return
    }
  },
}

function newCommentSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.comment({ mutation_in: ['CREATED'] }).node()
}

const newComment = {
  subscribe: newCommentSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newPost,
  newComment
}
