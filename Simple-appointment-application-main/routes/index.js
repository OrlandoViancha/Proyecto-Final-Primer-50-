const express = require("express");
const session = require("express-session");
const router = express.Router();
router.use(
  session({
    secret: "123456789",
    resave: true,
    saveUninitialized: true,
  })
);

const { getIndex, getLogout } = require("../controllers/controller_index");

router.get("/", getIndex);
router.get("/logout", getLogout);

module.exports = router;
