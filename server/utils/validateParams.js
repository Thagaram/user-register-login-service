import _ from 'lodash';
import errorConfig from '../mWareConfig/apiConfig';
import { getLogger } from '../middleware/logger';

const validateMandatoryParam = (paramName, param) => {
    //If mandatory params are missing in incoming request sending error
    if (_.isUndefined(param) || _.isEmpty(param)) {
        throw new Error(`Missing or invalid param ${paramName}`);
    }
};

export const validateRegisterParams = (req, res, next) => {
    try {
        validateMandatoryParam('username', req.body.username);
        validateMandatoryParam('firstname', req.body.firstname);
        validateMandatoryParam('lastname', req.body.lastname);
        validateMandatoryParam('email', req.body.email);
        validateMandatoryParam('password', req.body.password);
        return next();
    } catch (error) {
        getLogger().error({
            error,
            message : error.message
        });
        const err = new Error(error.message || '');
        err.statusCode = 400;
        err.errorCode = errorConfig.MISSING_PARAM.errorCode;
        err.status = errorConfig.MISSING_PARAM.statusCode;
        return next(err);
    }
};

export const validateLoginParams = (req, res, next) => {
    try {
        validateMandatoryParam('username', req.body.username);
        validateMandatoryParam('password', req.body.password);
        return next();
    } catch (error) {
        getLogger().error({
            error,
            message : error.message
        });
        const err = new Error(error.message || '');
        err.errorCode = errorConfig.MISSING_PARAM.errorCode;
        err.status = errorConfig.MISSING_PARAM.statusCode;
        return next(err);
    }
};
