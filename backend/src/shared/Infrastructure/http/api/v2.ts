import { Connection } from 'mongoose';
import { Router } from "express";
import { createGameRouter } from "../../../../modules/SlippiGames/Infrastructure/http/routes/games";

export const v2 = (db: Connection): Router => {
    const routes = Router();

    routes.use('/games', createGameRouter(db));

    return routes;
}
