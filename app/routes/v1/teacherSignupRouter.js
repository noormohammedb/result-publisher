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
   try {
      const response = await signupProcess(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      res.status(500).json({ message: "no response" })
   }
});

module.exports = router;
