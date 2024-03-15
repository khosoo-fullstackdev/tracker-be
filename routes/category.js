const categoryRouter = require("express").Router();

const { getCategory, addCategory } = require("../service/category-service.js");

categoryRouter.post("/getCategory", async (req, res) => {
  const result = await getCategory();

  res.json(result);
});

categoryRouter.post("/addCategory", async (req, res) => {
  const category = req.body;
  const result = await addCategory(category);
  res.json(result);
});

module.exports = {
  categoryRouter,
};
