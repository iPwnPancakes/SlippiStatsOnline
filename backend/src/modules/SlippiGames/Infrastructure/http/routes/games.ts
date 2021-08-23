import { Router } from "express";
import { Connection } from 'mongoose';
import { GetGamesByTag } from "../../../UseCases/GameMatches/GetGamesByTag/GetGamesByTag";
import { MongoDbSlippiGameRepository } from "../../../Repositories/Implementations/MongoDbSlippiGameRepository";

export function createGameRouter(db: Connection): Router {
    const GameRouter = Router();

    const gamesRepository = new MongoDbSlippiGameRepository(db);
    const getGamesByTagUseCase = new GetGamesByTag(gamesRepository);

    GameRouter.get('/:tag', (req, res) => {
        const games = getGamesByTagUseCase.execute({ playerTag: req.params.tag });

        return games.map(game => game.getID());
    });

    return GameRouter;
}

