var mongoose = require('mongoose');

//Do validations
var Employee = mongoose.model('Employee', {
  fullname: {
    type: String,
    required: [true, 'User fullname is required'],
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /\S+@\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email id!`
    },
    required: [true, 'User email id required']
  },
  mobile: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  city: {
    type: String,
  },
  gender: {
    type: String,
    required: true
  },
  department: {
    type: Number,
    default: 1
  },
  hireDate: {
    type: Date,
    default: new Date()
  },  
  isPermanent: {
    type: Boolean,
    default: false
  },  
});

module.exports = {Employee};
