const Item = require("../model/Item");
const Order = require("../model/Order");
const User = require("../model/User");
module.exports.addItem = async (req, res) => {
  const { name, category, availableAt } = req.body;

  let response = { success: false, message: "" };

  if (!name) {
    response.message = "Item name is required";
    return res.status(200).send(response);
  }
  if (!category) {
    response.message = "Item category is required";
    return res.status(200).send(response);
  }
  if (!availableAt) {
    response.message = "Atleast one location is required";
    return res.status(200).send(response);
  } else if (availableAt.length == 0) {
    response.message = "Atleast one location is required";
    return res.status(200).send(response);
  }

  const newItem = new Item({
    name,
    category,
    availableAt: [],
  });

  if (availableAt) {
    availableAt.forEach((element) => {
      let newAvailableAt = {
        address: element.address,
        location: {
          type: "Point",
          coordinates: [element.coordinates[0], element.coordinates[1]],
        },
      };
      newItem.availableAt.push(newAvailableAt);
    });
  }

  newItem.save((err, result) => {
    if (err) {
      response.message = err;
      res.status(200).send(response);
    } else {
      response.success = true;
      response.message = "Item Created Successfully";
      res.status(201).send(response);
    }
  });
};

module.exports.viewDeliveryPersons = (req, res) => {
  let response = { success: false };

  User.find({ userType: "Delivery Person" })
    .select("contact")
    .then((result) => {
      response.success = true;
      response.data = result;
      res.status(200).send(response);
    })
    .catch((err) => {
      response.message = err;
      res.status(400).send(response);
    });
};

module.exports.viewOrders = async (req, res) => {
  let response = { success: false };
  const orderStatus = req.query.status;
  console.log(req.query.status);
  searchQuery = {};
  if (orderStatus) {
    searchQuery.stage = orderStatus;
  }
  await Order.find(searchQuery)
    .then((result) => {
      response.success = true;
      response.data = result;
      res.status(200).send(response);
    })
    .catch((err) => {
      response.message = err;
      res.status(400).send(response);
    });
};

module.exports.assignOrder = async (req, res) => {
  const { orderId, deliveryPerson } = req.body;
  let response = { success: false };

  const deliveryPersonData = await User.findOne({ _id: deliveryPerson }).select("userType");

  if(!deliveryPersonData){
    response.message = "User not Found";
    return res.status(200).send(response);
  }

  if (deliveryPersonData.userType != "Delivery Person") {
    response.message = "Invalid User Type";
    return res.status(200).send(response);
  }

  await Order.findOneAndUpdate(
    { _id: orderId },
    { deliveryPerson },
    {
      new: true,
    }
  ).then((result) => {
    console.log(result);
    response.success = true;
    response.message = "Order Assigned Successfully";
    res.status(200).send(response);
  })
  .catch((err) => {
    response.message = err;
    res.status(400).send(response);
  });
};
