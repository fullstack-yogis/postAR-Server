
function posts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).posts()
}

function comments(parent, args, context) {
  return context.prisma.user({ id: parent.id }).comments()
}

function markers(parent, args, context) {
  return context.prisma.user({ id: parent.id }).markers()
}

module.exports = {
  posts,
  comments,
  markers
}
