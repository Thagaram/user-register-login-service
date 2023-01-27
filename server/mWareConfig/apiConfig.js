const errorConfig = {
    MISSING_PARAM: {
        message: 'Missing or invalid parameter',
        errorCode: 'ERR_1001',
        statusCode: 400,
    },
    DYNAMODB_NO_DATA_ERROR: {
        message: 'No Data Found in DB',
        errorCode: 'ERR_1002',
        statusCode: 404,
    },
    DYNAMODB_WRITE_ERROR: {
        message: 'Error while writing data to db',
        errorCode: 'ERR_1003',
        statusCode: 500,
    },
    DYNAMODB_RETRIEVE_ERROR: {
        message: 'Error while retrieving data from db',
        errorCode: 'ERR_1004',
        statusCode: 500,
    },
    INVALID_PASSWORD: {
        message: 'Invalid password please enter correct one',
        errorCode: 'ERR_1005',
        statusCode: 400,
    },
    TOKEN_ERROR: {
        message: 'Error while generating the token',
        errorCode: 'ERR_1006',
        statusCode: 401,
    },
};

export default errorConfig;
