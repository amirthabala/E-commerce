const { db } = require("../db");

module.exports = {
	getCartItemsByUserId: async (userId) => {
		try {
			const [res] = await db.query(
				`SELECT cart.id, cart.quantity, product_brand, product_name, unit_price, discount, 
					total_quantity, sold_quantity, product_image 
					FROM cart JOIN products ON products.id = cart.product_id AND products.deleted_at IS NULL 
					WHERE cart.user_id = ? AND cart.deleted_at IS NULL`,
				[userId]
			);
			return res;
		} catch (err) {
			throw err;
		}
	},

	addProduct: async ({ product_id }, user) => {
		try {
			const [res] = await db.query(
				"INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, CAST(NOW() AS DATETIME),CAST(NOW() AS DATETIME))",
				[user.id, product_id, 1]
			);
			return res;
		} catch (err) {
			throw err;
		}
	},

	deleteCartItem: async ({ cart_id }) => {
		try {
			const [res] = await db.query(
				`UPDATE cart SET deleted_at = CAST(NOW() AS DATETIME) WHERE id = ?`,
				[cart_id]
			);
			return res;
		} catch (err) {
			throw err;
		}
	},
};
