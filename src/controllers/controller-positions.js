const dbConfig = require("../configs/db");
const mysql = require("mysql");
const pool = mysql.createPool(dbConfig);
const mainTable = "positions";

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Ambil semua data
  ambilData(req, res) {
    var limit = "";
    if (req.query.page) {
      page = req.query.page;
      jumlahBarisPerHalaman = 2;
      limit = "LIMIT " + (page - 1) * jumlahBarisPerHalaman + "," + jumlahBarisPerHalaman;
    }

    var description = "";
    if (req.query.description) {
      description = req.query.description;
    }

    var location = "";
    if (req.query.location) {
      location = req.query.location;
    }

    var fulltime = "";
    if (req.query.fulltime) {
      if (req.query.fulltime === "true") {
        fulltime = 1;
      } else if (req.query.fulltime === "false") {
        fulltime = 0;
      }
    }

    pool.getConnection(function (err, connection) {
      if (err) {
        res.status(500).send({ message: err.message });
        throw err;
      }
      connection.query(`SELECT count(*) FROM ${mainTable};`, function (error, rows) {
        if (error) {
          res.status(500).send({ message: error.message });
          throw error;
        } else {
          // pagination SQL
          connection.query(`SELECT * FROM ${mainTable} WHERE description LIKE CONCAT('%',?, '%') AND location LIKE CONCAT('%',?, '%') AND fulltime LIKE CONCAT('%',?, '%') ${limit};`, [description, location, fulltime], function (error, results) {
            if (error) {
              res.status(500).send({ message: error.message });
              throw error;
            }
            res.send({
              success: true,
              message: "Berhasil ambil data!",
              data: results,
            });
          });
        }
      });
      connection.release();
    });
  },
  // Ambil data berdasarkan ID
  ambilDataByID(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) {
        res.status(500).send({ message: err.message });
        throw err;
      }
      connection.query(`SELECT * FROM ${mainTable} WHERE id = ?;`, [id], function (error, results) {
        if (error) {
          res.status(500).send({ message: error.message });
          throw error;
        }
        res.send({
          success: true,
          message: "Berhasil ambil data!",
          data: results,
        });
      });
      connection.release();
    });
  },
};
