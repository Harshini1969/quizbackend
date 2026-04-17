require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");

let AuthRoutes = require("./Routes/AuthRoutes");
let AdminRoutes = require("./Routes/AdminRoutes");
let StudentRoutes = require("./Routes/StudentRoutes");
let TrainerRoutes = require("./Routes/TrainerRoutes");

let app = express();
connection();

app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/admin", AdminRoutes);
app.use("/student", StudentRoutes);
app.use("/trainer", TrainerRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});