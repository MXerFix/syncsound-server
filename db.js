const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  // 'syncsound_local',
  // 'root',
  // 'Maks2347',
  {
    dialect: "mysql",
    // dialectModule: require('mysql2'),
    host: "syncsound.ru",
    port: 3306,
  }
);
