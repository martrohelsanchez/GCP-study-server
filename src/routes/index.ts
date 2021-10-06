import { Router, Request, Response, NextFunction } from "express";

const router = Router();

async function getQuestions(req: Request, res: Response, next: NextFunction) {
    return res.json("asdfsadfsadfsadfasdf");
}

router.get("/hello", getQuestions);

export default router;
