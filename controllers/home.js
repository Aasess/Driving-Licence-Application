//fake-data
const blogs = require("../fake-data/blogs.json");

module.exports = (req, res) => {
  res.render("index", { blogs });
};
