const router = require("express").Router();
const showResult = require("../../services/showResultLogic");

/**
 * @api {get} /v1/ show result for student
 * @apiName result
 * @apiGroup Student
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
