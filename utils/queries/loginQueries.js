const { db } = require("../db");
const { google } = require("googleapis");

module.exports = {
  signIn: async (code) => {
    try {
      const clientId =
        "176237103269-87dpchtm9nugds3ol826f104pn8gtnv2.apps.googleusercontent.com";
      const clientSecret = "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";
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

      const [isUserExist] = await db.query(
        `SELECT id FROM users WHERE email = ? AND deleted_at IS NULL`,
        [profile.data.email]
      );

      let userData;

      if (isUserExist.length === 0) {
        [userData] = await db.query(
          `INSERT INTO users (username, email, picture, token, created_at, updated_at) VALUES (?,?,?,?,CAST(NOW() AS DATETIME),CAST(NOW() AS DATETIME))`,
          [
            profile.data.name,
            profile.data.email,
            profile.data.picture,
            JSON.stringify(tokens),
          ]
        );
      } else {
        [userData] = await db.query(
          `UPDATE users SET username = ?, picture = ?, token = ?, updated_at = CAST(NOW() AS DATETIME) WHERE id = ? AND deleted_at IS NULL;
          SELECT id, email, picture FROM users WHERE id = ? AND deleted_at IS NULL`,
          [
            profile.data.name,
            profile.data.picture,
            JSON.stringify(tokens),
            isUserExist[0].id,
            isUserExist[0].id,
          ]
        );
      }

      return isUserExist.length === 0
        ? {
            id: userData.insertId,
            email: profile.data.email,
            picture: profile.data.picture,
            code: code,
          }
        : { ...userData[1][0], code: code };
    } catch (err) {
      throw err;
    }
  },
};
