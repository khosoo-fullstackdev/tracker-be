const tableRouter = require("express").Router();

const {
  dropTable,
  createTable,
  updateTable,
  dropUsers,
} = require("../service/table-service");

tableRouter.post("/createTable", async (req, res) => {
  const result = await createTable();
  res.json(result);
});

tableRouter.post("/updateTable", async (req, res) => {
  const result = await updateTable();
  res.json(result);
});

tableRouter.post("/dropTable", async (req, res) => {
  const result = await dropTable();
  res.json(result);
});

tableRouter.post("/dropUsers", async (req, res) => {
  console.log(req.body);
  const userName = req.body;

  const result = await dropUsers(userName);
  res.json(result);
});

module.exports = {
  tableRouter,
};
