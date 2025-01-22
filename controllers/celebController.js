const db = require("../db/queries");
const { catCreatePost } = require("./catController");

async function celebReadGet(req, res) {
  const celebs = await db.getCelebCats();
  const celebMap = new Map();

  celebs.forEach((row) => {
    let catArray = [];
    console.log(row.celeb_name);
    console.log(catArray);
    if (celebMap.get(row.celeb_name) == undefined) {
      celebMap.set(row.celeb_name, catArray);
    } else {
      catArray = celebMap.get(row.celeb_name).slice();
    }
    const cat = { id: row.cat_id, name: row.cat_name, breed: row.breed };
    catArray.push(cat);
    celebMap.set(row.celeb_name, catArray);
  });

  res.render("celebs", { celebs: celebMap });
}

async function celebCreateGet(req, res) {
  const breeds = await db.getBreeds();
  res.render("create_celeb", { breeds: breeds });
}

async function celebCreatePost(req, res) {
  const values = req.body;
  await db.addCeleb(values.name);
  await db.addCat(values.newcat, values.breed);
  await db.addRelation(values.name, values.newcat);

  res.redirect("/celebs");
}

async function celebDetailGet(req, res) {
  const cats_owned = await db.getCelebDetail(req.params.celebname);
  res.render("celeb_detail", {
    cats_owned: cats_owned,
    celeb_name: req.params.celebname,
  });
  //   res.send(
  //     `here is the detail about ${req.params.celebname}: ${cats_owned[0].cat_name}`
  //   );
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
  celebDetailGet,
  celebUpdateGet,
  celebUpdatePost,
  celebDeletePost,
};
