const express = require("express");
const initDB = require("./config/initDb");
const initMiddleware = require('./config/initMiddleware')
const initRoutes = require('./route/index')
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require('cookie-parser');
const app = express();

// Initialize Db
initDB()

// Initialize Middlewares
initMiddleware(app);

// Initialize Routes
initRoutes(app)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
