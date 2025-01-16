const { Router } = require("express");
const breedRouter = Router();
const breedController = require("../controllers/breedController");

breedRouter.get("/", breedController.breedReadGet);

breedRouter.get("/create", breedController.breedCreateGet);

breedRouter.post("/create", breedController.breedCreatePost);

breedRouter.get("/update", breedController.breedUpdateGet);

breedRouter.post("/update", breedController.breedUpdatePost);

breedRouter.post("/delete", breedController.breedDeletePost);

module.exports = breedRouter;
