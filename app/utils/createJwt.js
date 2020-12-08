require("dotenv").config();
const jwt = require("jsonwebtoken");

function signJwt(payload) {
   try {
      const { _id, name } = payload;
      const token = jwt.sign({ _id, name }, process.env.JWT_SECRET, { expiresIn: "15m" });
      return token;
   } catch (error) {
      console.log("error in jwt sign");
      console.error(error);
   }
}

module.exports = { signJwt };
