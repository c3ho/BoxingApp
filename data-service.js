const mongoose = require('mongoose')


module.exports = function (mongoURI) {

  let Member;
  return {
    connect: function () {
      return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(mongoURI);
        db.on('error', (err) => {
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
          active: Boolean,
          note: String
        });

        db.once('open', () => {
          Member = db.model("Member", memberSchema);

        //   var m1 = new Member({
        //     firstName: 'Marina',
        //     lastName: 'Rong',
        //     enrollDate: '2014-08-01',
        //     lastPaidDate: '2013-07-01',
        //     membershipType: 'Trial',
        //     lastActiveDate: '2019-07-01',
        //     medical: '2019-05-01',
        //     active: false,
        //     note: 'Bye'
        // });
        
        m1.save(function (err){
          if (err)
            console.log("An issue occured while trying to save user");
          else
            console.log("Success");
        })
          resolve();
        });
      });
    },

    //update membership with either 1,3,6,12 months
    //possible error here
    renewMembership: function (firstName, lastName, months) {
      return new Promise(function (resolve, reject) {
        Member.find({
          firstName: firstName,
          lastName: lastName
        }).exec()
          .then((member) => {
            if (member.length > 0)
              member.expireDate = member.expireDate.setMonth(member.expireDate.getMonth() + months);
            member.save(function (err) {
              if (err)
                reject(err);
              else
                resolve(data);
            })
          })
      })
    },

    enrollMember: function (memberInfo) {
      return new Promise(function (resolve, reject) {
        var newMember = new Member(memberInfo);
        newMember.save(function (err) {
          if (err) {
            console.log("An isssue occured while trying to save user");
            reject(err);
          }
          else
            console.log(firstName + " " + lastName + " successfully enrolled to Gideon!");
        })
      })
    },

    //returns all members
    findAll: function () {
      return new Promise(function (resolve, reject) {
        Member.find()
          .exec()
          .then((members) => {
            resolve(members);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      })
    },

    //placeholder for other functions such as returning or filtering list to user
    findMember: function (firstName, lastName) {
      return new Promise(function (resolve, reject) {
        Member.find({
          firstName: firstName,
          lastName: lastName
        })
          .exec()
          .then((member) => {
            resolve(member);
          })
          .catch((err) => {
            reject(err);
          });
      })
    }
  };


//test member using me

}