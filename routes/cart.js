const express = require("express");
const setCurrentUser = require("../middleware/auth");
const cartQueries = require("../utils/queries/cartQueries");
const app = express.Router();

app.get("/", setCurrentUser(), async (req, res) => {
	try {
		const { id } = req.user;
		const result = await cartQueries.getCartItemsByUserId(id);
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

app.post("/add", setCurrentUser(), async (req, res) => {
	try {
		await cartQueries.addProduct(req.body, req.user);
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

app.post("/delete", setCurrentUser(), async (req, res) => {
	try {
		await cartQueries.deleteCartItem(req.body);
		res.json({
			message: "Deleted Item from Cart",
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
