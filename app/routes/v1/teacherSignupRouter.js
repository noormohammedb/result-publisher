const router = require("express").Router();

/**
 * @api {post} /v1/signup signup route for teacher
 * @apiName signup
 * @apiGroup teacher
 *
 * @apiBody {Number} id Users unique ID.
 */
router.post("/", (req, res) => {
   console.log(req.body);
   res.json({ bla: "blabla" });
});

module.exports = router;
