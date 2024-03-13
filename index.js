const express = require("express");
require("dotenv").config();
const app = express();
const router = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const { createTable } = require("./routes/table/create-table");
const { updateTable } = require("./routes/table/update-table");
const { dropTable } = require("./routes/table/drop-table");
const { signin } = require("./routes/users/signin");
const { signup } = require("./routes/users/signup");
const { balance } = require("./routes/users/balance");
const { currency } = require("./routes/users/currency-select");

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
