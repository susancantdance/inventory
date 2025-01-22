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

async function catDetailGet(req, res) {
  res.send(`This is detail page for ${req.params.catname}`);
}

async function catUpdateGet(req, res) {
  res.send("hi");
}

async function catUpdatePost(req, res) {
  //   console.log(`new name ${req.body.newname}`);
  await db.updateCat(req.body.oldname, req.body.newname);
  res.redirect("/celebs/" + req.body.celeb_name + "/celeb_detail");
}

async function catDeletePost(req, res) {
  console.log(`params ${req.params.catname}`);
  await db.deleteCat(req.params.catname);
  //if there are no cats left for that celebrity, remove the celebrity too
  const cats_owned = await db.getCelebDetail(req.body.celeb_name);
  if (cats_owned.length == 0) {
    await db.deleteCeleb(req.body.celeb_name);
    res.redirect("/celebs");
  } else {
    res.redirect("/celebs/" + req.body.celeb_name + "/celeb_detail");
  }
}

module.exports = {
  catReadGet,
  catCreatePost,
  catCreateGet,
  catDetailGet,
  catUpdateGet,
  catUpdatePost,
  catDeletePost,
};
