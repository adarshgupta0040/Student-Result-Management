const express = require('express')
const cors = require('cors')
const teacherRoute = require('./routes/teacherRouter')
const studentRoute = require('./routes/studentRouter')
const expressLayout = require('express-ejs-layouts');

const app = express();

var corOptions={
    origin: 'http://localhost:8081'
}


//middleware
app.use(cors(corOptions))

app.use(express.json());

app.use(express.urlencoded({extended:true}))

//testing api

app.get('/',(req,res)=>{
    // res.json({message : 'hello from api'})
    const locals={
        title: "Results Portal",
        desc:"A nodeJs Result Management System"
    }
    res.render("index",locals);
})

//router
app.use("/teacher",teacherRoute);
app.use("/student",studentRoute);

//port

const PORT = process.env.PORT || 8083

app.set('view engine','ejs');

//static files
app.use(express.static(__dirname + "/public"))

// Templating Engine
app.use(expressLayout);
app.set('layout', 'layouts/layout');




//server 

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});