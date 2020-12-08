const router = require("express").Router();
const loginProcess = require("../../services/teacherLoginLogic");

router.post("/", async (req, res) => {
   console.log(req.body);
   try {
      const response = await loginProcess(req.body);
      res.status(response.statusCode).json(response.json);
   } catch (error) {
      res.status(500).json({ message: "no response" })
   }
});

module.exports = router;
