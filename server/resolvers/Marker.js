
function markerPostedBy(parent, args, context) {
  return context.prisma.marker({ id: parent.id }).postedBy()
}

module.exports = {
  markerPostedBy,
}
