import { Router } from "express";

import tasksQueuesRoute from "./taskQueuesRoute";

const router = Router();

router.use("/tasks", tasksQueuesRoute);

export default router;
