import mongoose from "mongoose";
import connectToDB from "../src/config/db.js";
import Product from "../src/models/product.model.js";

const sampleProducts = [
  {
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI.",
    price: { amount: 799, currency: "INR" },
  },
  {
    title: "Mechanical Keyboard",
    description: "Compact mechanical keyboard with tactile switches.",
    price: { amount: 2499, currency: "INR" },
  },
  {
    title: "USB-C Hub",
    description: "Multiport USB-C hub with HDMI and USB 3.0 ports.",
    price: { amount: 1799, currency: "INR" },
  },
  {
    title: "Noise-Cancelling Headphones",
    description: "Over-ear headphones with active noise cancellation.",
    price: { amount: 5999, currency: "INR" },
  },
  {
    title: "Portable Bluetooth Speaker",
    description: "Water-resistant portable speaker with rich stereo sound.",
    price: { amount: 2199, currency: "INR" },
  },
  {
    title: "Laptop Stand",
    description: "Adjustable aluminum stand for improved desk ergonomics.",
    price: { amount: 1299, currency: "INR" },
  },
  {
    title: "1080p Webcam",
    description: "Full HD webcam with built-in microphone and privacy cover.",
    price: { amount: 1999, currency: "INR" },
  },
  {
    title: "Fast Charging Power Bank",
    description: "20,000 mAh power bank with USB-C fast charging.",
    price: { amount: 2499, currency: "INR" },
  },
  {
    title: "Smart LED Desk Lamp",
    description: "Dimmable LED desk lamp with adjustable color temperature.",
    price: { amount: 1599, currency: "INR" },
  },
  {
    title: "External SSD",
    description: "Compact 1 TB external solid-state drive.",
    price: { amount: 7499, currency: "INR" },
  },
];

try {
  await connectToDB();
  const products = await Product.insertMany(sampleProducts);
  console.log(`Inserted ${products.length} sample products.`);
} catch (error) {
  console.error("Failed to seed products:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
