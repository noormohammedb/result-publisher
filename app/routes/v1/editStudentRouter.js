const router = require("express").Router();
const editStudent = require("../../services/editStudentLogic");
const { verify } = require("../../middlewares/authJwt");

/**
* @api {patch} /v1/edit_student edit student record route for teacher
* @apiName edit student record
* @apiGroup Student
* 
*
* @apiParam { name } student details.
* @apiParam { registerNumber } student details.
* @apiParam { subject1 } student details.
* @apiParam { subject2 } student details.
* @apiParam { subject3 } student details.
*
* @apiSuccess {Object} response object.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*      "status": true,
*      "message": "student setails edited successfully",
*       "data": {}
*     }
*
* @apiError student not exist with regisernumber.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 BAD REQUEST
*     {
*        "status": false,
*       "message": "student not exist",
*       "data": {}
*     }
*/
router.patch("/", verify, async (req, res) => {
   console.log(req.body);
   try {
      const response = await editStudent(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "no response" });
   }
});

module.exports = router;
