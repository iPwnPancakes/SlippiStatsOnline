import { connectionFactory } from "./database/mongodb/connectionFactory";
import { config } from 'dotenv';

const express = require('express');
const cors = require('cors');
const db = require('./restApi/Controllers/mongo-controller');
const fs = require('fs');
const rimraf = require("rimraf");
const logs = require('../config/logger-config');
const logger = logs.logger;
const https = require('https');
import { v1 } from './restApi/v1';
import { v2 } from './restApi/v2';
import { GameModel } from "./database/mongodb/models/GameModel";

async function createApp() {
    config();
    const env = process.env.NODE_ENV || 'develop';
    const app = express();
    const port = 3000;
    const mongoDbUri: string | undefined = process.env.MONGO_DB_URI;

    if (mongoDbUri === undefined || mongoDbUri === '') {
        throw new Error('MongoDB URI is not set');
    }

    const dbConnection = await connectionFactory(mongoDbUri);

    const v1DbController = db(dbConnection, GameModel);
    const v1Routes = v1(v1DbController).router;
    const v2Routes = v2(dbConnection);


    app.use(cors());
    app.use(logs.requestLogger);
    app.use(logs.errorLogger);
    app.use('/api/v1', v1Routes);
    app.use('/api/v2', v2Routes);

    // Cleanup tmp directory
    rimraf('./tmp', () => {
        // Timeout to allow directory to be fully deleted first
        setTimeout(() => {
            fs.mkdir('./tmp', () => {
                fs.writeFile('./tmp/.gitkeep', '', () => { });
            });
        }, 1000);
    });

    if (env === 'prod') {
        // Start HTTPS Server
        const privateKey = fs.readFileSync('ssl/server.key', 'utf8');
        const certificate = fs.readFileSync('ssl/server.crt', 'utf8');
        const credentials = {
            key: privateKey,
            cert: certificate
        };
        const server = https.createServer(credentials, app);
        server.listen(port);
        server.timeout = 1000 * 60 * 30;
        logger.info('HTTPS server started');
    } else if (env === 'develop') {
        // Start HTTP Server
        const server = app.listen(port, () => {
            logger.info(`Server listening at http://localhost:${ port }`)
        });
        server.timeout = 1000 * 60 * 30;
    } else {
        logger.error('ENV not set. Failed to start server.');
    }
}

createApp().then(() => {
    console.log('Started');
}).catch(err => {
    throw Error(`Uncaught Error: ${ err.message }`);
});
