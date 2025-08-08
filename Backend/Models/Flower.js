const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Flower = sequelize.define('Flower', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Flower;
