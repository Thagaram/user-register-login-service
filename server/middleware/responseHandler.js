export default (req, res) => {
    let responseObject = {};
    if (res.response) { // If res.response is available sending success response
        responseObject = { ...responseObject, ...res.response };
    } else { // If response is undefined sending KO response
        responseObject.resultCode = 'KO';
        responseObject.message = 'Not found';
        responseObject.errorCode = '404-10000';
        res.status(404);
        responseObject = { ...responseObject, ...res.error };
    }
    return res.json(responseObject);
}
