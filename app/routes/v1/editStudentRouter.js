const router = require("express").Router();
const editStudent = require("../../services/editStudentLogic");
const { verify } = require("../../middlewares/authJwt");

/**
 * @api {patch} /v1/signup signup route for teacher
 * @apiName Add Student
 * @apiGroup Student
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
