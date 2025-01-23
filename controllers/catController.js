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
  await db.addCat(req.body.name, req.body.breed);
  await db.addRelation(req.body.celeb_name, req.body.name);
  res.redirect("/celebs/" + req.body.celeb_name + "/celeb_detail");
}

async function catDetailGet(req, res) {
  const owners = await db.getCatDetail(req.params.catname);
  res.render("cat_detail", { cat: req.params.catname, owners: owners });
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
