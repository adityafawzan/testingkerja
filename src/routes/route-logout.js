const router = require("express").Router();
const controller = require("../controllers/controller-logout");

router.post("/", controller.logout);
module.exports = router;
