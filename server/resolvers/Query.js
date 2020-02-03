const { getUserId } = require('../utils');

async function feed(parent, args, context, info) {
  const userId = getUserId(context);
  const where = {
    OR: [
      { privacy: false },
      {
        AND: [
          {
            postPostedBy: {
              id: userId,
            },
          },
          { privacy: true },
        ],
      },
    ],
  };

  const posts = await context.prisma.posts({
    where,
  });

  // console.log('posts-------------', posts)
  return posts;
}

async function post(parent, args, context, info) {
  const post = await context.prisma.post({ id: args.id });
  return post;
}

async function allMarkers(parent, args, context, info) {
  const markers = await context.prisma.markers();
  return markers;
}

module.exports = {
  feed,
  post,
  allMarkers,
};
