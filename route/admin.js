const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin')
const middlewares = require('../config/middleswares')

router.post('/addItem',middlewares.checkRole('Admin'),adminController.addItem)

router.post('/assignOrder',middlewares.checkRole('Admin'),adminController.assignOrder)


router.get('/deliveryPerson',middlewares.checkRole('Admin'),adminController.viewDeliveryPersons)

router.get('/orders',middlewares.checkRole('Admin'),adminController.viewOrders)


module.exports  = router