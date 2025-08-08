const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Thosham = sequelize.define('Thosham', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Thosham;
