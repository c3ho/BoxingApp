const mongoose = require('mongoose')


module.exports = function(mongoURI){
  
  let Member;
  return{
    connect: function(){
    return new Promise(function(resolve, reject){
      let db = mongoose.createConnection(mongoURI);
      db.on('error', (err)=>{
        reject(err);
      });
      
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
      
      db.once('open', ()=>{
        Member = db.model("Member", memberSchema);
        resolve();
      });
    });
  },
    
  //update membership with either 1,3,6,12 months
  /*renewMembership: function(firstName, lastName, months){
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
},*/

  /*enrollMember: function(firstName, lastName){
    var m1 = new Member({
      firstName: firstName,
      lastName: lastName
    });
    m1.save(function (err){
      if (err)
        console.log("An isssue occured while trying to save user");
      else
        console.log(firstName + " " + lastName + " successfully enrolled to Gideon!");
    })
  },*/

  //returns all members
  findAll: function(){
    return new Promise(function(resolve,reject){
      Member.find()
      .exec()
      .then((members)=>{
        resolve(members);
      })
      .catch((err)=>{
        console.log(err);
        reject(err);
      });
    })
  },

  //placeholder for other functions such as returning or filtering list to user
  findMember: function(firstName, lastName){
    return new Promise((resolve, reject)=>{
      Member.find({
      firstName: firstName,
      lastName: lastName
    })
     .exec()
     .then((member)=>{
        resolve(member);
      })
      .catch((err)=>{
        reject(err);
      }); 
    })
  }
  }
}

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
