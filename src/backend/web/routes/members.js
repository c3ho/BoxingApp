const express = require('express')
const app = express()
const storage = require ('../../utils/storage');
const bodyParser = require('body-parser');

const members = express.Router();
const schema = storage.connect();
app.use(bodyParser.json());

// gets all members
members.get('/', async (req, res) => {
    const allMembers = await storage.getAllMembers(schema);
    res.json(allMembers);
})

// this is for two members
members.get('/:firstname?/:lastName?', async (req,res) => {
    const foundMembers = await storage.findMembers(schema, req.params.firstname, req.params.lastName);
    res.json(foundMembers);
})

// this is for just one member
members.get('/:firstName/:lastName', async (req,res) => {
    const foundMember = await storage.findMember(schema, req.params.firstName, req.params.lastName);
    res.json(foundMember);
})

members.post('/', async (req, res) =>{
    if(Object.keys(req.body).length === 0){
        res.status(406).send('First name and last name are required to enroll');
    }
    storage.enrollMember(schema, req.body)
    res.send(`Successfully signed up ${req.body.firstName} ${req.body.lastName}`);
})

module.exports = members