const express = require("express");
require("dotenv").config();
const app = express();
const router = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const { createTable } = require("./service/table/create-table");
const { updateTable } = require("./service/table/update-table");
const { dropTable } = require("./service/table/drop-table");
const { signin } = require("./service/users/signin");
const { signup } = require("./service/users/signup");
const { balance } = require("./service/users/balance");
const { currency } = require("./service/users/currency-select");

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
