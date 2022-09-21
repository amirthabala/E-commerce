const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const loginRoute = require("./routes/login");
const productsRoute = require("./routes/products");
const cartRoutes = require("./routes/cart");
// const setCurrentUser = require("./middleware/auth");

// app.use(setCurrentUser);

app.use("/", loginRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoutes);

const start = () => {
	try {
		const server = app.listen(4000, "0.0.0.0", function () {
			console.log(`Server listening on`, server.address().port);
		});
	} catch (error) {}
};

start();
