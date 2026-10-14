import Razorpay from "razorpay"
import config from "./config.js"

console.log(
    "Razorpay Key ID loaded:",
    config.RAZORPAY_KEY_ID?.startsWith("rzp_test_")
);

console.log(
    "Razorpay Secret loaded:",
    Boolean(config.RAZORPAY_KEY_SECRET)
);

const razorpayInstance = new Razorpay({
              key_id: config.RAZORPAY_KEY_ID,
              key_secret:config.RAZORPAY_KEY_SECRET,
});

export default razorpayInstance;