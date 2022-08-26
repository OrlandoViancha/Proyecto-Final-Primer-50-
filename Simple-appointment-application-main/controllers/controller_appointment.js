const express = require("express");
var mongoose = require("mongoose");
const route = express.Router();
const session = require("express-session");
const bodyParser = require("body-parser");
const Doctor = require("../models/doctor");
const Department = require("../models/department");
const Schedule = require("../models/schedule");
const Appointment = require("../models/appoinment");
const Patient = require("../models/patient");
route.use(bodyParser.json());

route.use(
  session({
    secret: "123456789",
    resave: true,
    saveUninitialized: true,
  })
);

const getHistory = async (req, res) => {
  const resultado = await Appointment.aggregate([
    {
      $lookup: {
        from: "doctors",
        localField: "doctorID",
        foreignField: "_id",
        as: "doctorAppo",
      },
    },
    { $unwind: "$doctorAppo" },
    { $match: { patientID: mongoose.Types.ObjectId(req.session.codepatient) } },
  ]);

  res.render("historial", { title: "Historial", appointment: resultado });
};

const deleteAppointment = async (req, res) => {
  const { _id, schedule, doctorcode } = req.body;
  try {
    const doctor = await Doctor.find({
      _id: mongoose.Types.ObjectId(doctorcode),
    });
    doctor.forEach((value) => {
      value.schedule.forEach((sched) => {
        if (sched.id == schedule) {
          sched.state = true;
        }
      });
    });

    const modificar = await Doctor.updateOne(
      { _id: mongoose.Types.ObjectId(doctorcode) },
      { $set: { schedule: doctor[0].schedule } }
    );

    const result = await Appointment.findByIdAndRemove(
      mongoose.Types.ObjectId(_id)
    );
    res.send({ result: true });
  } catch (e) {
    res.send(e);
  }
};

const getAppointment = async (req, res) => {
  try {
    const department = await Department.find({});
    const doctor = await Doctor.find({});
    const schedule = await Schedule.find({});

    res.render("addAppointment", {
      title: "Añadir Cita",
      result: true,
      department: department,
      doctor: doctor,
      schedule: schedule,
    });
  } catch (error) {
    res.status(500).json({ result: false, error: error.toString() });
  }
};

const addAppointment = async (req, res) => {
  const { date, hour, doctorcode, scheduleid } = req.body;

  try {

    const consulta=await Appointment.findOne({"patientID":mongoose.Types.ObjectId(req.session.codepatient),"date":date,"time":hour}).count()
    
    if(consulta>0){
        res.send({ result: false });
    }
    else{
    console.log(consulta)
    const doctor = await Doctor.find({
      _id: mongoose.Types.ObjectId(doctorcode),
    });
    doctor.forEach((value) => {
      value.schedule.forEach((sched) => {
        if (sched.id == scheduleid) {
          sched.state = false;
        }
      });
    });

    const modificar = await Doctor.updateOne(
      { _id: mongoose.Types.ObjectId(doctorcode) },
      { $set: { schedule: doctor[0].schedule } }
    );

    const appointment = new Appointment({
      date: date,
      time: hour,
      doctorID: doctorcode,
      patientID: req.session.codepatient,
      scheduleID: scheduleid,
    });
    const result = await appointment.save();

    res.send({ result: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getHistory, deleteAppointment, getAppointment ,addAppointment};
