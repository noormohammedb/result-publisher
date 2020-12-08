const router = require("express").Router();
const addStudent = require("../../services/addStudentLogic");
const { verify } = require("../../middlewares/authJwt");

/**
 * @api {post} /v1/add_student signup route for teacher
 * @apiName Add Student
 * @apiGroup Student
 * 
 *
 * @apiParam { name } student details.
 * @apiParam { registerNumber } student details.
 * @apiParam { subject1 } student details.
 * @apiParam { subject2 } student details.
 * @apiParam { subject3 } student details.
 *
 * @apiSuccess {String} document id in db.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status": true,
 *      "message": "new student added successfully",
 *       "data": {
 *       "id": "5fcf896ab3414a0fc0d73d90"
 *          }
 *     }
 *
 * @apiError student is alredy exist with regisernumber .
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "status": false,
 *       "message": "student exist",
 *       "data": {}
 *     }
 */
router.post("/", verify, async (req, res) => {
   console.log(req.body);
   try {
      const response = await addStudent(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      res.status(500).json({ message: "no response" });
   }
});

module.exports = router;
