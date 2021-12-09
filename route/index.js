const { sign, verify } = require("jsonwebtoken");
const User = require("../model/User");
const userRouter = require('./user')
const adminRouter = require('./admin')
const customerRouter = require('./customer')
const deliveryPersonRouter = require('./deliveryPerson')

function initRoutes(app) {
    app.use('/', userRouter)

    app.use('/admin',adminRouter)

    app.use('/customer',customerRouter)

    app.use('/deliveryPerson',deliveryPersonRouter)

}



module.exports = initRoutes