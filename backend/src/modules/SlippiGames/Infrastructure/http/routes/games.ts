import { Router } from "express";
import { Connection } from 'mongoose';
import { GetGamesByTag } from "../../../UseCases/GameMatches/GetGamesByTag/GetGamesByTag";
import { MongoDbSlippiGameRepository } from "../../../Repositories/Implementations/MongoDbSlippiGameRepository";
import { SlippiGameMapper } from "../../../DataMappers/SlippiGameMapper";

export function createGameRouter(db: Connection): Router {
    const GameRouter = Router();

    const gamesMapper = new SlippiGameMapper();
    const gamesRepository = new MongoDbSlippiGameRepository(db, gamesMapper);
    const getGamesByTagUseCase = new GetGamesByTag(gamesRepository);

    GameRouter.get('/:tag', (req, res) => {
        getGamesByTagUseCase.execute({ playerTag: req.params.tag }).then(games => {
            return res.json(games.map(game => game.getID()));
        }).catch((err: Error) => {
            return res.status(500).json({ errors: [err.message] });
        });
    });

    return GameRouter;
}

