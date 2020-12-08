const router = require("express").Router();

router.get("/", (req, res) => {
   res.json({ message: "public" });
});

module.exports = router;
