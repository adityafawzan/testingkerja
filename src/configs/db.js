const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: process.env.MULTIPLESTATEMENTS,
};
