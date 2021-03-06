const app = require("express")();

app.use("/", require("./resultRoute"));
app.use("/signup", require("./teacherSignupRouter"));
app.use("/login", require("./teacherLoginRoutet"));
app.use("/add_student", require("./addStudentRouter"));
app.use("/delete_student", require("./deleteStudentRouter"));
app.use("/edit_student", require("./editStudentRouter"));

app.all("*", (req, res) => {
   res.status(400).json({ message: "Not Found v1" });
});

module.exports = app;
