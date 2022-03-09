// Required Module
const Sequelize = require('sequelize');
require('dotenv').config();
// Sequelize
let sequelize;
// Codition to connect to JAWSDB or localhost connection
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
    }
  );
}
// Export
module.exports = sequelize;