const router = require("express").Router();
const showResult = require("../../services/showResultLogic");

/**
* @api {get} /v1/ show result for student
* @apiName result
* @apiGroup Student
*
* @apiParam  { registerNumber} student regiser number.
*
* @apiSuccess {Object} response object as student details.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*      "status": true,
*      "message": "register number matched",
*        "data": {
*           "name": "Student",
*           "registerNumber": 12,
*           "subject1": 71,
*           "subject2": 0,
*           "subject3": 90,
*           "total": 161
*         }
*     }
*
* @apiError student not exist with regisernumber.
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 400 BAD REQUEST
*     {
*        "status": false,
*       "message": "register number not matched",
*       "data": {}
*     }
*/
router.get("/", async (req, res) => {
   console.log(req.body);
   try {
      const response = await showResult(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "no response" });
   }
});

module.exports = router;
