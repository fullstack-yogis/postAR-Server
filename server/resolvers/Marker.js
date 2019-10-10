
function markerPostedBy(parent, args, context) {
  return context.prisma.marker({ id: parent.id }).markerPostedBy()
}

module.exports = {
  markerPostedBy,
}
