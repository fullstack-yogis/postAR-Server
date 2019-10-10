const jwt = require('jsonwebtoken');

function getUserId(context) {
  console.log('context request-----------', context.request.headers)
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
}

module.exports = {
  getUserId,
};
