const Order = require("../model/Order");

module.exports.changeOrderStage = async (req, res) => {
  const { orderId, stage } = req.body;
  let response = { success: false };

  await Order.findOneAndUpdate({ _id: orderId }, { stage }, { new: true })
    .then((result) => {
      console.log(result);
      response.success = true;
      response.message = "Order Stage Changed Successfully";
      res.status(200).send(response);
    })
    .catch((err) => {
      response.message = err;
      res.status(400).send(response);
    });
};
