var express = require('express');
var router = express.Router();

router.post("/", (req, res) => {
   console.log(req.body);
   res.json({ "bla": "blabla" })
})


module.exports = router;
