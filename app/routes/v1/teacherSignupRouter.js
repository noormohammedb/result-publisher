const router = require("express").Router();
const signupProcess = require("../../services/teacherSignupLogic");

/**
 *
 * @api {post} /v1/signup signup route for teacher
 * @apiName signup
 * @apiGroup teacher
 *
 * @apiParam  { name }  teacher signup data.
 * @apiParam  { email } teacher signup data
 * @apiParam  { password } teacher signup data
 *
 * @apiSuccess {String} jwt auth token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status": true,
 *      "message": "signup success",
 *      "data": {
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNmODY2MTgyMTE3NDAyZjRhZmMxNzAiLCJuYW1lIjoidGVzdCIsImlhdCI6MTYwNzQzNTg3MywiZXhwIjoxNjA3NDM2NzczfQ.B6dSlm4nu9tSnWcgGvDPVsqaQUZspzAGRR6oLObNY0I"
 *         }
 *     }
 *
 * @apiError duplicate email .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "status": false,
 *       "message": "email exist",
 *       "data": {}
 *     }
 */
router.post("/", async (req, res) => {
   console.log(req.body);
   try {
      const response = await signupProcess(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      res.status(500).json({ message: "no response" });
   }
});

module.exports = router;
