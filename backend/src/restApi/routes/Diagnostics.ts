import { Router } from "express";

export function createDiagnosticsRoutes(): Router {
    let router = Router();

    router.get('/isUp', (req, res) => {
        res.status(200).end();
    });

    return router;
}
