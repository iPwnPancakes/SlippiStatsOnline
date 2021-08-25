import { Connection } from 'mongoose';
import { Router } from "express";
import { createGameRouter } from "../../../../modules/SlippiGames/Infrastructure/http/routes/games";
import { createDiagnosticsRoutes } from "../../../../modules/ServerDiagnostics/Infrastructure/http/routes/Diagnostics";

export const v2 = (db: Connection): Router => {
    const routes = Router();

    routes.use('/games', createGameRouter(db));
    routes.use('/server', createDiagnosticsRoutes());

    return routes;
}
