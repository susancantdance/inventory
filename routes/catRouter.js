const { Router } = require("express");
const catRouter = Router();
const catController = require("../controllers/catController");

catRouter.get("/", catController.catReadGet);

catRouter.get("/create", catController.catCreateGet);

catRouter.post("/create", catController.catCreatePost);

catRouter.get("/update", catController.catUpdateGet);

catRouter.post("/update", catController.catUpdatePost);

catRouter.post("/delete", catController.catDeletePost);

module.exports = catRouter;
