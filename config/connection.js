// Required NODE dependencies
const Sequelize = require('sequelize');
require('dotenv').config();
// Sequelize Var
let sequelize;
// Codition to connect to JAWSDB or localhost connection
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
    }
  );
}
// Export Module
module.exports = sequelize;