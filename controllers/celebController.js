const db = require("../db/queries");

async function celebReadGet(req, res) {
  const celebs = await db.getCelebs();
  res.render("celebs", { celebs: celebs });
}

async function celebCreateGet(req, res) {
  res.send("hi");
}

async function celebCreatePost(req, res) {
  res.send("hi");
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
