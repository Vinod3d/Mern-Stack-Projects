const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const isTokenValid = ({ token }) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    // Handle the token verification failure
    console.error('Token verification failed:', error.message);
    return false;
  }
};

const attachCookiesToResponse = ({ res, tokenUser }) => {
  const token = createJWT({ payload: tokenUser });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
