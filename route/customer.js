const express = require("express");
const router = express.Router();
const middlewares = require('../config/middleswares')
const customerController = require('../controller/customer')

router.post('/addOrder',middlewares.checkRole('Customer'),customerController.createOrder)

module.exports  = router