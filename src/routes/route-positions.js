const router = require("express").Router();
const controller = require("../controllers/controller-positions");
const tokenChecker = require("../middlewares/token-checker");

router.get("/", tokenChecker, controller.ambilData);
router.get("/:id", tokenChecker, controller.ambilDataByID);
module.exports = router;
