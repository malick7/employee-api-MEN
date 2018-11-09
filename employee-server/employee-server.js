var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./mongodb/mongoose');
var {Employee} = require('./models/employee');
const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/employees', (req, res) => {
  var employee = new Employee({
    fullname: req.body.fullname,
    email: req.body.email,
    mobile: req.body.mobile,
    city: req.body.city,
    gender: req.body.gender,
    department: req.body.department,
    hireDate: req.body.hireDate,
    isPermanent: req.body.isPermanent,
  });

  employee.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/employees', (req, res) => {
  Employee.find()
    .then((employees) => {
      res.send({employees})
    }, (e) => {
      res.send(400).send(e);
    }
  );
})

//GET employees/1234
app.get('/employees/:id', (req, res) => {
  var empId = req.params.id;
  console.log(empId);
  if(!ObjectID.isValid(empId)) {
    return res.status(404).send('Invalid ObjectId');
  }

  Employee.findById(empId)
    .then((employee) => {
      if(!employee) return res.status(404).send('Not found');
      return res.status(200).send({employee});
    })
    .catch((err) => {
      return res.status(404).send(err);
    })
});

if(!module.parent){ 
  app.listen(3000, () => {
    console.log('Started on port 3000');
});
}
module.exports = {app};
