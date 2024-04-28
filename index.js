require("dotenv").config();
const characterRouter = require("./src/api/routes/character");
const { connectDB } = require("./src/config/db");
const express = require("express");

const app = express();
connectDB();

app.use("/api/v1/characters", characterRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})