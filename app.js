const express = require("express");
const app = express();
const mainConfig = require("./src/configs/main");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const appRoute = require("./src/routes");
const corsOptions = {
  origin: ["http://dev3.dansmultipro.co.id", "http://localhost:8080"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use("/", appRoute);

app.listen(mainConfig.port || 8080, () => {
  console.log(`Server Berjalan di Port : ${mainConfig.port || 8080}`);
});
