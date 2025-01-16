const { Router } = require("express");
const mainRouter = Router();

mainRouter.get("/", (req, res) => res.render("index"));

module.exports = mainRouter;
