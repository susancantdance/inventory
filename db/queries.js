const pool = require("./pool.js");

async function getCelebs() {
  const celebs = await pool.query("SELECT * FROM celebrity");
  console.log(celebs.rows);
  return celebs.rows;
}

async function addCeleb(celeb) {
  await pool.query("INSERT INTO celebrity (name) VALUES ($1)", [celeb]);
}

async function getCelebCats() {
  const { rows } = await pool.query(
    "SELECT celeb_name, name AS cat_name, breed FROM cat JOIN ( SELECT name AS celeb_name, cat_id FROM celebrity JOIN owner_cat ON celebrity.id = celeb_id) AS celeb2 ON cat.id = cat_id"
  );
  console.log(rows);
  return rows;
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

  await pool.query("INSERT INTO owner_cat (celeb_id, cat_id) VALUES ($1,$2)", [
    celeb_id.rows[0].id,
    cat_id.rows[0].id,
  ]);
  // await pool.query(
  //   "INSERT INTO owner_cat (celeb_id, cat_id) VALUES ((SELECT id FROM celebrity WHERE name=($1))),(SELECT id FROM cat WHERE name=($2)))",
  //   [celeb, cat]
  // );
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
  getCats,
  addCat,
  addRelation,
  getBreeds,
  addBreed,
};
