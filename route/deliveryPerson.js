const express = require("express");
const router = express.Router();
const middlewares = require('../config/middleswares')
const deliveryPersonController = require('../controller/deliveryPerson')
const adminController = require('../controller/admin')

router.post('/changeStage',middlewares.checkRole('Delivery Person'),deliveryPersonController.changeOrderStage)

router.get('/orders',middlewares.checkRole('Delivery Person'),adminController.viewOrders)


module.exports  = router