
export function logFormatter(payload) {
    const {
        message,
        error,
    } = payload;

    if (!payload) { // If payload is not available logging warning console statement
        console.warn('No arguments passed to logger');
    }
    const data = {
        timestamp: new Date().toISOString(),
        message: message || error?.message,
        stackTrace: error?.stack, // logging error stack from error object
    };
    return data;
}
