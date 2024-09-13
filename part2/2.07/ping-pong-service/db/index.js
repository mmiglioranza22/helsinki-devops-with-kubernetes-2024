const Sequelize = require("sequelize");

const DB = process.env.POSTGRES_DB || "postgres";
const USER = process.env.POSTGRES_USER || "postgres";
const PASS = process.env.POSTGRES_PASSWORD || "postgres";
const HOST = process.env.POSTGRES_HOST || "localhost";
const PORT = process.env.POSTGRES_PORT || 5432;

// const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname"); // Example for postgres
const DATABASE_URL = `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DB}`;
const sequelize = new Sequelize(DATABASE_URL); // Example for postgres

// # Docker ->  docker run -e POSTGRES_PASSWORD=admin -p 5432:5432 postgres
// # docker exec -it container:id psql -U postgres postgres

const connectToDatabase = async () => {
  try {
    console.log({
      db: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      pass: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
    });
    console.log(DATABASE_URL);
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database");
    console.error(err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
