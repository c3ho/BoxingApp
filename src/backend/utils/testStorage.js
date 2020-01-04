const storage = require('./storage')

const schema = storage.connect();
const member = {
    name: "last",
    lastName: "first"
}
// storage.enrollMember(schema, member);
// storage.findAll(schema);
storage.renewMembership(schema, 'last', 'first', 1);