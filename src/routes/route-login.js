const router = require("express").Router();
const controller = require("../controllers/controller-login");
const { validationRules, validationRulesLogin, validate } = require("../middlewares/validators/validator-login");
router.post("/", validationRulesLogin(), validate, controller.login);
module.exports = router;
