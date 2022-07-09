const jwt = require("jsonwebtoken");
const jwt_config = require("../../configs/jwt");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    // CHECK JIKA TOKEN ADA ATAU TIDAK
    if (!token) {
      res.status(401).json({
        errors: [
          {
            msg: "Autentikasi Request Gagal, Tidak Ada Token Ditemukan Dalam Request",
          },
        ],
      });
    } else {
      const user = await jwt.verify(token, jwt_config.secret);
      req.user = user.id;
      next();
    }
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          msg: "Autentikasi Request Gagal, Token Tidak Valid",
        },
      ],
    });
  }
};
