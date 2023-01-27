import jwt from 'jsonwebtoken';
import config from '../config';
import { getLogger } from '../middleware/logger';
import errorConfig from '../mWareConfig/apiConfig';

export default (req, res, next) => {
    try {
        const payload = {
            username: req.body.username,
        };
        const signingOptions = {
            algorithm: config.JWT_ALGORITHM,
            issuer: config.JWT_ISSUER,
            expiresIn: config.JWT_EXPIRY,
        };
        // generating JWT token with username, JWT_SECRET_KEY and signingOptions
        const token = jwt.sign(payload, config.JWT_SECRET_KEY, signingOptions);
        getLogger().debug({
            message: `Generated token :: ${token}`,
        });
        res.token = token;
        return next();
    } catch (error) {
        getLogger().error({
            error,
            message: error.message,
        });
        const err = new Error(errorConfig.TOKEN_ERROR.message);
        err.errorCode = errorConfig.TOKEN_ERROR.errorCode;
        err.status = errorConfig.TOKEN_ERROR.statusCode;
        return next(err);
    }
};
