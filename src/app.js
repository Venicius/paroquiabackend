const express = require("express");
const cors = require("cors");
const { authRoutes, uauthRoutes } = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/au", authRoutes);
app.use("/uau", uauthRoutes);

module.exports = app;
