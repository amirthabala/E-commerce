const { db } = require("../db");
const jwt = require("jsonwebtoken");
const getUserFromToken = require("../getUserFromToken");

module.exports = {
	signIn: async (code) => {
		try {
			const user = await getUserFromToken(code);

			const [isUserExist] = await db.query(
				`SELECT id FROM users WHERE email = ? AND deleted_at IS NULL`,
				[user.email]
			);

			//jwt signing
			const payload = {
				code: code,
				iat: Date.now(),
				exp: Date.now() + 1000 * 60 * 60 * 24 * 2, //expires in 2 days
			};

			const token = jwt.sign(payload, process.env.TOKEN_SECRET);

			let userData;

			if (isUserExist.length === 0) {
				[userData] = await db.query(
					`INSERT INTO users (username, email, picture, token, created_at, updated_at) VALUES (?,?,?,?,CAST(NOW() AS DATETIME),CAST(NOW() AS DATETIME))`,
					[user.name, user.email, user.picture, token]
				);
			} else {
				[userData] = await db.query(
					`UPDATE users SET username = ?, picture = ?, token = ?, updated_at = CAST(NOW() AS DATETIME) WHERE id = ? AND deleted_at IS NULL;
			    		SELECT id, username, email, picture FROM users WHERE id = ? AND deleted_at IS NULL`,
					[user.name, user.picture, token, isUserExist[0].id, isUserExist[0].id]
				);
			}

			return isUserExist.length === 0
				? {
						id: userData.insertId,
						email: user.email,
						picture: user.picture,
						name: user.name,
						token: token,
				  }
				: { ...userData[1][0], token: token };
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};
