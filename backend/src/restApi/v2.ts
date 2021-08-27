import { Connection } from 'mongoose';
import { Router } from "express";
import { createGameRouter } from "./routes/games";
import { createDiagnosticsRoutes } from "./routes/Diagnostics";

export const v2 = (db: Connection): Router => {
    const routes = Router();

    routes.use('/games', createGameRouter(db));
    routes.use('/server', createDiagnosticsRoutes());

    return routes;
}
