import  putUserDeatailsInDB from '../../middleware/putUserDetails';
import { getLogger } from '../../middleware/logger';

export default async (req, res, next) => {
    try {
        await putUserDeatailsInDB(req, next); // pusing user details to DynamoDB table
        res.response = { message : 'A verification mail has been sent to your registered mail'} // Added success message to response object
        return next();
    } catch (error) {
        getLogger().error({
            error,
            message : error.message
        });
        return next(error);
    }    
 }