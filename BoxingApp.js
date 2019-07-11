const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://test:tester123@cluster0-l5exq.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI)

const Schema = mongoose.Schema;
var memberSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  enrollDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  expireDate: {
    type: Date,
  },
  lastPaidDate: Date,
  membershipType: {
    type: String,
    default: 'Trial',
    enum: ['Monthly', 'Pack', 'Trial']
  },
  lastActiveDate: [Date],
  medical: Date,
  active: Boolean
});

const Member = mongoose.model('Member', memberSchema)

//test member using me
/*var m1 = new Member({
    firstName: 'Calvin',
    lastName: 'Ho',
    enrollDate: '2016-08-01',
    lastPaidDate: '2019-07-01',
    membershipType: 'Monthly'
    lastActiveDate: [Date]
    medical: '2018-12-01',
    active: true
});

m1.save(function (err){
  if (err)
    console.log("An issue occured while trying to save user");
  else
    console.log("Success");
})*/

//update membership with either 1,3,6,12 months
var renewMembership = function(firstName, lastName, months){
  Member.find({name: firstName, lastName: lastName}, function (err,data){
    if (data){
      data.expireDate = data.expireDate.setMonth(data.expireDate.getMonth() + months)
      data.save(function(err){
        if (err)
          console.log("Error: " + err);
        else
          console.log("Success! " + firstName + " " + lastName + " has been renewed for " + months);
      }) 
    }
    if (err)
      console.log("Error: " + err);
    else
      console.log("No record with " + firstName + " " + lastName + " was found.");
  });
}

var enrollMember = function(firstName, lastName){
  var m1 = new Member({
    firstName: firstName,
    lastName: lastName
  });
  m1.save(function (err){
    if (err)
      console.log("An isssue occured while trying to save usesr");
    else
      console.log(firstName + " " + lastName + "successfully enrolled to Gideon!");
  })
}

enrollMember('test', 'tester');
