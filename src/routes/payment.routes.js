import express from "express";
import productModel from "../models/product.model.js";
import razorpayInstance from "../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import {validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils.js"
import config from "../config/config.js";
const router = express.Router();

router.post("/:productId/order", async(req,res) => {
              const {productId} = req.params;
              const product = await productModel.findById(productId);
              if (!product) {
                            return res.status(404).json({message: "Product not found"});
              }
               const order = await razorpayInstance.orders.create({
                            amount:product.price.amount * 100,
                            currency:product.price.currency,
                            receipt: `order_rcptid_${productId}`,
                            notes:{
                                          productId:productId,
                                          productTitle:product.title,
                            }
               })
               const payment=( await paymentModel.create({
                            orderId:order.id,
                            product:productId,
                            amount:product.price.amount,
                            currency:product.price.currency,
                            status:"pending", 
               })).toObject();


               return res.status(201).json({ ...payment, keyId: razorpayInstance.key_id });
})


router.post("/verify", async(req,res) => {

const {orderId, paymentId, signature} = req.body


              const payment = await paymentModel.findOne({
                            orderId:orderId,
                            status:"pending"
              })

              if(!payment){
                            return res.status(404).json({message: "payment not found or already verified"});
              }



              const isValid =  validatePaymentVeriication({
order_id:orderId,
payment_id:paymentId,

              },signature,config.RAZORPAY_KEY_SECRET)

if(!isValid){
                            return res.status(400).json({message: "Invalid payment verification"});
}


await paymentModel.updateOne(
              {orderId:orderId},
              {$set: {status:"completed", paymentId: paymentId, signature:signature}}
)


return res.status(200).json({message:"payment verified successfully"});


})


export default router;







































