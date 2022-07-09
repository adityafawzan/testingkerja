const dbConfig = require("../configs/db");
const jwtConfig = require("../configs/jwt");
const mysql = require("mysql");
const pool = mysql.createPool(dbConfig);
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const sha1 = require("sha1");
const mainTable = "users";

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  login(req, res) {
    let data = {
      username: req.body.username,
      password: sha1(md5(req.body.password)),
    };

    pool.getConnection(function (err, connection) {
      if (err) {
        res.status(500).send({ message: err.message });
        throw err;
      }
      connection.query(`SELECT * FROM ${mainTable} WHERE username = ?;`, [data.username], function (error, results) {
        if (error) {
          res.status(500).send({ message: error.message });
          throw error;
        }
        if (results.length > 0) {
          let user = results[0];
          if (user.password === data.password) {
            var token = jwt.sign({ id: user.id }, jwtConfig.secret, {
              expiresIn: 86400, // 24 jam
            });

            res
              .cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .status(200)
              .send({
                success: true,
                message: "Berhasil Login!",
                id: user.id,
                username: user.username,
                nama: user.nama,
                accessToken: token,
              });
          } else {
            return res.status(401).send({
              success: false,
              message: "Username dan/atau Password Salah!",
              accessToken: null,
            });
          }
        } else {
          return res.status(404).send({
            success: false,
            message: "Username dan/atau Password Salah!",
            accessToken: null,
          });
        }
      });
      connection.release();
    });
  },
};
