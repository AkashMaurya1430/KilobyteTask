const { sign, verify } = require("jsonwebtoken");
const User = require("../model/User");

module.exports.checkRole = function (userType) {
  return (req, res, next) => {
    const authorization = req.header("token");
    let userId;
    let response = { success: false, message: "" };

    // console.log(authorization , "Server token")
    if (!authorization) {
      response.message = "Not authorized";
      return res.status(401).send(response);
    }
    try {
      const token = authorization.split(" ")[1];
      verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) throw err;
        userId = decoded.userId;
      });
      User.findOne({ _id: userId }).then((result) => {
        if (result.userType != userType) {
          response.message = "User Not Authorized";
          return res.status(401).send(response);
        }
        req.userId = userId;
        return next();
      });
    } catch (err) {
      console.log(err);
      response.message = "Not authenticated";
      return res.status(401).send(response);
    }
  };
};
