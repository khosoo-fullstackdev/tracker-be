const userRouter = require("express").Router();
const {
  addUser,
  getUser,
  currencySelect,
  balanceSet,
} = require("../service/user-service");

userRouter.post("/signup", async (req, res) => {
  const newUserData = req.body;
  const result = await addUser(newUserData);
  res.json(result);
});

userRouter.post("/signin", async (req, res) => {
  const userData = req.body;
  const result = await getUser(userData);
  res.json(result);
  console.log("aaaaa", result);
});

userRouter.post("/currency-set", async (req, res) => {
  const newUserData = req.body;
  const result = await currencySelect(newUserData);
  if (result["rowCount"]) {
    return res.status(200).send({ message: "success" });
  } else {
    return res.status(500).send({ message: "failed" });
  }
});
userRouter.post("/balance-set", async (req, res) => {
  const newUserData = req.body;
  const result = await balanceSet(newUserData);
  if (result["rowCount"]) {
    return res.status(200).send({ message: "success" });
  } else {
    return res.status(500).send({ message: "failed" });
  }
});

module.exports = {
  userRouter,
};
