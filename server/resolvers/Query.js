async function feed(parent, args, context, info) {
  const posts = await context.prisma.posts();
  return posts;
}

async function post(parent, args, context, info) {
  const post = await context.prisma.post({ id: args.id });
  return post;
}

module.exports = {
  feed,
  post,
};
