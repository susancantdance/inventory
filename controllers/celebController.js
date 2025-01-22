const db = require("../db/queries");
const { catCreatePost } = require("./catController");

async function celebReadGet(req, res) {
  const celebs = await db.getCelebCats();
  const celebMap = new Map();

  celebs.forEach((row) => {
    let catArray = [];
    if (celebMap.get(row.celeb_name) == undefined) {
      celebMap.set(row.celeb_name, catArray);
    } else {
      catArray = celebMap.get(row.celeb_name).slice();
    }
    const cat = { name: row.cat_name, breed: row.breed };
    catArray.push(cat);
    celebMap.set(row.celeb_name, catArray);
  });

  res.render("celebs", { celebs: celebMap });
}

async function celebCreateGet(req, res) {
  const cats = await db.getCats();
  const breeds = await db.getBreeds();
  res.render("create_celeb", { cats: cats, breeds: breeds });
}

async function celebCreatePost(req, res) {
  const values = req.body;
  await db.addCeleb(values.name);
  await db.addCat(values.newcat, values.breed);
  await db.addRelation(values.name, values.newcat);

  res.redirect("/celebs");
}

async function celebUpdateGet(req, res) {
  res.send("hi");
}

async function celebUpdatePost(req, res) {
  res.send("hi");
}

async function celebDeletePost(req, res) {
  res.send("hi");
}

module.exports = {
  celebReadGet,
  celebCreatePost,
  celebCreateGet,
  celebUpdateGet,
  celebUpdatePost,
  celebDeletePost,
};
