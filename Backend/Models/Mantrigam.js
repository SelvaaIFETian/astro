const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Mantrigam = sequelize.define('Mantrigam', {
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

module.exports = Mantrigam;
