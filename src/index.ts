import express from "express";
import { createServer } from "http";
import cors from "cors";

import { socketConnect } from "./socket";

import router from "./routes";

const app = express();
const httpServer = createServer(app);

const io = socketConnect(httpServer);

app.use(cors());

app.use("/static", express.static("src/images"));

app.use("/", (req, res) => {
    io.to("mart").emit("hello", "hoysdfa");
    return res.status(200).send("<p>eyyy</p>");
});

const port = process.env.PORT || 5000;

httpServer.listen(port, () =>
    console.log(`The server is running on port ${port}`),
);
