require("dotenv").config();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const express = require('express')

const initMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));

  app.use(logger("dev"));

  app.use(cookieParser())
};

module.exports = initMiddleware;