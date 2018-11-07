var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./mongodb/mongoose');
var {Employee} = require('./models/employee');

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
  
if(!module.parent){ 
  app.listen(3000, () => {
    console.log('Started on port 3000');
});
}
module.exports = {app};
