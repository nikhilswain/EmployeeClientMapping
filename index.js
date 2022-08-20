const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logger = require("morgan");
const db = require("./models");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes...
require("./routes/client.routes")(app);
require("./routes/employee.routes")(app);
require("./routes/map.routes")(app);
require("./routes/timesheet.routes")(app);

// cors setting
const corsOption = {
  origin: "http://localhost:8080/",
};
app.use(cors(corsOption));
app.use(logger("dev"));
// for production maybe existing table needed to be droped
// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Drop and re-sync db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db:" + err.message);
//   });

// for local env.
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.send({ msg: "zerotwo is in the franxx" });
});

// zerotwo4qm3i835l6w258yn luffgear4
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
