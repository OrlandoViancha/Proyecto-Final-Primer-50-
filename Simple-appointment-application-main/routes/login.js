const express = require("express");
const session = require("express-session");
const route = express.Router();
const bodyParser = require("body-parser");
route.use(bodyParser.urlencoded({ extended: true }));
const { getLogin, Logged } = require("../controllers/controller_login");

route.use(
  session({
    secret: "123456789",
    resave: true,
    saveUninitialized: true,
  })
);

route.get("/", getLogin);

route.post("/", Logged);

module.exports = route;
