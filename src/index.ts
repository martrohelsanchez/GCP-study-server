import express from "express";
import { createServer } from "http";
import cors from "cors";

import { socketConnect } from "./socket";

import routes from "./routes";

const app = express();
const httpServer = createServer(app);

const io = socketConnect(httpServer);

app.use(cors());

app.use("/static", express.static("src/images"));

app.use("/", routes);

const port = process.env.PORT || 5000;

httpServer.listen(port, () =>
    console.log(`The server is running on port ${port}`),
);
