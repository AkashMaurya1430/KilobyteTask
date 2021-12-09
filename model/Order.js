const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    items: [
      {
        _id:false,
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required:true
        },
        quantity:{
          type:Number,
          required:true,
          min:1,
          default:1
        }
      },
    ],
    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stage: {
      type: String,
      required: true,
      enum: ["Task Created", "Reached Store", "Items Picked", "Enroute", "Delivered", "Canceled"],
      default:"Task Created"
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupLoc: {
      _id:false,
      address: {
        type: String,
        // required: true,
      },
      location: {
        type: { type: String, enum: ["Point"] },
        coordinates: {
          type: [Number],
          index: "2dsphere",
        },
      },
    },
  },
  { timestamps: true }
);

orderSchema.pre('save',function(next){
  this.populate('items.item').then((result)=>{
    console.log(result.items[0].item.availableAt[0]);
    this.pickupLoc = result.items[0].item.availableAt[0]
    next();
  })
})

module.exports = mongoose.model('Order',orderSchema);
