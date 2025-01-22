const { Router } = require("express");
const celebRouter = Router();
const celebController = require("../controllers/celebController");

celebRouter.get("/", celebController.celebReadGet);

celebRouter.get("/create", celebController.celebCreateGet);

celebRouter.post("/create", celebController.celebCreatePost);

//these need an additional paramater /celeb/::id/update etc
celebRouter.get("/:celebname/celeb_detail", celebController.celebDetailGet);

celebRouter.get("/:celebname/update", celebController.celebUpdateGet);

celebRouter.post("/:celebname/update", celebController.celebUpdatePost);

celebRouter.post("/:celebname/delete", celebController.celebDeletePost);

module.exports = celebRouter;
