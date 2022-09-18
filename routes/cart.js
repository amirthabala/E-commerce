const express = require("express");
const cartQueries = require("../utils/queries/cartQueries");
const app = express.Router();

app.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await cartQueries.getCartItemsByUserId(userId);
    res.json({
      cartItems: result,
      message: "Successfully Fetched Cart Items",
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.sqlMessage ? err.sqlMessage : "Something Went Wrong",
      success: false,
    });
    throw err;
  }
});

app.post("/add", async (req, res) => {
  try {
    await cartQueries.addProduct(req.body);
    res.json({
      message: "Added to Cart",
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.sqlMessage ? err.sqlMessage : "Something Went Wrong",
      success: false,
    });
    throw err;
  }
});

module.exports = app;
