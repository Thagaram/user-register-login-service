import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/api';
import errorHandler from './middleware/errorHandler';
import { createLogger } from './middleware/logger';
import config from '../server/config';
import isProd from './utils/isProd'; 

const setup = async() => {
    createLogger({
        level: config.LOG_LEVEL || 'debug',
    });
}

(async () => {
    // Create instances(here I have created logger instace) before server starting and using them in the application
    await setup();

    const app = express();
    const port = isProd ? 8080 : 3000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/user', api);

    app.use(errorHandler);

    app.listen(port, () => console.log(`Application started on port: ${port}`));
})();
