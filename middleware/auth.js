const { db } = require("../utils/db");

const setCurrentUser = () => {
	return async (req, res, next) => {
		try {
			const token = req.header("authorization");

			let checker = token ? token.split(" ")[1] : "";

			if (token) {
				const [isUserExist] = await db.query(
					`SELECT id, email, picture, username FROM users WHERE token = ? AND deleted_at IS NULL`,
					[checker]
				);

				if (isUserExist.length) {
					req.user = {
						id: isUserExist[0].id,
						email: isUserExist[0].email,
						picture: isUserExist[0].picture,
						name: isUserExist[0].username,
					};
				} else {
					req.user = {};
				}
			} else {
				req.user = {};
			}

			next();
		} catch (err) {
			console.error(err);
			err.status = err.status ? err.status : 500;
			err.message = err.status !== 500 ? err.message : "Something went wrong!";

			res.status(err.status).send({ message: err.message, success: false });
		}
	};
};

module.exports = setCurrentUser;
