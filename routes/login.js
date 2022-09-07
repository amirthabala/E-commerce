const express = require("express");
const loginQueries = require("../utils/queries/loginQueries");
const app = express.Router();

app.post("/signin", async (req, res) => {
  try {
    const { code } = req.body;

    const loginData = await loginQueries.signIn(code);

    res.json({
      data: loginData,
      message: "Signed In Successfully",
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.sqlMessage ? err.sqlMessage : "Something Went Wrong",
      success: false,
    });
    throw err;
  }
});

module.exports = app;
