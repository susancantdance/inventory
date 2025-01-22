const db = require("../db/queries");

async function catReadGet(req, res) {
  console.log("in the catreadget function");
  const cats = await db.getCats();
  res.render("cats", { cats: cats });
}

async function catCreateGet(req, res) {
  const breeds = await db.getBreeds();
  res.render("create_cat", { breeds: breeds });
}

async function catCreatePost(req, res) {
  const cat = req.body;
  await db.addCat(cat.name, cat.breed);
  res.redirect("/cats");
}

async function catUpdateGet(req, res) {
  res.send("hi");
}

async function catUpdatePost(req, res) {
  res.send("hi");
}

async function catDeletePost(req, res) {
  res.send("hi");
}

module.exports = {
  catReadGet,
  catCreatePost,
  catCreateGet,
  catUpdateGet,
  catUpdatePost,
  catDeletePost,
};
