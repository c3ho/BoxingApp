const mongoose = require('mongoose')
const moment = require('moment')

module.exports = {

    connect: () => {
      MONGO_URI = "mongodb+srv://test:tester123@cluster0-l5exq.mongodb.net/test?retryWrites=true&w=majority"
      mongoose.connect(MONGO_URI, {useNewUrlParser: true});
      const db = mongoose.connection;
      const Schema = mongoose.Schema;
      const memberSchema = new Schema({
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
            default: Date.now(),
          },
          membershipType: {
            type: String,
            default: 'Trial',
            enum: ['Monthly', 'Pack', 'Trial']
          },
          lastActiveDate: [Date],
          medical: Boolean,
          active: Boolean,
          note: String
        });

        
        //db.once('open', () => {
          db.model("Members", memberSchema);
          return memberSchema;
        //});
    },

    getAllMembers: async (schema) => {
      const Member = mongoose.model('Members', schema);
      const query = Member.find()
      const results = await query;
      return results;
    },

    // update membership with either 1,3,6,12 months
    renewMembership: async (schema, firstName, lastName, months) => {
      const foundMember = findMember(schema, firstName, lastName);
      const filter = { firstName: firstName, lastName: lastName };

      const Member = mongoose.model('Members', schema);
      const date = moment(foundMember.expireDate);
      const newDate = date.add(months, 'month').toDate();
      const update = { expireDate: newDate };

      await Member.findOneAndUpdate(filter, update);
      console.log("Successfully updated " + firstName + " "+ lastName + "for " + months + ".");
      return this.findMember(schema, firstName, lastName);
    },

    // adds a member
    enrollMember: (schema, memberInfo) => {
      const Member = mongoose.model('Members', schema);
      const newMember = new Member({
        firstName: memberInfo.name,
        lastName: memberInfo.lastName
      });
        newMember.save(function (err) {
          if (err) {
            console.log("An isssue occured while trying to save user", err);
          }
          else
            console.log(memberInfo.name + " " + memberInfo.lastName + " successfully enrolled to Gideon!");
        })
    },
    
    findMember: async (schema, firstName, lastName) => {
      const Member = mongoose.model('Members', schema);
      const query = { firstName: firstName, lastName: lastName};
      return Member.findOne(query);
    }
  }
