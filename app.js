import express from "express";
import router from "./src/routes.js";

const app = express();
app.use(express.static("public"));
app.use(express.json())

// To serve axios from node module
app.use("/axios", express.static("node_modules/axios/dist"));
app.use("/api/posts", router);

export default app;

