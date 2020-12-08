const router = require("express").Router();
const addStudent = require("../../services/addStudentLogic");
const { verify } = require("../../middlewares/authJwt");

/**
 * @api {post} /v1/signup signup route for teacher
 * @apiName Add Student
 * @apiGroup Student
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
