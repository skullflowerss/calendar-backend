const express = require("express");
const { dbConnection } = require("./db/config");
const cors = require("cors");
require("dotenv").config();

//express server
const app = express();
const port = process.env.PORT;

dbConnection();

//cors
app.use(cors());

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

app.use(express.json());

//Auth - create, login, renew
app.use("/api/auth", require("./routes/auth"));

//CRUD: events
app.use("/api/events", require("./routes/events"));

app.use(express.static("public"));
