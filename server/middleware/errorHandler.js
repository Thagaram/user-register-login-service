export default (error, req, res, next) => {
    const { message = '', errorCode = '' } = error;
    const responseObject = { resultCode: 'KO', message, errorCode };
    return res.status(error.status || 500).json(responseObject);
};
