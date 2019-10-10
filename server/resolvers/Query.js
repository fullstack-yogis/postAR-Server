
async function feed(parent, args, context, info) {
  console.log('entered--------------------')
  const posts = await context.prisma.posts()
  return posts
}

module.exports = {
  feed,
}

