import { CloudTasksClient } from "@google-cloud/tasks";
import { Router, Response, Request } from "express";

const router = Router();
const client = new CloudTasksClient();

async function root(req: Request, res: Response) {
    return res.send("<p>hello tasks</p>");
}

async function exampleTask(req: Request, res: Response) {
    return res.send("<p>example task queue</p>");
}

async function create(req: Request, res: Response) {
    const project = "vaulted-harbor-311010";
    const location = "asia-southeast2";
    const queue = "first-task-que";
    const url = "/tasks/example-task";
    const payload = { data: "this is a payload po" };
    const serviceAccountEmail =
        "vaulted-harbor-311010@appspot.gserviceaccount.com";

    const parent = client.queuePath(project, location, queue);

    const task: any = {
        httpRequest: {
            httpMethod: "POST",
            url,
        },
        oidcToken: {
            serviceAccountEmail,
        },
    };

    if (payload) {
        task.httpRequest.body = Buffer.from(JSON.stringify(payload)).toString(
            "base64",
        );
    }

    // if (inSeconds) {
    //     // The time when the task is scheduled to be attempted.
    //     task.scheduleTime = {
    //         seconds: inSeconds + Date.now() / 1000,
    //     };
    // }

    // Send create task request.
    console.log("Sending task:");
    console.log(task);
    const request = { parent: parent, task: task };
    const [response] = await client.createTask(request);
    console.log(`Created task ${response.name}`);

    return res.json(response);
}

router.get("/", root);
router.get("/create", create);
router.post("/example-task", exampleTask);

export default router;
