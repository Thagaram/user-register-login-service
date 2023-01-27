import AWS from 'aws-sdk';
import config from '../config';
import errorConfig from '../mWareConfig/apiConfig';
import { getLogger } from './logger';
const region = process.env.REGION || config.REGION;
const dynamo = new AWS.DynamoDB.DocumentClient({ region });

export default async (req, next) => {
    try {
        const params = {
            TableName: config.TABLE_NAME,
            Key: {
                username: req.body.username,
            },
        };
        getLogger().debug({
            message : `getUserDetails params :: ${JSON.stringify(params)}`
        });
        //Fetching user details from DynamoDB table
        const { Item } = await dynamo.get(params).promise();

        getLogger().debug({
            message : `getUserDetails item :: ${JSON.stringify(Item)}`
        });
        // If user details are not found in DynamoDB throwing error
        if (!Item) {
            const err = new Error( errorConfig.DYNAMODB_NO_DATA_ERROR.message);
            err.errorCode = errorConfig.DYNAMODB_NO_DATA_ERROR.errorCode;
            err.status = errorConfig.DYNAMODB_NO_DATA_ERROR.statusCode;
            getLogger().error({
                error: err,
                message : `Entry not found in DB for user ${req.body.username}`
            });
            return next(err);
        }
        //If incoming password is not matching with DynamoDB table password throwing error
        if(Item.password !== req.body.password){
            const err = new Error( errorConfig.INVALID_PASSWORD.message);
            err.errorCode = errorConfig.INVALID_PASSWORD.errorCode;
            err.status = errorConfig.INVALID_PASSWORD.statusCode;
            getLogger().error({
                error: err,
                message : `Incoming password ${req.body.password} is not matched with DB password ${Item.password}`
            });
            return next(err);
        }
        //deleting password from db item before returning to user
        delete Item.password;
        return {user: Item};
    } catch (error) {
        getLogger().error({
            error,
            message : error.message
        });
        throw error;
    }
};