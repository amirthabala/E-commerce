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

  getProductById: async (id) => {
    try {
      const [res] = await db.query(
        "SELECT * FROM products WHERE deleted_at IS NULL AND id = ?;",
        [id]
      );
      if (res.length === 0) {
        throw new Error("No Product Exists!");
      }
      return res[0];
    } catch (err) {
      throw err;
    }
  },
};
