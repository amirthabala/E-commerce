const { db } = require("../db");

module.exports = {
	getAllProducts: async () => {
		try {
			const [res] = await db.query(
				"SELECT * FROM products WHERE deleted_at IS NULL;"
			);
			return res;
		} catch (err) {
			throw err;
		}
	},

	getProductById: async ({ product_id, is_logged }, user) => {
		try {
			let res;
			if (is_logged) {
				[res] = await db.query(
					`SELECT *, (SELECT id FROM cart WHERE product_id = products.id AND user_id = ? AND deleted_at IS NULL LIMIT 1) AS cart_entry
        			FROM products WHERE deleted_at IS NULL AND id = ?;`,
					[user.id, product_id]
				);
			} else {
				[res] = await db.query(
					`SELECT * FROM products WHERE deleted_at IS NULL AND id = ?;`,
					[product_id]
				);
			}
			if (res.length === 0) {
				throw new Error("No Product Exists!");
			}
			return res[0];
		} catch (err) {
			throw err;
		}
	},
};
