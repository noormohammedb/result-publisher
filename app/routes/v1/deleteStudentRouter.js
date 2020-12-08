const router = require("express").Router();
const deleteStudent = require("../../services/deleteStudentLogic");
const { verify } = require("../../middlewares/authJwt");

/**
* @api {delete} /v1/delete_student delete student route for teacher
* @apiName delete student
* @apiGroup Student
* 
*
* @apiParam  { registerNumber} register numeber of student.
*
* @apiSuccess {String} document id in db.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*      "status": true,
*      "message": "student deleted successfully",
*       "data": {}
*     }
*
* @apiError student not exist with regisernumber.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 BAD REQUEST
*     {
*        "status": false,
*       "message": "student exist",
*       "data": {}
*     }
*/
router.delete("/", verify, async (req, res) => {
   console.log(req.body);
   try {
      const response = await deleteStudent(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      res.status(500).json({ message: "no response" });
   }
});

module.exports = router;
