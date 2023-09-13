const db = require('../models')

//create main Model
const Student = db.students
const Teacher = db.teachers

//main work
// 1. create Student

const addStudent = async (req, res) => {
  try {
    // Extract student data from the request body
    console.log(req.body);
    const { rollNumber, name, dob, score } = req.body;

    // Create a new student record
    const student = await Student.create({
      rollNumber: rollNumber,
      name: name,
      dob: dob,
      score: score,
    });

    const updatedStudents = await Student.findAll();
    let alert = require('alert');
    alert("Student record added Successfully");
    res.render("viewall",{std:updatedStudents});

    // Respond with the newly created student
    //res.status(200).send(student); // Use status 201 for "Created" and send the student JSON

  } 
  catch (error) {
    console.error('Error:', error);
    let alert = require('alert');
    alert("Duplicate Data not allowed !!");
    res.render("error404");
  }
};


// 2. Get all Students
const getAllStuduents = async (req, res) => {

  let students = await Student.findAll()
  res.redirect("viewall", { std: students });
  // res.status(200).send(students)
}


// 3. check valid teacher
const teacherLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if a teacher with the provided username and password exists
    const teacher = await Teacher.findOne({
      where: { username: username, password: password },
    })
    // console.log(teacher);

    if (teacher) {
      // Teacher found, login successful
      console.log("Teacher logged in successfully");
      let students = await Student.findAll()
      res.render("viewall", { std: students });
      // res.status(200).send('Teacher login successfull');
    }
    else {
      // Teacher not found, login failed
      let alert = require('alert');
      alert("Wrong Credentials !! Please enter valid details");
      res.render("teacherLogin");
    }
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};


//4. update/edit student
const updateStudent = async (req, res) => {

  let id = req.body.rollNumber
  console.log(req.body.rollNumber);
  console.log(req.body);
  let updatedRows = await Student.update(req.body, {
    where: { rollNumber: id } // Use the rollNumber for the where clause
  })
  if (updatedRows === 0) {
    // If no rows were updated, the record with the given rollNumber was not found
    res.render("error404");
  }
  // Fetch and return the updated student
  const updatedStudent = await Student.findOne({ where: { rollNumber: id } });
  let students = await Student.findAll()
  res.render("viewall", { std: students });
}


//5. Delete Student
const deleteStudent = async (req, res) => {

  let id = req.params.id
  console.log(id);
  await Student.destroy({ where: { rollNumber: id } });
  const updatedStudents = await Student.findAll();
  res.render("viewall",{std:updatedStudents});
}

const teacher_login_get = (req, res) => {
  res.render("teacherLogin");
};

const teacher_add_get = (req, res) => {
  res.render("addStudent");
};

const updateStudent_get = async (req, res) => {
  let id = req.params.id
  console.log(id);
  let updatedStudent = await Student.findOne({ where: { rollNumber: id } });
  res.render("editStudent",{std:updatedStudent});
};

const gobackViewall = async (req, res) => {
  const updatedStudents = await Student.findAll();
  res.render("viewall",{std:updatedStudents});
};

module.exports = {
  addStudent,
  getAllStuduents,
  teacherLogin,
  updateStudent,
  deleteStudent,
  teacher_login_get,
  teacher_add_get,
  updateStudent_get,
  gobackViewall
} 