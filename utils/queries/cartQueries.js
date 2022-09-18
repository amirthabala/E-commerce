const { db } = require("../db");

module.exports = {
  getCartItemsByUserId: async (userId) => {
    try {
      const [res] = await db.query(
        "SELECT * FROM cart JOIN products ON products.id = cart.product_id WHERE cart.user_id = ? AND cart.deleted_at IS NULL",
        [1]
      );
      return res;
    } catch (err) {
      throw err;
    }
  },

  addProduct: async ({ product_id }) => {
    try {
      const [res] = await db.query(
        "INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, CAST(NOW() AS DATETIME),CAST(NOW() AS DATETIME))",
        [1, product_id, 1]
      );
      return res;
    } catch (err) {
      throw err;
    }
  },
};
