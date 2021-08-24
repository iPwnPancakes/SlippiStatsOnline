const logger = require('../../config/logger-config').logger;

const mongo = (dbConnection, GameModel) => {
    dbConnection.on('error', (err) => {
        logger.error('Error connecting to DB:', err);
        process.exit(1);  // Close backend server
    });

    dbConnection.once('open', () => {
        logger.info('Connected to DB');
    });

    const getGames = async (data) => {
        return await GameModel.find(data, (err, result) => {
            if (err) logger.error('Error in getGame:', err);
        }).lean().exec();
    };

    const checkGame = async (data) => {
        return await GameModel.find(data, (err, result) => {
            if (err) logger.error('Error in checkGame:', err);
        }).limit(1).countDocuments();
    };

    const addGame = (data) => {
        var gameInstance = new GameModel(data);
        gameInstance.save(function (err) {
            if (err) return logger.error('Error in addGame:', err);
        });
    };

    const getTotalGameCount = async () => {
        return await GameModel.estimatedDocumentCount({}, (err, count) => {
            if (err) logger.error('Error in getGame:', err);
        }).lean().exec();
    };

    return {
        getGames,
        checkGame,
        addGame,
        getTotalGameCount
    }

};

module.exports = mongo;
