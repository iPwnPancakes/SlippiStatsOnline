import { Router } from "express";
import { Connection } from 'mongoose';
import { GetGamesByTag } from "../../UseCases/GetGamesByTag/GetGamesByTag";
import { MongoDbSlippiGameRepository } from "../../Repositories/Implementations/MongoDbSlippiGameRepository";
import { SlippiGameMapper } from "../../Repositories/DataMappers/SlippiGameMapper";
import { GetGamesByTagResponse } from "../../UseCases/GetGamesByTag/GetGamesByTagResponse";

export function createGameRouter(db: Connection): Router {
    const GameRouter = Router();

    const gamesMapper = new SlippiGameMapper();
    const gamesRepository = new MongoDbSlippiGameRepository(db, gamesMapper);
    const getGamesByTagUseCase = new GetGamesByTag(gamesRepository);

    GameRouter.get('/:tag', (req, res) => {
        const tag = req.params.tag.replace('-', '#');
        
        getGamesByTagUseCase.execute({ playerTag: tag }).then((result: GetGamesByTagResponse) => {
            if (result.isLeft()) {
                return res.status(500).json({ errors: [result.value.message] });
            }

            const games = result.value.getValue();
            return res.json(games.map(game => gamesMapper.toPersistence(game)));
        });
    });

    return GameRouter;
}

