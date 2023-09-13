const db = require('../models')

//create main Model
const Student = db.students
const Teacher = db.teachers

// 1. Student Login 
const studentLogin = async (req, res) => {
  console.log(req.body);
  const { rollNumber, dob } = req.body;

  try {
    // Check if a student with the provided rollNum and dob exists
    const student = await Student.findOne({
      where: { rollNumber: rollNumber, dob: dob },
    })

    if (student) {         // student found, login successful
      console.log("Student logged in successfully");
      res.render("viewResult",{ std:student});
      // res.status(200).send('Student login successfully');
    }
    else { // student not found, login failed
      let alert = require('alert');
      alert("Wrong Credentials !! Please enter valid details");
      // res.status(401).send('Student login failed');
      res.render("studentLogin");

    }
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};


const student_login_get = (req, res) => {
  res.render("studentLogin");
};

module.exports = {
  studentLogin,
  student_login_get
} 