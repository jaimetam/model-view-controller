const { User } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
    {
        username: "jaime",
        password: "123"
    },
    {
        username: "jaimito",
        password: "456"
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;