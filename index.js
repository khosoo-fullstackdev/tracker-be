const express = require("express");
require("dotenv").config();
const app = express();
const router = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const { createTable } = require("./route/table/create-table");
const { updateTable } = require("./route/table/update-table");
const { dropTable } = require("./route/table/drop-table");
const { signin } = require("./route/users/signin");
const { signup } = require("./route/users/signup");
const { balance } = require("./route/users/balance");
const { currency } = require("./route/users/currency-select");

router.post("/create-table", createTable);
router.post("/update-table", updateTable);
router.post("/drop-table", dropTable);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/balance", balance);
router.post("/currency-select", currency);

app.use(router);

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
