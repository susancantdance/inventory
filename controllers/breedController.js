const db = require("../db/queries");

async function breedReadGet(req, res) {
  const breeds = await db.getBreeds();
  res.render("breeds", { breeds: breeds });
}

async function breedCreateGet(req, res) {
  res.render("create_breed");
}

async function breedCreatePost(req, res) {
  const breed = req.body;
  await db.addBreed(breed.name);
  res.redirect("/breeds");
}

async function breedUpdateGet(req, res) {
  res.send("hi");
}

async function breedUpdatePost(req, res) {
  res.send("hi");
}

async function breedDeletePost(req, res) {
  res.send("hi");
}

module.exports = {
  breedReadGet,
  breedCreatePost,
  breedCreateGet,
  breedUpdateGet,
  breedUpdatePost,
  breedDeletePost,
};
