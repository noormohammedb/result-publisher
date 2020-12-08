const router = require("express").Router();
const signupProcess = require("../../services/teacherSignupLogic");

/**
 * @api {post} /v1/signup signup route for teacher
 * @apiName signup
 * @apiGroup teacher
 *
 * @apiBody {Number} id Users unique ID.
 */
router.post("/", async (req, res) => {
   console.log(req.body);
   const response = await signupProcess(req.body);
   res.status(200).json({ response });
});

module.exports = router;
