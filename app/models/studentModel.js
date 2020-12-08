const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const student = new mongoose.Schema(
   {
      name: String,
      registerNumber: {
         type: Number,
         unique: true
      },
      subject1: Number,
      subject2: Number,
      subject3: Number
   },
   { versionKey: false },
);

student.plugin(timestamps);

module.exports = mongoose.model("student", student);
