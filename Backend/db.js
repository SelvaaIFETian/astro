const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
<<<<<<< HEAD
    
    logging: false
=======
    dialect: process.env.DB_DIALECT,
    logging: false,
>>>>>>> 444ee30faab778304e53189020e6d6a283a06a49
  }
);

module.exports = sequelize;
