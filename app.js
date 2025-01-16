const express = require("express");
const app = express();
const path = require("node:path");
const mainRouter = require("./routes/mainRouter");
const catRouter = require("./routes/catRouter");
const breedRouter = require("./routes/breedRouter");
const celebRouter = require("./routes/celebRouter");
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.get("/", (req, res) => res.send("App is up"));
app.use("/", mainRouter);
app.use("/celebs", celebRouter);
app.use("/breeds", breedRouter);
app.use("/cats", catRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Inventory app - listening on port ${PORT}!`);
});
