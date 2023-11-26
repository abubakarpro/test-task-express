const { sequelize, Profile, Contract, Job } = require('../src/model/model');

async function resetDatabase() {
  try {
    // Drop all tables and re-create them
    await Profile.sync({ force: true });
    await Contract.sync({ force: true });
    await Job.sync({ force: true });

    console.log('Database reset successful.');
    seed();
  } catch (error) {
    console.error('Error resetting database:', error);
  }
}

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
  resetDatabase
};