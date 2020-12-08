const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const teacher = new mongoose.Schema(
   {
      name: String,
      email: {
         type: String,
         unique: true,
      },
      password: String,
      isTeacher: Boolean,
   },
   { versionKey: false },
);

teacher.plugin(timestamps);

module.exports = mongoose.model("teacher", teacher);
