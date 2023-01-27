import { Router } from 'express';
import { validateRegisterParams } from '../utils/validateParams';
import { validateLoginParams } from '../utils/validateParams';
import getToken from '../utils/generateToken';
import register from './user/register';
import login from './user/login';
import resHandler from '../middleware/responseHandler';
import errorHandler from '../middleware/errorHandler';


const api = Router();

api.use('/register', validateRegisterParams, register, resHandler); // This is for register service. Written a custom middlewares validateRegisterParams(validate mandatory params for this service), register(entrypoint to this service and passing the success/failure response) and resHandler(final response will be served from this function) 
api.use('/login', validateLoginParams, getToken, login, resHandler); // This is for login service. Written a custom middlewares validateLoginParams(validate mandatory params for this service), getToken(generating the JWT token),login(entrypoint to this service fetching user data from table and passing the success/failure response) and resHandler(final response will be served from this function)

api.use(errorHandler);

export default api;