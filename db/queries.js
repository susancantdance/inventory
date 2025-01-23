const pool = require("./pool.js");

async function getCelebs() {
  const celebs = await pool.query("SELECT * FROM celebrity");
  console.log(celebs.rows);
  return celebs.rows;
}

async function addCeleb(celeb) {
  //what hapoens when celebrity exists already
  await pool.query("INSERT INTO celebrity (name) VALUES ($1)", [celeb]);
}

async function getCelebCats() {
  const { rows } = await pool.query(
    "SELECT celeb_id, celeb_name, cat_id, name AS cat_name, breed FROM cat JOIN ( SELECT celebrity.id AS celeb_id, name AS celeb_name, cat_id FROM celebrity JOIN owner_cat ON celebrity.id = celeb_id) AS celeb2 ON cat.id = cat_id"
  );
  console.log(rows);
  return rows;
}

async function getCelebDetail(celeb_name) {
  const { rows } = await pool.query(
    "SELECT cat.name AS cat_name FROM cat JOIN (SELECT * FROM (SELECT celeb_id, celebrity.name, cat_id FROM owner_cat JOIN celebrity ON celebrity.id = owner_cat.celeb_id) AS subtable WHERE name=$1) AS OwnerTable ON cat_id = cat.id",
    [celeb_name]
  );
  console.log(rows);
  return rows;
}

async function deleteCeleb(celeb_name) {
  await pool.query("DELETE FROM celebrity WHERE name = $1", [celeb_name]);
}

async function getCats() {
  const { rows } = await pool.query("SELECT * FROM cat");
  console.log(rows);
  return rows;
}

async function addCat(cat, breed = "unknown") {
  await pool.query("INSERT INTO cat (name, breed) VALUES ($1,$2)", [
    cat,
    breed,
  ]);
}

async function addRelation(celeb, cat) {
  const celeb_id = await pool.query("SELECT id FROM celebrity WHERE name=$1", [
    celeb,
  ]);
  const cat_id = await pool.query("SELECT id FROM cat WHERE name=$1", [cat]);
  console.log(celeb_id.rows[0].id);
  console.log(cat_id.rows[0].id);

  await pool.query("INSERT INTO owner_cat (celeb_id, cat_id) VALUES ($1,$2)", [
    celeb_id.rows[0].id,
    cat_id.rows[0].id,
  ]);
  // await pool.query(
  //   "INSERT INTO owner_cat (celeb_id, cat_id) VALUES ((SELECT id FROM celebrity WHERE name=($1))),(SELECT id FROM cat WHERE name=($2)))",
  //   [celeb, cat]
  // );
}

async function getCatDetail(cat_name) {
  const { rows } = await pool.query(
    "SELECT celebrity.name AS name FROM celebrity JOIN (SELECT * FROM (SELECT cat_id, cat.name, celeb_id FROM owner_cat JOIN cat ON cat.id = owner_cat.cat_id) AS subtable WHERE name=$1) AS CatTable ON celeb_id = celebrity.id",
    [cat_name]
  );
  console.log(rows);
  return rows;
}

async function updateCat(oldName, newName) {
  await pool.query("UPDATE cat SET name = $2 WHERE name = $1", [
    oldName,
    newName,
  ]);
}

async function deleteCat(catname) {
  await pool.query(
    "DELETE FROM owner_cat where cat_id IN (SELECT id from cat WHERE name = $1)",
    [catname]
  );
  await pool.query("DELETE FROM cat WHERE name = $1", [catname]);
}

async function getBreeds() {
  const { rows } = await pool.query("SELECT * FROM breed");
  return rows;
}

async function addBreed(breed) {
  await pool.query("INSERT INTO breed (breed) VALUES ($1)", [breed]);
}

module.exports = {
  getCelebs,
  getCelebCats,
  addCeleb,
  getCelebDetail,
  deleteCeleb,
  getCats,
  addCat,
  getCatDetail,
  updateCat,
  deleteCat,
  addRelation,
  getBreeds,
  addBreed,
};
