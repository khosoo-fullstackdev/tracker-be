const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { userRouter } = require("./routes/user.js");
const { tableRouter } = require("./routes/table.js");
const { categoryRouter } = require("./routes/category.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);
app.use(tableRouter);
app.use(categoryRouter);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
