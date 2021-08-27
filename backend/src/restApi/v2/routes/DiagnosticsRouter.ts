import { Router } from "express";

export function createDiagnosticsRouter(): Router {
    let router = Router();

    router.get('/isUp', (req, res) => {
        res.status(200).end();
    });

    return router;
}
