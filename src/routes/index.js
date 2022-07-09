const router = require("express").Router();
const base_path = "/api/recruitment";
const login = require("./route-login");
const logout = require("./route-logout");
const positions = require("./route-positions");

router.get("/", function () {}).use(base_path + "/login", login);
router.get("/", function () {}).use(base_path + "/logout", logout);
router.get("/", function () {}).use(base_path + "/positions", positions);

module.exports = router;
