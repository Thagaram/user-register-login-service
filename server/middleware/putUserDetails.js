import AWS from 'aws-sdk';
import { v4 } from 'uuid';
import config from '../config';
import errorConfig from '../mWareConfig/apiConfig';
import { getLogger } from './logger';

const dynamo = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION || config.REGION });

export default async (req, next) => {
    try {
        const item ={
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            id: v4()
        }
        // TableName and Item params are required to put the data into DynamoDB table
        const params = {
            TableName: config.TABLE_NAME,
            Item: item,
        };
        getLogger().debug({
            message: `putUserDetails params :: ${JSON.stringify(params)}`,
        });
        // Pushing user details to DynamoDB table with put operation
        const response = await dynamo.put(params).promise();
        // An error will occur if response is undefined so throwing an error
        if (!response) {
            const err = new Error(errorConfig.DYNAMODB_WRITE_ERROR.message);
            err.errorCode = errorConfig.DYNAMODB_WRITE_ERROR.errorCode;
            err.status = errorConfig.DYNAMODB_WRITE_ERROR.statusCode;
            getLogger().error({
                error: err,
                message: `Error while writing data to ${config.TABLE_NAME} table because of ${err.message}`,
            });
            return next(err);
        }
    } catch (error) {
        getLogger().error({
            error,
            message: error.message,
        });
        throw error;
    }
};
