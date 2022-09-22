const { google } = require("googleapis");
require("dotenv").config();

const getUserFromToken = async (code) => {
	try {
		const clientId = process.env.CLIENT_ID;
		const clientSecret = process.env.CLIENT_SECRET;
		const redirectURL =
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: "http://meruhealth.skillmind.org";

		const oauth2Client = new google.auth.OAuth2(
			clientId,
			clientSecret,
			redirectURL
		);

		console.log(oauth2Client);

		const { tokens } = await oauth2Client.getToken(code);

		oauth2Client.setCredentials(tokens);

		google.options({
			auth: oauth2Client,
		});

		const oauth = google.oauth2("v2");
		const profile = await oauth.userinfo.get({});

		return profile.data;
	} catch (err) {
		throw err;
	}
};

module.exports = getUserFromToken;
