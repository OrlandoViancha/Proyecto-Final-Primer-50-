var mongoose = require("mongoose");

const { Schema } = mongoose;
var appointment = new Schema({
  date: { type: String },
  time: { type: String },
  doctorID: { type: Schema.Types.ObjectId, ref: "doctor" },
  patientID: { type: Schema.Types.ObjectId, ref: "patient" },
  scheduleID: { type: Schema.Types.ObjectId, ref: "schedule" },
});
module.exports = mongoose.model("appointment", appointment);
