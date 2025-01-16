const { Router } = require("express");
const celebRouter = Router();
const celebController = require("../controllers/celebController");

celebRouter.get("/", celebController.celebReadGet);

celebRouter.get("/create", celebController.celebCreateGet);

celebRouter.post("/create", celebController.celebCreatePost);

celebRouter.get("/update", celebController.celebUpdateGet);

celebRouter.post("/update", celebController.celebUpdatePost);

celebRouter.post("/delete", celebController.celebDeletePost);

module.exports = celebRouter;
