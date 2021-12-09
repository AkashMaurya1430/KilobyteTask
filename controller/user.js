const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sign } = require("jsonwebtoken");

module.exports.signup = (req, res) => {
  const { contact, password, userType } = req.body;
  let response = { success: false, message: "" };

  if (contact.length != 10) {
    response.message = "Invalid Contact";
    res.status(200).send(response);
    return;
  }

  bcrypt.hash(password, saltRounds, function (err, hash) {
    let newUser = new User({
      contact,
      userType,
      password: hash,
    });

    newUser.save((err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          response.message = "User Alredy Exist";
          res.status(200).send(response);
        } else {
          response.message = err;
          res.status(400).send(response);
        }
      } else {
        response.message = "User Created Successfully";
        response.success = true;
        // console.log(result._id);
        res.status(201).send(response);
      }
    });
  });
};

module.exports.login = (req, res) => {
  const { contact, password } = req.body;
  let response = { success: false, message: "" };

  // try {
    User.findOne({ contact: contact }, function (err, user) {
      if (!user) {
        response.message = "User Does not Exist";
        res.status(200).send(response);
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          response.success = true;
          response.message = "Login successfull";
          response.token = generateToken(user._id);
          res.status(200).send(response);
        } else {
          response.message = "Incorrect Password";
          res.status(200).send(response);
        }
      }
    });
  // } catch (error) {
  //   console.log(error);
  //   response.message = error;
  //   res.status(400).send(response);
  // }
};

function generateToken(userId) {
  return sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET);
}
