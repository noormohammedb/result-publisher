var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
   res.json({ message: "teacher login" })
})


module.exports = router;
