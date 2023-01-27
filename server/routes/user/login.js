import getUserDetailsFromDB from '../../middleware/getUserDetails';

export default async (req, res, next) => {
    try {
        const userData = await getUserDetailsFromDB(req, next); // Fetching user data from DynamoDB table
        res.response = { token: res.token, ...userData }; // Adding token and user data to response object
        return next();
    } catch (error) {
        return next(error);
    }
};
