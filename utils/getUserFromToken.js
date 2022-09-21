const { google } = require("googleapis");
require("dotenv").config();

const getUserFromToken = async (code) => {
	const clientId = process.env.CLIENT_ID;
	const clientSecret = process.env.CLIENT_SECRET;
	const redirectURL = "http://localhost:3000";

	const oauth2Client = new google.auth.OAuth2(
		clientId,
		clientSecret,
		redirectURL
	);

	const { tokens } = await oauth2Client.getToken(code);

	oauth2Client.setCredentials(tokens);

	google.options({
		auth: oauth2Client,
	});

	const oauth = google.oauth2("v2");
	const profile = await oauth.userinfo.get({});

	return profile.data;
};

module.exports = getUserFromToken;
