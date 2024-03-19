const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try {
        const decodedToken = await isTokenValid({ token }); // Await the result of isTokenValid
        const { _id, username, email } = decodedToken;
        req.user = { _id, username, email };
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Unauthorized to access this route');
        }
        next();
    }
};


module.exports = {
    authenticateUser,
    authorizePermissions,
};