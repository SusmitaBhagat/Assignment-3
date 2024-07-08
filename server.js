var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const path = require('path');
const collegeData = require('./modules/collegeData');


app.get('/students', (req, res) => {
  const course = req.query.course;
  if (course) {
    collegeData.getStudentsByCourse(course).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: err });
    })
  } else {
    collegeData.getAllStudents().then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: err });
    })
  }
});

app.get('/tas',(req,res) =>{
  collegeData.getTAs().then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({ message: err });
  })
})

app.get('/courses',(req,res) =>{
  collegeData.getCourses().then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json({ message: err });
  })
})

app.get('/student/:num', (req, res) => {
  const stunum = req.params.num;
  if (stunum) {
    collegeData.getStudentByNum(stunum).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json({ message: err });
    });
  } else {
    res.json({ message: "no results" });
  }
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/htmlDemo', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/htmlDemo.html'));
});


app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
collegeData.initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log("Server is running on http://localhost:" + HTTP_PORT);
  });
}).catch((err) => {
  console.log(`Failed to initialize data :${err}`);

});

