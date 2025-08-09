const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Giraham = sequelize.define('Giraham', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'girahams',
  timestamps: true
});

module.exports = Giraham;
