const seedUsers = require('./seeds');
const sequelize = require('../config/connection');

const seeds = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    process.exit(0);
};

seeds();