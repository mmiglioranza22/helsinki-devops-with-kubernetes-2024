const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.PG_DATABASE_URL);

const connectToDatabase = async () => {
  try {
    // await sequelize.authenticate();
    await sequelize.connectToDatabase();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
