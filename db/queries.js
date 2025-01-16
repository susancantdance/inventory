const pool = require("./pool.js");

async function getCelebs() {
  const { rows } = await pool.query("SELECT * FROM celebrity");
  return rows;
}

async function getCats() {
  const { rows } = await pool.query("SELECT * FROM cat");
  return rows;
}

async function getBreeds() {
  const { rows } = await pool.query("SELECT * FROM breed");
  return rows;
}

module.exports = {
  getCelebs,
  getCats,
  getBreeds,
};
