const express = require("express");
const setCurrentUser = require("../middleware/auth");
const productQueries = require("../utils/queries/productQueries");
const app = express.Router();

app.get("/", setCurrentUser(), async (req, res) => {
	try {
		const productsList = await productQueries.getAllProducts();
		res.json({
			productsList: productsList,
			message: "Successfully Fetched Products",
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

app.post("/getProduct", setCurrentUser(), async (req, res) => {
	try {
		const productDetails = await productQueries.getProductById(
			req.body,
			req.user
		);
		res.json({
			productDetails: productDetails,
			message: "Successfully Fetched Product Details",
			success: true,
		});
	} catch (err) {
		res.json({
			message: err ? err.message || err.sqlMessage : "Something Went Wrong",
			success: false,
		});
		throw err;
	}
});

module.exports = app;
