
function postPostedBy(parent, args, context) {
  return context.prisma.post({ id: parent.id }).postPostedBy()
}

function comments(parent, args, context) {
  return context.prisma.post({ id: parent.id }).comments()
}

function marker(parent, args, context) {
  return context.prisma.post({ id: parent.id }).marker()
}

module.exports = {
  postPostedBy,
  comments,
  marker
}
