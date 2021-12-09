const { verify } = require("jsonwebtoken");
const User = require("../model/User");
const Order = require("../model/Order");

module.exports.createOrder = async (req, res) => {
  const { items } = req.body;
  let response = { success: false, message: "" };

  if (items) {
    if (items.length == 0) {
      response.message = "Please add some items";
      return res.status(200).send(response);
    }
  } else {
    response.message = "Please add some items";
    return res.status(200).send(response);
  }
  let itemList = []
  items.forEach(element => {
     let newItem = {
         item:element.item,
         quantity:element.quantity
     } 
     itemList.push(newItem)
  });

  let newOrder = new Order({
    customer: req.userId,
    items: itemList,
  });
  
  newOrder.save((err,result)=>{
      if(err){
        response.message = err;
        res.status(400).send(response);
      } else{
        response.message = "Order Created Successfully";
        response.success = true;
        // console.log(result._id);
        res.status(201).send(response);
      }
  })
};
