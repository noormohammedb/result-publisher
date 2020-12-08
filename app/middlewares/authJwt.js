const jwt = require("jsonwebtoken");
require("dotenv").config();

function decode(token) {
   try {
      return jwt.verify(token, process.env.JWT_SECRET);
   } catch (e) {
      console.log("error with jwt decodeing in decode");
      console.error(e);
      throw e;
   }
}

function verify(req, res, next) {
   const tokenhead = req.headers.authorization;
   if (tokenhead) {
      const token = tokenhead.split(" ").pop();
      console.log(token);
      console.log("<= pure token");
      try {
         req.decode = decode(token);
         console.log("token decoded : ");
         next();
      } catch {
         res.status(403).json({
            status: false,
            auth: false,
            message: "token verification failed",
         });
      }
   } else {
      res.status(401).json({
         status: false,
         auth: false,
         message: "user is't logedin",
         jwtmessage: "token does't exist",
      });
   }
   return null;
}

module.exports = { verify };
