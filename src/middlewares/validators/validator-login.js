const { body, validationResult } = require("express-validator");
const validationRules = () => {
  return [
    body("nama").notEmpty().withMessage("Tidak Boleh Kosong").trim().escape(),
    body("email").notEmpty().withMessage("Tidak Boleh Kosong").trim().escape().isEmail(),
    body("username").notEmpty().withMessage("Tidak Boleh Kosong").trim().escape(),
    body("password").notEmpty().withMessage("Tidak Boleh Kosong").trim().escape().isLength({ min: 8, max: 8 }),
  ];
};

const validationRulesLogin = () => {
  return [body("username").notEmpty().withMessage("Tidak Boleh Kosong").trim().escape(), body("password").notEmpty().withMessage("Tidak Boleh Kosong").trim().escape()];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  validationRules,
  validationRulesLogin,
  validate,
};
