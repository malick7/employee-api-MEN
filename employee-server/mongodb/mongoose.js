const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//async code runs syncronously - taken care mongoose
mongoose.connect('mongodb://localhost:27017/Employees', {useNewUrlParser: true});

// module.exports = {
//     mongoose: mongoose
// };
module.exports = {mongoose}; //ES6!