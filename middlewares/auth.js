const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { cookies } = req;

  if ((!authorization || !authorization.startsWith('Bearer ')) && (!cookies.jwt)) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = cookies.jwt ? cookies.jwt : authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
