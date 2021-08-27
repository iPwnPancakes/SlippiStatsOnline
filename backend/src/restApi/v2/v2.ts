import { Connection } from 'mongoose';
import { Router } from "express";
import { createSlippiGameRouter } from "./routes/SlippiGameRouter";
import { createDiagnosticsRouter } from "./routes/DiagnosticsRouter";

export const v2 = (db: Connection): Router => {
    const routes = Router();

    routes.use('/games', createSlippiGameRouter(db));
    routes.use('/server', createDiagnosticsRouter());

    return routes;
}
