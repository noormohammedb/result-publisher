const router = require("express").Router();
const loginProcess = require("../../services/teacherLoginLogic");

/**
 *
 * @api {post} /v1/login login route for teacher
 * @apiName login
 * @apiGroup teacher
 *
 * @apiParam  { email } email of teacher .
 * @apiParam  { password }  password curresponding to email.
 *
 * @apiSuccess {String} jwt auth token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status": true,
 *      "message": "login success",
 *      "data": {
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNmODY2MTgyMTE3NDAyZjRhZmMxNzAiLCJuYW1lIjoidGVzdCIsImlhdCI6MTYwNzQzNTg3MywiZXhwIjoxNjA3NDM2NzczfQ.B6dSlm4nu9tSnWcgGvDPVsqaQUZspzAGRR6oLObNY0I"
 *         }
 *     }
 *
 * @apiError wrong email or password .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "status": false,
 *       "message": "email or password error",
 *       "data": {}
 *     }
 */
router.post("/", async (req, res) => {
   console.log(req.body);
   try {
      const response = await loginProcess(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      res.status(500).json({ message: "no response" });
   }
});

module.exports = router;
