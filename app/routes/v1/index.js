const app = require("express")();

app.use("/", require("./publicRoute"));
app.use("/signup", require("./teacherSignupRouter"));
app.use("/login", require("./teacherLoginRoutet"));

app.all("*", (req, res) => {
   res.status(400).json({ message: "Not Found v1" });
});

module.exports = app;
