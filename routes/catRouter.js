const { Router } = require("express");
const catRouter = Router();
const catController = require("../controllers/catController");

catRouter.get("/", catController.catReadGet);

catRouter.get("/create", catController.catCreateGet);

catRouter.post("/create", catController.catCreatePost);

catRouter.get("/:catname/cat_detail", catController.catDetailGet);

catRouter.get("/:catname/update", catController.catUpdateGet);

catRouter.post("/:catname/update", catController.catUpdatePost);

catRouter.post("/:catname/delete", catController.catDeletePost);

module.exports = catRouter;
